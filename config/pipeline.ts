/**
 * Pipeline stages and meta. Single source of truth for the CRM's
 * lead pipeline. Used by the Leads collection, the kanban board view
 * (Chunk 2C), and the activity-log classifications.
 *
 * Stages run cold → won. The "lost" stage is terminal but not in the
 * cold→won progression, so it sits at the end as its own column.
 */

export const PIPELINE_STAGES = [
  {
    id: "cold",
    label: "Cold",
    description: "Not yet contacted",
    color: "ink-mute",
    won: false,
    lost: false,
  },
  {
    id: "contacted",
    label: "Contacted",
    description: "Outreach sent, no reply yet",
    color: "indigo",
    won: false,
    lost: false,
  },
  {
    id: "engaged",
    label: "Engaged",
    description: "Replied, conversation underway",
    color: "indigo",
    won: false,
    lost: false,
  },
  {
    id: "audit-run",
    label: "Audit Run",
    description: "Free audit completed",
    color: "magenta",
    won: false,
    lost: false,
  },
  {
    id: "discovery-booked",
    label: "Discovery Booked",
    description: "Discovery call on the calendar",
    color: "magenta",
    won: false,
    lost: false,
  },
  {
    id: "discovery-done",
    label: "Discovery Done",
    description: "Discovery call complete, Hub generated",
    color: "amber",
    won: false,
    lost: false,
  },
  {
    id: "proposal-sent",
    label: "Proposal Sent",
    description: "Proposal cards in their Hub",
    color: "amber",
    won: false,
    lost: false,
  },
  {
    id: "active-client",
    label: "Active Client",
    description: "Signed, retainer or project running",
    color: "success",
    won: true,
    lost: false,
  },
  {
    id: "lost",
    label: "Lost",
    description: "Won't progress further",
    color: "ink-dim",
    won: false,
    lost: true,
  },
] as const;

export type PipelineStageId = (typeof PIPELINE_STAGES)[number]["id"];

export const PIPELINE_STAGE_OPTIONS = PIPELINE_STAGES.map((s) => ({
  label: s.label,
  value: s.id,
}));

export const LEAD_SOURCES = [
  { label: "Cold outreach", value: "cold-outreach" },
  { label: "Free ad audit", value: "ad-audit" },
  { label: "Free website audit", value: "website-audit" },
  { label: "Referral", value: "referral" },
  { label: "Direct enquiry", value: "direct" },
  { label: "Event / conference", value: "event" },
  { label: "Content / SEO", value: "content" },
  { label: "Partner introduction", value: "partner" },
  { label: "Other", value: "other" },
] as const;

export type LeadSource = (typeof LEAD_SOURCES)[number]["value"];

export const ACTIVITY_TYPES = [
  { label: "Note added", value: "note" },
  { label: "Email sent", value: "email-sent" },
  { label: "Email received", value: "email-received" },
  { label: "Call made", value: "call" },
  { label: "Meeting held", value: "meeting" },
  { label: "Audit run", value: "audit" },
  { label: "Hub created", value: "hub-created" },
  { label: "Hub viewed", value: "hub-viewed" },
  { label: "Proposal sent", value: "proposal-sent" },
  { label: "Stage changed", value: "stage-changed" },
  { label: "Tag added", value: "tag-added" },
  { label: "System", value: "system" },
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number]["value"];

export const COMPANY_SIZES = [
  { label: "1-10", value: "1-10" },
  { label: "11-50", value: "11-50" },
  { label: "51-200", value: "51-200" },
  { label: "201-500", value: "201-500" },
  { label: "500+", value: "500+" },
] as const;

export type CompanySize = (typeof COMPANY_SIZES)[number]["value"];
