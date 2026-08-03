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

const attendanceBands = [
  ["50_80", "50–80"],
  ["80_120", "80–120"],
  ["120_150", "120–150"],
  ["more_than_150", "More than 150"],
] as const;

const referralSources = [
  ["previous_year", "Previous school year"],
  ["friends_schools", "Friends / other schools"],
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["google", "Google search"],
  ["other", "Other"],
] as const;

export function EnquiryForm() {
  const [state, setState] = useState<State>({ kind: "idle", message: "" });
  const [token, setToken] = useState("");
  const [referralSource, setReferralSource] = useState("");
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
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      school: data.get("school"),
      schoolLocation: data.get("schoolLocation"),
      joiningSchools: data.get("joiningSchools"),
      email: data.get("email"),
      phone: data.get("phone"),
      enquiryType: data.get("enquiryType"),
      preferredDate: data.get("preferredDate"),
      preferredLocation: data.get("preferredLocation"),
      yearSize: data.get("yearSize"),
      attendanceBand: data.get("attendanceBand"),
      referralSource: data.get("referralSource"),
      referralOther: data.get("referralOther"),
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
    setReferralSource("");
    trackEvent("generate_lead", { form_name: "tyballs_enquiry" });
    setState({ kind: "success", message: result.message || "Your enquiry has been received." });
  }

  return (
    <>
      {!previewMode ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={renderTurnstile} /> : null}
      <form className="enquiry-form" onSubmit={submit} onFocusCapture={() => { if (!formStarted.current) { formStarted.current = true; trackEvent("form_start", { form_name: "tyballs_enquiry" }); } }}>
        <div className="form-section">
          <div className="form-section-heading"><div><h2>Your contact details</h2><p>These details allow a DebsGuru coordinator to respond to the committee.</p></div></div>
          <div className="field-grid">
            <label className="field"><span>First name *</span><input name="firstName" autoComplete="given-name" required maxLength={80} /></label>
            <label className="field"><span>Last name *</span><input name="lastName" autoComplete="family-name" required maxLength={80} /></label>
            <label className="field"><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required maxLength={30} /></label>
            <label className="field"><span>Email *</span><input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-heading"><div><h2>Your school</h2><p>Your year size gives the team a stronger starting point for attendance planning.</p></div></div>
          <div className="field-grid">
            <label className="field field-wide"><span>School name *</span><input name="school" autoComplete="organization" required maxLength={160} /></label>
            <label className="field"><span>School location *</span><input name="schoolLocation" autoComplete="address-level1" required maxLength={120} placeholder="Town or county" /></label>
            <label className="field"><span>How many people are in your year? *</span><input name="yearSize" type="number" inputMode="numeric" min={10} max={2000} required placeholder="Approximately" /></label>
            <label className="field field-wide"><span>Include any other school names here if you are joining with other schools for this event <em>optional</em></span><textarea name="joiningSchools" rows={3} maxLength={500} /></label>
          </div>
        </div>

        <fieldset className="form-section">
          <legend className="form-section-heading"><div><h2>Event details</h2><p>All fields in this section are required, matching the DebsGuru booking enquiry.</p></div></legend>
          <div className="form-choice-group">
            <span className="form-group-label">Enquiring for *</span>
            <div className="choice-grid choice-grid-compact">
              <label className="choice"><input type="radio" name="enquiryType" value="debs" required /><span>Debs</span></label>
              <label className="choice"><input type="radio" name="enquiryType" value="ty_ball" required /><span>TY Ball</span></label>
            </div>
          </div>
          <div className="field-grid">
            <label className="field"><span>Preferred date for the event? *</span><input name="preferredDate" type="date" required /></label>
            <label className="field"><span>Preferred location for your event? *</span><input name="preferredLocation" required maxLength={160} /></label>
          </div>
          <div className="form-choice-group">
            <span className="form-group-label">Estimated total attendance, including plus-ones *</span>
            <div className="choice-grid choice-grid-attendance">
              {attendanceBands.map(([value, label]) => <label className="choice" key={value}><input type="radio" name="attendanceBand" value={value} required /><span>{label}</span></label>)}
            </div>
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend className="form-section-heading"><div><h2>One last detail</h2><p>Tell us how you found DebsGuru and include anything else the team should know.</p></div></legend>
          <div className="form-choice-group">
            <span className="form-group-label">How did you hear about DebsGuru? *</span>
            <div className="choice-grid">
              {referralSources.map(([value, label]) => <label className="choice" key={value}><input checked={referralSource === value} name="referralSource" onChange={() => setReferralSource(value)} type="radio" value={value} required /><span>{label}</span></label>)}
            </div>
          </div>
          {referralSource === "other" ? <div className="field-grid form-conditional-field"><label className="field field-wide"><span>Please tell us how you heard about DebsGuru *</span><input name="referralOther" required maxLength={160} /></label></div> : <input name="referralOther" type="hidden" value="" />}
          <div className="field-grid form-message-field"><label className="field field-wide"><span>Anything else you might require or want to tell us? <em>optional</em></span><textarea name="message" rows={5} maxLength={2000} /></label></div>
        </fieldset>

        <div className="form-finish">
          <label className="trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label className="consent"><input type="checkbox" name="privacyConsent" value="yes" required /><span>DebsGuru works directly with Debs and TY Ball committees. I have read the <Link href="/privacy" target="_blank">Privacy Policy</Link> and agree that DebsGuru Ltd may reply to this enquiry and send follow-up information related to it. *</span></label>
          <input name="marketingConsent" type="hidden" value="no" />
          {previewMode ? <p className="preview-notice">Preview website: enquiry sending will be enabled on the secure TYBalls.ie server.</p> : siteKey ? <div className="turnstile" ref={widgetRef} /> : <p className="configuration-error">The enquiry form security key is not configured.</p>}
          <button className="button button-dark form-button" disabled={previewMode || state.kind === "submitting" || state.kind === "success"} type="submit">{previewMode ? "Preview only" : state.kind === "submitting" ? "Sending…" : "Send booking enquiry"}</button>
          <p className={`form-response ${state.kind}`} aria-live="polite">{state.message}</p>
          <p className="form-disclaimer">Sending an enquiry does not reserve a date or create a booking.</p>
        </div>
      </form>
    </>
  );
}
