import { getPayload } from "payload";
import config from "@payload-config";

const email = process.env.CMS_ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.CMS_ADMIN_PASSWORD;
const name = process.env.CMS_ADMIN_NAME?.trim();

if (!email || !password || !name) {
  throw new Error("CMS_ADMIN_EMAIL, CMS_ADMIN_PASSWORD and CMS_ADMIN_NAME are required.");
}

if (password.length < 14) {
  throw new Error("CMS_ADMIN_PASSWORD must contain at least 14 characters.");
}

const payload = await getPayload({ config });
const existing = await payload.find({
  collection: "users",
  limit: 1,
  pagination: false,
  where: { email: { equals: email } },
});

if (existing.docs[0]) {
  throw new Error(`A CMS user already exists for ${email}. No account was changed.`);
}

await payload.create({
  collection: "users",
  data: { email, password, name, role: "admin" },
});

payload.logger.info(`CMS administrator created for ${email}.`);
await payload.destroy();
