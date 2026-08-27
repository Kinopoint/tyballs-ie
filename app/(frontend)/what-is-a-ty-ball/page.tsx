import type { Metadata } from "next";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbSchema, createPageMetadata } from "@/lib/seo";

const pageTitle = "What Is a TY Ball? Transition Year Ball Guide Ireland";
const pageDescription = "A TY Ball is a formal event for Transition Year students. See what happens, how it differs from a Debs and how committees organise one in Ireland.";
const pageUrl = "https://tyballs.ie/what-is-a-ty-ball/";

const nightFeatures = [
  {
    label: "01 · Venue",
    title: "Beautiful venues",
    text: "TYBalls.ie checks suitable TY Ball venues in Ireland using the county, date and expected attendance.",
    image: "drive-garden" as const,
    alt: "Guests at a TY Ball venue in Ireland",
  },
  {
    label: "02 · Dinner",
    title: "Dinner",
    text: "Students sit down for a meal before the music and dancing begin.",
    image: "drive-dinner" as const,
    alt: "Transition Year students having dinner at a TY Ball",
  },
  {
    label: "03 · Photographs",
    title: "Photobooth",
    text: "A photobooth gives guests a place to take group photographs during the evening.",
    image: "drive-photobooth" as const,
    alt: "Transition Year students using a photobooth",
  },
  {
    label: "04 · Music",
    title: "Professional DJs",
    text: "A professional DJ runs the dance floor. Event security and staff are included.",
    image: "drive-dance" as const,
    alt: "Students dancing to a professional DJ at a TY Ball",
  },
] as const;

const planningSteps = [
  ["Share the basics", "Send the school, county, preferred date and guest estimate."],
  ["Review the proposal", "Check the available venue, inclusions and price."],
  ["Confirm the booking", "Agree the terms and secure the date."],
  ["Share event information", "Send the final timings and arrangements to everyone attending."],
] as const;

const questions = [
  {
    question: "Who organises a TY Ball?",
    answer: "A student committee works directly with the TY Ball organiser. The committee manages ticket sales and sends the guest list. The organiser coordinates the venue and agreed event services.",
  },
  {
    question: "Do we need final guest numbers before making an enquiry?",
    answer: "No. A realistic estimate is enough to start. The final attendance can be confirmed later.",
  },
  {
    question: "Is security included at a TY Ball?",
    answer: "Yes. Security is included in every event booking. DebsGuru staff and hotel staff also work at the event.",
  },
  {
    question: "Does TYBalls.ie organise transport?",
    answer: "No. Students book their own local transport suppliers. The DebsGuru team provides guidance on timings and locations.",
  },
  {
    question: "Can parents attend a TY Ball?",
    answer: "Yes. Parents are welcome to attend.",
  },
  {
    question: "Does an enquiry reserve the date?",
    answer: "No. The date is secured after availability, pricing and the booking terms have been agreed.",
  },
] as const;

export function generateMetadata(): Metadata {
  return createPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/what-is-a-ty-ball",
    image: "/og/home.jpg",
    imageAlt: "Transition Year students at a TY Ball in Ireland",
    type: "article",
    publishedTime: "2026-08-27",
    modifiedTime: "2026-08-27",
  });
}

const schema = [
  breadcrumbSchema("What is a TY Ball?", "/what-is-a-ty-ball/"),
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    mainEntityOfPage: pageUrl,
    headline: pageTitle,
    description: "A clear guide to TY Balls in Ireland, including what happens, how a TY Ball differs from a Debs and how student committees organise an event.",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    author: { "@type": "Organization", name: "DebsGuru Ltd", url: "https://debsguru.ie/" },
    publisher: { "@type": "Organization", name: "DebsGuru Ltd", url: "https://debsguru.ie/" },
    about: {
      "@type": "DefinedTerm",
      name: "TY Ball",
      description: "A formal event planned for Transition Year students in Ireland.",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  },
];

export default function WhatIsATyBallPage() {
  return (
    <main className="ty-guide" id="main-content">
      <StructuredData data={schema} />

      <section className="ty-guide-hero">
        <EditorialImage
          alt="Transition Year students arriving at a TY Ball venue in Ireland"
          className="ty-guide-hero-media"
          height={1080}
          name="drive-arrival"
          priority
          sizes="100vw"
          width={1920}
        />
        <div className="ty-guide-shell ty-guide-hero-copy">
          <p className="ty-guide-eyebrow">Transition Year Ball Ireland</p>
          <h1>What is a <em>TY Ball?</em></h1>
          <p className="ty-guide-lede">
            A TY Ball is a formal social event for students in Transition Year at an Irish post-primary school. The night usually includes a venue, dinner, photographs and music. Student committees work with TY Ball organisers to agree the date, guest estimate and practical arrangements.
          </p>
          <Link className="button" href="#what-happens">What happens at a TY Ball? ↓</Link>
          <p className="ty-guide-trust">
            <span>From the team behind DebsGuru.ie</span>
            <span>10+ years of event experience</span>
            <span>Updated <time dateTime="2026-08-27">27 August 2026</time></span>
          </p>
        </div>
      </section>

      <section className="ty-guide-section">
        <div className="ty-guide-shell ty-guide-intro-grid">
          <div>
            <p className="ty-guide-eyebrow">The name</p>
            <h2>What does TY Ball mean?</h2>
          </div>
          <div className="ty-guide-intro-copy">
            <p>TY is short for Transition Year, the optional one-year programme offered by many Irish post-primary schools. A Ball is a formal evening event. Put together, TY Ball means a formal event planned for students taking part in Transition Year.</p>
            <div className="ty-guide-wordmark">
              <div className="ty-guide-word-row">
                <strong>TY</strong>
                <p>Transition Year, a one-year optional programme in Irish post-primary education.</p>
              </div>
              <div className="ty-guide-word-row">
                <strong>Ball</strong>
                <p>A formal evening event with a venue, dinner, photographs and entertainment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ty-guide-section ty-guide-feature-intro">
        <div className="ty-guide-shell">
          <p className="ty-guide-eyebrow">On the night</p>
          <h2>What happens at a TY Ball?</h2>
        </div>
      </section>

      <section aria-label="What happens on the night" className="ty-guide-feature-strip" id="what-happens">
        {nightFeatures.map((feature) => (
          <article className="ty-guide-feature" key={feature.title}>
            <EditorialImage alt={feature.alt} height={1200} name={feature.image} sizes="(max-width: 760px) 84vw, 25vw" width={900} />
            <div className="ty-guide-feature-copy">
              <small>{feature.label}</small>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="ty-guide-compare">
        <div className="ty-guide-shell">
          <div className="ty-guide-compare-head">
            <div>
              <p className="ty-guide-eyebrow">Different year groups</p>
              <h2>TY Ball or Debs?</h2>
            </div>
            <p>A TY Ball takes place during Transition Year. A Debs is generally held for students near the end of secondary school. Both are formal events, but they are planned for different year groups.</p>
          </div>
          <div className="ty-guide-compare-grid">
            <article className="ty-guide-compare-card">
              <h3>TY Ball</h3>
              <p>A formal event for students taking part in Transition Year.</p>
              <div className="ty-guide-facts">
                <div><strong>For</strong><span>Transition Year students</span></div>
                <div><strong>Timing</strong><span>During the TY school year</span></div>
                <div><strong>Planning</strong><span>Student committee and organiser</span></div>
              </div>
            </article>
            <article className="ty-guide-compare-card">
              <h3>Debs</h3>
              <p>A formal event usually linked with the final years of secondary school.</p>
              <div className="ty-guide-facts">
                <div><strong>For</strong><span>Senior-cycle students</span></div>
                <div><strong>Timing</strong><span>Near the end of school</span></div>
                <div><strong>Format</strong><span>Dinner and evening entertainment</span></div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="ty-guide-section">
        <div className="ty-guide-shell ty-guide-story">
          <div className="ty-guide-story-media">
            <EditorialImage alt="Transition Year students together at a TY Ball in Ireland" height={1350} name="drive-group" sizes="(max-width: 760px) 100vw, 55vw" width={1080} />
            <span>Ireland<br />Transition Year</span>
          </div>
          <div className="ty-guide-story-copy">
            <p className="ty-guide-eyebrow">A dated example</p>
            <h2>TY Balls in Ireland</h2>
            <p>Irish school records show that the term Transition Year Ball has been used since at least 2007. A newsletter from Eureka Secondary School records that its TY students held their first Transition Year Ball at the Headfort Hotel. The event raised €1,800 for a defibrillator.</p>
            <p>That is one dated example of the term in use. It does not establish where TY Balls began nationally. Schools and organisers use the name for formal events created for Transition Year students.</p>
            <p className="ty-guide-story-note">Source: <a href="https://www.eurekasecondaryschool.ie/uploads/6/5/3/1/6531880/christmas_newsletter_2007.pdf" rel="noreferrer" target="_blank">Eureka Secondary School, Christmas Newsletter 2007</a>.</p>
          </div>
        </div>
      </section>

      <section className="ty-guide-section ty-guide-sources">
        <div className="ty-guide-shell">
          <p className="ty-guide-eyebrow">References</p>
          <h2>Sources used for this guide</h2>
          <div className="ty-guide-source-grid">
            <a className="ty-guide-source-card" href="https://www.curriculumonline.ie/senior-cycle/transition-year/" rel="noreferrer" target="_blank">
              <small>Official programme information</small>
              <strong>National Council for Curriculum and Assessment</strong>
              <span>Transition Year programme information for Irish post-primary schools.</span>
            </a>
            <a className="ty-guide-source-card" href="https://www.eurekasecondaryschool.ie/uploads/6/5/3/1/6531880/christmas_newsletter_2007.pdf" rel="noreferrer" target="_blank">
              <small>School record · 2007</small>
              <strong>Eureka Secondary School newsletter</strong>
              <span>A dated record of a Transition Year Ball held at the Headfort Hotel.</span>
            </a>
            <a className="ty-guide-source-card" href="https://www.independent.ie/regionals/cork/lifestyle/cork-schools-transition-years-decamp-to-the-kingdom-for-ball/a929012978.html" rel="noreferrer" target="_blank">
              <small>Event reporting</small>
              <strong>Irish Independent</strong>
              <span>Reporting on a school Transition Year Ball held in Kerry.</span>
            </a>
          </div>
        </div>
      </section>

      <section className="ty-guide-section ty-guide-plan">
        <div className="ty-guide-shell">
          <div className="ty-guide-plan-head">
            <p className="ty-guide-eyebrow">For student committees</p>
            <h2>How to organise a TY Ball</h2>
            <p>Start with the school, county, preferred date and a realistic guest estimate. TYBalls.ie checks suitable venues and prepares a proposal covering the event arrangements and price.</p>
          </div>
          <div className="ty-guide-plan-grid">
            {planningSteps.map(([title, text], index) => (
              <article key={title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="ty-guide-transport-note">Students book their own local transport suppliers. The DebsGuru team provides guidance on timings and locations.</p>
        </div>
      </section>

      <section className="ty-guide-section">
        <div className="ty-guide-shell ty-guide-faq">
          <div>
            <p className="ty-guide-eyebrow">Practical information</p>
            <h2>TY Ball questions</h2>
          </div>
          <div className="ty-guide-faq-list">
            {questions.map(({ question, answer }) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="ty-guide-shell ty-guide-cta-wrap">
        <div className="ty-guide-cta">
          <EditorialImage alt="Students celebrating together at a TY Ball" height={1080} name="drive-group" sizes="100vw" width={1920} />
          <div>
            <p className="ty-guide-eyebrow">School · County · Date · Guest estimate</p>
            <h2>Start a TY Ball enquiry</h2>
            <p>Send the starting details. You do not need a final guest list to begin.</p>
            <Link className="button" href="/enquire">Open the Booking Enquiry Form →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
