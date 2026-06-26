import Link from "next/link";
import { getPayload } from "payload";
import config from "@/payload.config.ts";

export const dynamic = "force-dynamic";

async function getCompanies() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "companies",
      sort: "-updatedAt",
      limit: 100,
      depth: 1,
    });
    return result.docs;
  } catch (err) {
    console.error("[platform.companies] fetch failed", err);
    return [];
  }
}

interface PopulatedCompany {
  id: string | number;
  name?: string;
  domain?: string;
  size?: string;
  location?: string;
  industry?: { name?: string } | null;
  updatedAt?: string;
}

export default async function CompaniesListPage() {
  const companies = (await getCompanies()) as unknown as PopulatedCompany[];

  return (
    <div className="px-8 py-10">
      <div className="flex items-baseline justify-between mb-8">
        <div>
          <h1 className="font-sans font-medium text-3xl tracking-tight text-ink mb-1">
            Companies
          </h1>
          <p className="text-sm text-ink-mute">
            {companies.length.toLocaleString("en-GB")}{" "}
            {companies.length === 1 ? "record" : "records"}
          </p>
        </div>
        <Link
          href="/admin/collections/companies/create"
          className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
        >
          New company
        </Link>
      </div>

      {companies.length === 0 ? (
        <div className="rounded-lg border border-border bg-canvas-2/50 p-10 text-center">
          <p className="font-sans text-lg text-ink mb-2">No companies yet</p>
          <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
            Companies are created automatically when you add a contact whose
            company doesn&rsquo;t exist yet. Or add one manually in Payload.
          </p>
          <Link
            href="/admin/collections/companies/create"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-md bg-accent text-canvas text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Add a company
          </Link>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-canvas-2/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-canvas-2/60">
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal"
                >
                  Domain
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal"
                >
                  Industry
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal"
                >
                  Size
                </th>
                <th
                  scope="col"
                  className="text-left px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute font-normal"
                >
                  Location
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-border/60 hover:bg-canvas/40 transition-colors"
                >
                  <td className="px-4 py-3 align-top">
                    <Link
                      href={`/admin/collections/companies/${c.id}`}
                      className="text-ink hover:text-accent transition-colors font-medium"
                    >
                      {c.name ?? "(unnamed)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 align-top">
                    {c.domain ? (
                      <a
                        href={`https://${c.domain.replace(/^https?:\/\//, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink-soft hover:text-accent transition-colors font-mono text-[12px]"
                      >
                        {c.domain}
                      </a>
                    ) : (
                      <span className="text-ink-dim">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 align-top text-ink-soft">
                    {c.industry?.name ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-ink-soft">
                    {c.size ?? "-"}
                  </td>
                  <td className="px-4 py-3 align-top text-ink-soft">
                    {c.location ?? "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
