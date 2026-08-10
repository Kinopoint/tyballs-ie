import type { CollectionConfig } from "payload";
import { isAdmin, isAdminField } from "@/cms/access";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "CMS user", plural: "CMS users" },
  admin: {
    group: "Administration",
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role", "updatedAt"],
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    cookies: {
      sameSite: "Strict",
      secure: process.env.NODE_ENV === "production",
    },
  },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: isAdmin,
    delete: isAdmin,
    read: ({ req }) => {
      if ((req.user as { role?: string } | null)?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
    update: ({ req }) => {
      if ((req.user as { role?: string } | null)?.role === "admin") return true;
      return req.user ? { id: { equals: req.user.id } } : false;
    },
  },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      saveToJWT: true,
      access: { create: isAdminField, update: isAdminField },
      options: [
        { label: "Administrator", value: "admin" },
        { label: "Content editor", value: "editor" },
      ],
    },
  ],
  timestamps: true,
};
