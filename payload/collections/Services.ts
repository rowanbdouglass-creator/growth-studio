import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Services: CollectionConfig = {
  slug: "services",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "pillar", "order"],
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
      name: "pillar",
      type: "select",
      required: true,
      options: [
        { label: "Paid Growth", value: "paid-growth" },
        { label: "Custom Systems", value: "custom-systems" },
        { label: "Intelligence Layer", value: "intelligence-layer" },
      ],
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      editor: lexicalEditor(),
    },
    {
      name: "capabilities",
      type: "array",
      fields: [
        { name: "capability", type: "text", required: true },
      ],
    },
    {
      name: "idealClient",
      type: "textarea",
    },
    {
      name: "pricing",
      type: "text",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
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
