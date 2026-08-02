"use client";

import Script from "next/script";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (target: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "expired-callback": () => void; theme: string }) => string;
      reset: (widgetId: string) => void;
    };
  }
}

type State = { kind: "idle" | "submitting" | "success" | "error"; message: string };

const priorities = [
  ["venue", "Venue"],
  ["food", "Food"],
  ["dj", "DJ & dance floor"],
  ["photography", "Photography"],
  ["entertainment", "Entertainment & extras"],
  ["not_sure", "Not sure yet"],
] as const;

export function EnquiryForm() {
  const [state, setState] = useState<State>({ kind: "idle", message: "" });
  const [token, setToken] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef("");
  const formStarted = useRef(false);
  const previewMode = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "true";
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

  const renderTurnstile = () => {
    if (!siteKey || !widgetRef.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: siteKey,
      callback: setToken,
      "expired-callback": () => setToken(""),
      theme: "light",
    });
  };

  useEffect(() => {
    if (window.turnstile) renderTurnstile();
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!token) {
      setState({ kind: "error", message: "Please complete the security check." });
      return;
    }

    setState({ kind: "submitting", message: "Sending your enquiry…" });
    const data = new FormData(form);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      school: data.get("school"),
      county: data.get("county"),
      contactName: data.get("contactName"),
      email: data.get("email"),
      phone: data.get("phone"),
      estimatedAttendance: data.get("estimatedAttendance"),
      preferredDate: data.get("preferredDate"),
      dateFlexibility: data.get("dateFlexibility"),
      priorities: data.getAll("priorities"),
      message: data.get("message"),
      privacyConsent: data.get("privacyConsent") === "yes",
      marketingConsent: data.get("marketingConsent") === "yes",
      website: data.get("website"),
      turnstileToken: token,
      landingPage: window.location.href,
      referrer: document.referrer,
      utmSource: params.get("utm_source") || "",
      utmMedium: params.get("utm_medium") || "",
      utmCampaign: params.get("utm_campaign") || "",
      utmContent: params.get("utm_content") || "",
      utmTerm: params.get("utm_term") || "",
      gclid: params.get("gclid") || "",
      fbclid: params.get("fbclid") || "",
    };

    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as { accepted?: boolean; message?: string };

    if (!response.ok || !result.accepted) {
      setState({ kind: "error", message: result.message || "We could not send the enquiry. Please try again." });
      if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
      setToken("");
      return;
    }

    form.reset();
    trackEvent("generate_lead", { form_name: "tyballs_enquiry" });
    setState({ kind: "success", message: result.message || "Your enquiry has been received." });
  }

  return (
    <>
      {!previewMode ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderTurnstile} /> : null}
      <form className="enquiry-form" onSubmit={submit} onFocusCapture={() => { if (!formStarted.current) { formStarted.current = true; trackEvent("form_start", { form_name: "tyballs_enquiry" }); } }}>
        <div className="form-section">
          <div className="form-section-heading"><div><h2>About your TY Ball</h2><p>An honest estimate is all we need at this stage.</p></div></div>
          <div className="field-grid">
            <label className="field field-wide"><span>School name</span><input name="school" autoComplete="organization" required maxLength={160} /></label>
            <label className="field"><span>County</span><input name="county" autoComplete="address-level1" required maxLength={80} /></label>
            <label className="field"><span>Estimated attendance</span><input name="estimatedAttendance" type="number" inputMode="numeric" min={10} max={2000} required placeholder="Your best estimate" /></label>
            <label className="field"><span>Preferred date <em>if known</em></span><input name="preferredDate" type="date" /></label>
            <label className="field"><span>How flexible is the date?</span><select name="dateFlexibility" required defaultValue=""><option value="" disabled>Select one</option><option value="exact">This exact date</option><option value="same_week">Other dates that week</option><option value="flexible">We are flexible</option><option value="not_sure">Not sure yet</option></select></label>
          </div>
        </div>

        <fieldset className="form-section">
          <legend className="form-section-heading"><div><h2>What matters most?</h2><p>Select any priorities. Your choices simply help the team understand the event.</p></div></legend>
          <div className="choice-grid">
            {priorities.map(([value, label]) => <label className="choice" key={value}><input type="checkbox" name="priorities" value={value} /><span>{label}</span></label>)}
          </div>
        </fieldset>

        <div className="form-section">
          <div className="form-section-heading"><div><h2>Committee contact</h2><p>We will use these details to discuss the enquiry.</p></div></div>
          <div className="field-grid">
            <label className="field"><span>Your name</span><input name="contactName" autoComplete="name" required maxLength={120} /></label>
            <label className="field"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
            <label className="field field-wide"><span>Email</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label className="field field-wide"><span>Anything else we should know? <em>optional</em></span><textarea name="message" rows={5} maxLength={2000} placeholder="Location, venue ideas, timing or questions" /></label>
          </div>
        </div>

        <div className="form-finish">
          <label className="trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label className="consent"><input type="checkbox" name="privacyConsent" value="yes" required /><span>I have read the <Link href="/privacy" target="_blank">Privacy Policy</Link> and agree that DebsGuru Ltd may use these details to respond to this enquiry.</span></label>
          <label className="consent"><input type="checkbox" name="marketingConsent" value="yes" /><span>I would also like to receive occasional TY Ball updates. <em>Optional.</em></span></label>
          {previewMode ? <p className="preview-notice">Preview website: enquiry sending will be enabled on the secure TYBalls.ie server.</p> : siteKey ? <div className="turnstile" ref={widgetRef} /> : <p className="configuration-error">The enquiry form security key is not configured.</p>}
          <button className="button button-dark form-button" disabled={previewMode || state.kind === "submitting" || state.kind === "success"} type="submit">{previewMode ? "Preview only" : state.kind === "submitting" ? "Sending…" : "Send enquiry"}</button>
          <p className={`form-response ${state.kind}`} aria-live="polite">{state.message}</p>
          <p className="form-disclaimer">Submitting this form does not reserve a date or create a booking.</p>
        </div>
      </form>
    </>
  );
}
