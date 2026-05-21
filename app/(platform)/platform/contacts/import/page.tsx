import Link from "next/link";
import { CsvImporter } from "@/components/platform/CsvImporter";

export const dynamic = "force-dynamic";

export default function ContactsImportPage() {
  return (
    <div className="px-8 py-10 max-w-4xl">
      <Link
        href="/platform/contacts"
        className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute hover:text-accent transition-colors inline-block mb-6"
      >
        ← Contacts
      </Link>
      <div className="mb-8">
        <h1 className="font-sans font-medium text-3xl tracking-tight text-ink mb-1">
          Import contacts
        </h1>
        <p className="text-sm text-ink-soft max-w-2xl">
          Bulk-create contacts from a CSV. Duplicates (by email) are skipped.
          New companies are auto-created when a <code>companyName</code> doesn&rsquo;t
          already exist. Maximum 2,000 rows per import.
        </p>
      </div>
      <CsvImporter />
    </div>
  );
}
