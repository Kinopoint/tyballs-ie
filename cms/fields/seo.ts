import type { Field } from "payload";

type SeoDefaults = {
  title?: string;
  description?: string;
  canonicalPath?: string;
};

export function createSeoFields(defaults: SeoDefaults = {}): Field[] {
  return [{
    name: "seo",
    type: "group",
    label: "Search and social sharing",
    fields: [
      { name: "title", type: "text", required: true, maxLength: 65, defaultValue: defaults.title },
      { name: "description", type: "textarea", required: true, maxLength: 170, defaultValue: defaults.description },
      { name: "image", type: "upload", relationTo: "media" },
      { name: "canonicalPath", type: "text", required: true, defaultValue: defaults.canonicalPath },
      { name: "noIndex", type: "checkbox", defaultValue: false },
    ],
  }];
}
