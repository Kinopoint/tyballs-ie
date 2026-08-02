import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TY Ball Planning for School Committees",
  description: "A clear TY Ball planning process for committees: dates, attendance estimates, priorities and tailored venue proposals.",
  alternates: { canonical: "/for-committees" },
};

const checklist = [
  ["Your preferred date", "A first choice is useful, but a little flexibility can open more venue options."],
  ["An honest attendance estimate", "You do not need a final list. A realistic estimate is more useful than adjusting the number to meet an assumed minimum."],
  ["Your location", "Tell us the school and county so the team can discuss practical venue options."],
  ["Your priorities", "Food, music, photography, entertainment and transport can carry different weight for every year group."],
  ["One committee contact", "A clear point of contact keeps decisions, questions and updates in one place."],
] as const;

export default function CommitteesPage() {
  return (
    <main id="main-content">
      <section className="page-hero shell"><p className="eyebrow">For TY committees</p><h1>A plan you can actually manage.</h1><p>You bring the honest starting point. The team helps turn it into a practical event proposal.</p></section>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">Your starting checklist</p><h2>You do not need every answer before you enquire.</h2><p>Venue pricing and availability can change, so the useful first step is not choosing a fictional package. It is giving the team enough context to check the right options.</p></div>
        <div className="editorial-list">{checklist.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Start with the essentials</p><h2>Tell us what you know.</h2></div><Link className="button button-dark" href="/enquire">Start your enquiry <span aria-hidden="true">↗</span></Link></section>
    </main>
  );
}
