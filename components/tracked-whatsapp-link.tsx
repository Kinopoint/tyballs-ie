"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedWhatsAppLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  location: "footer" | "header" | "mobile_navigation";
};

export function TrackedWhatsAppLink({ children, location, onClick, ...props }: TrackedWhatsAppLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("whatsapp_click", { location });
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
