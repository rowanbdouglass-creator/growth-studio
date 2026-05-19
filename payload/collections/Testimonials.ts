import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "author",
    defaultColumns: ["author", "company", "featured"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "quote",
      type: "textarea",
      required: true,
    },
    { name: "author", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "company", type: "text" },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
  ],
};
