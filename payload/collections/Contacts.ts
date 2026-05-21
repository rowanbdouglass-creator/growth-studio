import type { CollectionConfig } from "payload";
import { LEAD_SOURCES, PIPELINE_STAGES } from "../../config/pipeline.ts";

export const Contacts: CollectionConfig = {
  slug: "contacts",
  admin: {
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "email", "company", "stage", "source", "updatedAt"],
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
      name: "fullName",
      type: "text",
      required: true,
      index: true,
      admin: { description: "Full name as you'd write it on an email." },
    },
    {
      name: "firstName",
      type: "text",
      admin: { width: "50%" },
    },
    {
      name: "lastName",
      type: "text",
      admin: { width: "50%" },
    },
    {
      name: "email",
      type: "email",
      index: true,
      unique: true,
    },
    {
      name: "phone",
      type: "text",
      admin: { width: "50%" },
    },
    {
      name: "role",
      type: "text",
      admin: {
        description: "Job title at the company",
        width: "50%",
      },
    },
    {
      name: "company",
      type: "relationship",
      relationTo: "companies",
    },
    {
      name: "linkedin",
      type: "text",
      admin: { description: "Full LinkedIn URL" },
    },
    {
      name: "stage",
      type: "select",
      defaultValue: "cold",
      required: true,
      options: PIPELINE_STAGES.map((s) => ({ label: s.label, value: s.id })),
      admin: {
        position: "sidebar",
        description: "Current pipeline position",
      },
    },
    {
      name: "source",
      type: "select",
      options: LEAD_SOURCES.map((s) => ({ label: s.label, value: s.value })),
      admin: { position: "sidebar" },
    },
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      admin: {
        position: "sidebar",
        description: "Agency person responsible for this contact",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "lastContactedAt",
      type: "date",
      admin: { position: "sidebar" },
    },
    {
      name: "nextActionAt",
      type: "date",
      admin: {
        position: "sidebar",
        description: "When the next touch is due",
      },
    },
    {
      name: "doNotContact",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Stop all outreach — respects GDPR + manual unsubscribe",
      },
    },
  ],
  timestamps: true,
};
