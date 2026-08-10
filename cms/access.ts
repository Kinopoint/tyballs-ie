import type { Access, FieldAccess } from "payload";

type CmsUser = {
  id: string;
  role?: "admin" | "editor";
};

export const isAuthenticated: Access = ({ req }) => Boolean(req.user);

export const isAdmin: Access = ({ req }) => (req.user as CmsUser | null)?.role === "admin";

export const isAdminField: FieldAccess = ({ req }) => (req.user as CmsUser | null)?.role === "admin";

export const canManageContent: Access = ({ req }) => {
  const role = (req.user as CmsUser | null)?.role;
  return role === "admin" || role === "editor";
};

export const publishedOrAuthenticated: Access = ({ req }) => {
  if (req.user) return true;
  return { _status: { equals: "published" } };
};
