import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";

interface RichTextProps {
  data: unknown;
  className?: string;
}

/**
 * Wrapper around Payload's Lexical → JSX renderer with the styles
 * we use for marketing prose: serif headings, generous line-height,
 * accent links.
 */
export function RichText({ data, className = "" }: RichTextProps) {
  if (!data) return null;
  return (
    <div
      className={
        "prose-marketing " +
        "text-text-secondary text-base leading-relaxed " +
        "[&_p]:mb-5 [&_p]:last:mb-0 " +
        "[&_h1]:font-serif [&_h1]:text-4xl [&_h1]:text-text-primary [&_h1]:mt-12 [&_h1]:mb-6 " +
        "[&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-text-primary [&_h2]:mt-12 [&_h2]:mb-6 " +
        "[&_h3]:font-serif [&_h3]:text-2xl [&_h3]:text-text-primary [&_h3]:mt-10 [&_h3]:mb-4 " +
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-accent-hover " +
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 " +
        "[&_li]:mb-2 " +
        "[&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:pl-6 [&_blockquote]:font-serif [&_blockquote]:italic [&_blockquote]:text-text-primary " +
        "[&_strong]:text-text-primary [&_strong]:font-medium " +
        className
      }
    >
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <LexicalRichText data={data as any} />
    </div>
  );
}
