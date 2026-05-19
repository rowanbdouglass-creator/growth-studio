/**
 * Renders a JSON-LD <script> for structured data.
 * Each instance gets its own script tag so search engines can
 * parse them independently.
 */
interface JsonLdProps {
  data: object;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
