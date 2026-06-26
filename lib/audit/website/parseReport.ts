/**
 * Parse the synthesised audit text into structured sections.
 * Tolerant: section markers may arrive mid-stream (so call this on
 * each tick if needed); missing sections return null.
 */

export interface ObservedRow {
  label: string;
  value: string;
}

export interface VisualRow {
  label: string;
  value: string;
}

export interface IndustrySection {
  placement: string | null;
  signals: string | null;
  typical: string[];
}

export interface GapRow {
  title: string;
  impact: string;
}

export interface AuditQuestion {
  id: string;
  prompt: string;
  category: "ops" | "integration" | "industry" | "funnel" | "growth" | string;
  options: string[];
  allowElaborate: boolean;
}

export interface ParsedReport {
  observed: ObservedRow[];
  visual: VisualRow[];
  industry: IndustrySection | null;
  gaps: GapRow[];
  questions: AuditQuestion[];
  raw: string;
}

const SECTION_MARKERS = [
  "[OBSERVED]",
  "[VISUAL]",
  "[INDUSTRY]",
  "[GAPS]",
  "[QUESTIONS_JSON]",
  "[QUESTIONS]",
] as const;

export function parseReport(raw: string): ParsedReport {
  const sections = splitSections(raw);

  return {
    observed: parseObserved(sections.observed),
    visual: parseVisual(sections.visual),
    industry: parseIndustry(sections.industry),
    gaps: parseGaps(sections.gaps),
    questions: parseQuestions(sections.questionsJson ?? sections.questions),
    raw,
  };
}

function splitSections(raw: string): {
  observed: string | null;
  visual: string | null;
  industry: string | null;
  gaps: string | null;
  questionsJson: string | null;
  questions: string | null;
} {
  const found: Record<string, { start: number; end: number }> = {};
  for (const marker of SECTION_MARKERS) {
    const i = raw.indexOf(marker);
    if (i !== -1) {
      found[marker] = { start: i + marker.length, end: raw.length };
    }
  }
  const ordered = Object.entries(found).sort((a, b) => a[1].start - b[1].start);
  for (let i = 0; i < ordered.length - 1; i++) {
    ordered[i][1].end = raw.indexOf(ordered[i + 1][0]);
  }

  function get(marker: string): string | null {
    const m = found[marker];
    if (!m) return null;
    return raw.slice(m.start, m.end === -1 ? raw.length : m.end).trim();
  }

  return {
    observed: get("[OBSERVED]"),
    visual: get("[VISUAL]"),
    industry: get("[INDUSTRY]"),
    gaps: get("[GAPS]"),
    questionsJson: get("[QUESTIONS_JSON]"),
    questions: get("[QUESTIONS]"),
  };
}

function parseObserved(text: string | null): ObservedRow[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: "", value: line };
      return {
        label: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      };
    })
    .filter((r) => r.value);
}

function parseVisual(text: string | null): VisualRow[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return { label: "Observation", value: line };
      return {
        label: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      };
    })
    .filter((r) => r.value);
}

function parseIndustry(text: string | null): IndustrySection | null {
  if (!text) return null;
  const lines = text.split("\n").map((l) => l.trim());
  let placement: string | null = null;
  let signals: string | null = null;
  const typical: string[] = [];
  let inTypical = false;
  for (const line of lines) {
    if (!line) continue;
    if (line.toLowerCase().startsWith("placement:")) {
      placement = line.slice("placement:".length).trim();
    } else if (line.toLowerCase().startsWith("signals:")) {
      signals = line.slice("signals:".length).trim();
    } else if (line.toLowerCase().includes("typical capabilities")) {
      inTypical = true;
    } else if (line.startsWith("- ")) {
      typical.push(line.slice(2).trim());
    } else if (inTypical && line.length > 0) {
      typical.push(line);
    }
  }
  return { placement, signals, typical };
}

function parseGaps(text: string | null): GapRow[] {
  if (!text) return [];
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.toLowerCase().startsWith("each gap"))
    .map((line) => {
      const cleaned = line.replace(/^[-•*]\s*/, "");
      const idx = cleaned.indexOf("-");
      if (idx !== -1) {
        return {
          title: cleaned.slice(0, idx).trim(),
          impact: cleaned.slice(idx + 1).trim(),
        };
      }
      const dashIdx = cleaned.indexOf(" - ");
      if (dashIdx !== -1) {
        return {
          title: cleaned.slice(0, dashIdx).trim(),
          impact: cleaned.slice(dashIdx + 3).trim(),
        };
      }
      return { title: cleaned, impact: "" };
    })
    .filter((g) => g.title);
}

function parseQuestions(text: string | null): AuditQuestion[] {
  if (!text) return [];
  // First attempt: parse as JSON
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  if (jsonStart !== -1 && jsonEnd > jsonStart) {
    const candidate = text.slice(jsonStart, jsonEnd + 1);
    try {
      const parsed = JSON.parse(candidate);
      if (Array.isArray(parsed?.questions)) {
        return parsed.questions
          .map((q: Record<string, unknown>, i: number) => ({
            id: typeof q.id === "string" ? q.id : `q${i + 1}`,
            prompt: typeof q.prompt === "string" ? q.prompt : "",
            category: typeof q.category === "string" ? q.category : "ops",
            options: Array.isArray(q.options)
              ? (q.options as unknown[]).filter(
                  (o): o is string => typeof o === "string"
                )
              : [],
            allowElaborate: q.allowElaborate !== false,
          }))
          .filter((q: AuditQuestion) => q.prompt);
      }
    } catch {
      // fall through to text parsing
    }
  }

  // Fallback: text-only numbered list ("1. Question text")
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => /^\d+\.\s/.test(l))
    .map((line, i) => ({
      id: `q${i + 1}`,
      prompt: line.replace(/^\d+\.\s*/, ""),
      category: "ops" as const,
      options: [],
      allowElaborate: true,
    }));
}
