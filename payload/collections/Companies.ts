import type { CollectionConfig } from "payload";
import { COMPANY_SIZES } from "../../config/pipeline.ts";

export const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "domain", "industry", "size", "updatedAt"],
    group: "CRM",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "domain",
      type: "text",
      admin: {
        description: "Primary website domain, e.g. acme.com",
        width: "50%",
      },
      index: true,
    },
    {
      name: "industry",
      type: "relationship",
      relationTo: "industries",
      admin: { width: "50%" },
    },
    {
      name: "size",
      type: "select",
      options: COMPANY_SIZES.map((s) => ({ label: s.label, value: s.value })),
      admin: { width: "50%" },
    },
    {
      name: "location",
      type: "text",
      admin: {
        description: "City / region — e.g. London, UK",
        width: "50%",
      },
    },
    {
      name: "linkedin",
      type: "text",
      admin: { description: "Full LinkedIn URL" },
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "notes",
      type: "textarea",
      admin: { description: "Free-form notes about the company" },
    },
  ],
  timestamps: true,
};
