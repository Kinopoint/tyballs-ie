import type { Field, TextFieldValidation } from "payload";

type SeoDefaults = {
  title?: string;
  description?: string;
  canonicalPath?: string;
};

type SeoOptions = {
  canonicalPathPrefix?: string;
};

function validateCanonicalPath(value: unknown, data: Record<string, unknown>, defaults: SeoDefaults, options: SeoOptions) {
  if (typeof value !== "string" || !value.length) return "Enter the canonical path.";
  if (value !== "/" && !/^\/[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/.test(value)) {
    return "Use a root-relative path with lowercase words and hyphens, for example /events/school-name.";
  }
  if (value.startsWith("/tyballs-ie")) return "Use the production path without the legacy /tyballs-ie prefix.";

  const slug = typeof data.slug === "string" ? data.slug : undefined;
  const expectedPath = defaults.canonicalPath ?? (slug && options.canonicalPathPrefix !== undefined
    ? `${options.canonicalPathPrefix}/${slug}`
    : undefined);
  if (expectedPath && value !== expectedPath) return `The canonical path for this entry must be ${expectedPath}.`;

  return true;
}

function createCanonicalPathValidator(defaults: SeoDefaults, options: SeoOptions): TextFieldValidation {
  return (value, { data }) => validateCanonicalPath(value, data as Record<string, unknown>, defaults, options);
}

export function createSeoFields(defaults: SeoDefaults = {}, options: SeoOptions = {}): Field[] {
  return [{
    name: "seo",
    type: "group",
    label: "Search and social sharing",
    fields: [
      { name: "title", type: "text", required: true, maxLength: 65, defaultValue: defaults.title },
      { name: "description", type: "textarea", required: true, maxLength: 170, defaultValue: defaults.description },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
        filterOptions: {
          mimeType: { in: ["image/jpeg", "image/png", "image/webp", "image/avif"] },
        },
        admin: { description: "Social sharing image. Images are cropped to 1200 × 630; video files are not accepted." },
      },
      {
        name: "canonicalPath",
        type: "text",
        required: true,
        maxLength: 240,
        defaultValue: defaults.canonicalPath,
        admin: { description: "Root-relative production URL. Do not include the domain, query parameters or /tyballs-ie." },
        validate: createCanonicalPathValidator(defaults, options),
      },
      { name: "noIndex", type: "checkbox", defaultValue: false },
    ],
  }];
}
