import type { CollectionConfig } from "payload";

export const Industries: CollectionConfig = {
  slug: "industries",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier, e.g. 'embroidery' or 'opticians'.",
      },
    },
    {
      name: "description",
      type: "textarea",
    },
  ],
};
