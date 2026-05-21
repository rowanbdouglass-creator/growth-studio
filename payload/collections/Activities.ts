import type { CollectionConfig } from "payload";
import { ACTIVITY_TYPES } from "../../config/pipeline.ts";

/**
 * Append-only activity log. Every meaningful interaction with a
 * contact (manual or system-generated) writes one row here. Powers
 * the contact-detail timeline and the dashboard activity feed.
 *
 * Updates and deletes are disabled — once written, an activity is
 * the historical record.
 */
export const Activities: CollectionConfig = {
  slug: "activities",
  admin: {
    useAsTitle: "summary",
    defaultColumns: ["type", "summary", "contact", "actor", "createdAt"],
    group: "CRM",
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: () => false, // append-only
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "type",
      type: "select",
      required: true,
      options: ACTIVITY_TYPES.map((t) => ({ label: t.label, value: t.value })),
      index: true,
    },
    {
      name: "summary",
      type: "text",
      required: true,
      admin: {
        description:
          "One-line description of what happened. Shown in timelines + activity feed.",
      },
    },
    {
      name: "detail",
      type: "textarea",
      admin: {
        description:
          "Optional expanded detail. Email body, call notes, error message, etc.",
      },
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
      name: "actor",
      type: "relationship",
      relationTo: "users",
      admin: {
        width: "50%",
        description: "Person who triggered the activity (null = system)",
      },
    },
    {
      name: "metadata",
      type: "json",
      admin: {
        description:
          "Free-form JSON for system-generated activities — IDs, URLs, prior values, etc.",
      },
    },
  ],
  timestamps: true,
};
