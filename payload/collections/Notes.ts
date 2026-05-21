import type { CollectionConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";

export const Notes: CollectionConfig = {
  slug: "notes",
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["subject", "contact", "company", "createdAt"],
    group: "CRM",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "subject",
      type: "text",
      required: true,
      admin: { description: "Short summary headline" },
    },
    {
      name: "body",
      type: "richText",
      editor: lexicalEditor(),
    },
    {
      name: "contact",
      type: "relationship",
      relationTo: "contacts",
      admin: { width: "50%" },
    },
    {
      name: "company",
      type: "relationship",
      relationTo: "companies",
      admin: { width: "50%" },
    },
    {
      name: "pinned",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Pin to the top of the contact timeline",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
  ],
  timestamps: true,
};
