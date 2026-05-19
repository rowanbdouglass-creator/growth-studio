import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "client", "featured", "publishedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "industry",
      type: "relationship",
      relationTo: "industries",
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: {
        description: "One-sentence summary used in card previews and meta description.",
      },
    },
    {
      name: "problem",
      type: "richText",
      editor: lexicalEditor(),
    },
    {
      name: "approach",
      type: "richText",
      editor: lexicalEditor(),
    },
    {
      name: "outcome",
      type: "richText",
      editor: lexicalEditor(),
    },
    {
      name: "technologies",
      type: "array",
      fields: [
        {
          name: "tech",
          type: "text",
          required: true,
        },
      ],
      admin: {
        description: "WordPress, WooCommerce, Next.js, Stripe, etc.",
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "metrics",
      type: "array",
      admin: {
        description: "Hard numbers — revenue lift, conversion rate, hours saved, etc.",
      },
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "context", type: "text" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "title", type: "text" },
        { name: "description", type: "textarea" },
        { name: "image", type: "upload", relationTo: "media" },
      ],
    },
  ],
};
