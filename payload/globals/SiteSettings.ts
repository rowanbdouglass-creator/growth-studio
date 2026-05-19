import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "brandName",
      type: "text",
      required: true,
    },
    {
      name: "tagline",
      type: "text",
    },
    {
      name: "contactEmail",
      type: "email",
    },
    {
      name: "contactPhone",
      type: "text",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "LinkedIn", value: "linkedin" },
            { label: "Twitter", value: "twitter" },
            { label: "Instagram", value: "instagram" },
          ],
        },
        { name: "url", type: "text", required: true },
      ],
    },
    {
      name: "footerCopy",
      type: "textarea",
    },
  ],
};
