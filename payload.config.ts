import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

// Collections
import { Users } from "./payload/collections/Users.ts";
import { Media } from "./payload/collections/Media.ts";
import { CaseStudies } from "./payload/collections/CaseStudies.ts";
import { Services } from "./payload/collections/Services.ts";
import { TeamMembers } from "./payload/collections/TeamMembers.ts";
import { BlogPosts } from "./payload/collections/BlogPosts.ts";
import { Testimonials } from "./payload/collections/Testimonials.ts";
import { Industries } from "./payload/collections/Industries.ts";
import { WaitlistSignups } from "./payload/collections/WaitlistSignups.ts";
import { Pages } from "./payload/collections/Pages.ts";

// Globals
import { SiteSettings } from "./payload/globals/SiteSettings.ts";
import { Navigation } from "./payload/globals/Navigation.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    CaseStudies,
    Services,
    TeamMembers,
    BlogPosts,
    Testimonials,
    Industries,
    WaitlistSignups,
    Pages,
  ],
  globals: [SiteSettings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
});
