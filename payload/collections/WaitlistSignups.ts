import type { CollectionConfig } from "payload";

export const WaitlistSignups: CollectionConfig = {
  slug: "waitlist-signups",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "tool", "name", "createdAt"],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      index: true,
    },
    {
      name: "tool",
      type: "select",
      required: true,
      options: [
        { label: "Ad Audit", value: "ad-audit" },
        { label: "Website Audit", value: "website-audit" },
        { label: "Discovery Hub", value: "discovery-hub" },
      ],
    },
    { name: "name", type: "text" },
    { name: "company", type: "text" },
  ],
};
