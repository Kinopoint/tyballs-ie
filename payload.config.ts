import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Events } from "@/cms/collections/Events";
import { Enquiries } from "@/cms/collections/Enquiries";
import { FAQs } from "@/cms/collections/FAQs";
import { Galleries } from "@/cms/collections/Galleries";
import { Media } from "@/cms/collections/Media";
import { Pages } from "@/cms/collections/Pages";
import { Users } from "@/cms/collections/Users";
import { Venues } from "@/cms/collections/Venues";
import { HomePage } from "@/cms/globals/HomePage";
import { SiteSettings } from "@/cms/globals/SiteSettings";
import { migrations } from "@/cms/migrations";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    meta: {
      titleSuffix: " · TYBalls.ie CMS",
    },
  },
  collections: [Users, Media, Enquiries, Pages, FAQs, Galleries, Venues, Events],
  cors: [serverURL],
  csrf: [serverURL],
  globals: [SiteSettings, HomePage],
  graphQL: { disable: true },
  routes: { api: "/cms-api" },
  db: postgresAdapter({
    allowIDOnCreate: true,
    idType: "uuid",
    migrationDir: path.resolve(dirname, "cms/migrations"),
    pool: { connectionString: process.env.DATABASE_URL || "" },
    prodMigrations: migrations,
    push: process.env.NODE_ENV !== "production",
    schemaName: "cms",
  }),
  editor: lexicalEditor(),
  email: process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_USER || "info@debsguru.ie",
        defaultFromName: "TYBalls.ie",
        skipVerify: process.env.NODE_ENV !== "production",
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT || 587) === 465,
          requireTLS: Number(process.env.SMTP_PORT || 587) !== 465 && process.env.SMTP_REQUIRE_TLS !== "false",
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
            : undefined,
        },
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  upload: {
    limits: {
      fileSize: 150 * 1024 * 1024,
    },
  },
});
