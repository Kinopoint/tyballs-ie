import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";

export const metadata: Metadata = {
  title: "TY Ball Planning for School Committees",
  description: "The information a TY Ball committee should gather before contacting DebsGuru.",
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
      <section className="page-hero shell"><p className="eyebrow">For TY committees</p><h1>Information to gather before you enquire</h1><p>The committee only needs a few basic details for DebsGuru to begin checking suitable options.</p></section>
      <figure className="editorial-visual shell">
        <EditorialImage
          alt="Adult event coordinators reviewing a venue plan"
          height={768}
          name="planning-session"
          width={1376}
        />
      </figure>
      <section className="editorial-page shell">
        <div className="editorial-intro"><p className="eyebrow">Committee checklist</p><h2>Five details for the first conversation</h2><p>Prices and availability depend on the actual date, venue and attendance. These details allow DebsGuru to start with relevant options.</p></div>
        <div className="editorial-list">{checklist.map(([title, text]) => <article key={title}><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
      </section>
      <section className="page-cta shell"><div><p className="eyebrow">Committee enquiry</p><h2>Send the details to DebsGuru</h2></div><Link className="button button-dark" href="/enquire">Open the enquiry form</Link></section>
    </main>
  );
}
