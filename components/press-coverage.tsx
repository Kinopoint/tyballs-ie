import Link from "next/link";
import { StructuredData } from "@/components/structured-data";

const coverage = [
  {
    date: "2026-02-28",
    dateLabel: "28 February 2026",
    publication: "Tralee Today",
    title: "Nearly 400 students at the Tralee TY Ball",
    summary: "Ballyroe Lodge hosted the Tralee Transition Year Ball, with food and entertainment from the DebsGuru team.",
    url: "https://traleetoday.ie/photos-style-from-the-tralee-transition-year-ball-at-ballyroe/",
  },
  {
    date: "2025-02-20",
    dateLabel: "20 February 2025",
    publication: "Irish Independent",
    title: "A North Kerry TY Ball for more than 200 students",
    summary: "The report covers a Transition Year Ball at Ballyroe Heights organised by DebsGuru for students from across North Kerry.",
    url: "https://www.independent.ie/regionals/kerry/lifestyle/photos-show-transition-year-students-from-across-north-kerry-having-a-ball-in-the-ballyroe-heights/a366775821.html",
  },
  {
    date: "2023-02-17",
    dateLabel: "17 February 2023",
    publication: "Irish Independent",
    title: "Listowel students mark their Transition Year Ball",
    summary: "A student committee worked with DebsGuru to organise the event at Ballyroe Heights in Tralee.",
    url: "https://www.independent.ie/regionals/kerry/north-west-kerry-news/ballyroe-heights-hotel-hosts-magical-transition-year-ball/42347188.html",
  },
] as const;

const coverageSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Press coverage of DebsGuru Transition Year Ball events",
  itemListElement: coverage.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Article",
      datePublished: item.date,
      headline: item.title,
      publisher: { "@type": "Organization", name: item.publication },
      url: item.url,
    },
  })),
};

export function PressCoverage() {
  return (
    <section className="zip-section zip-shell press-coverage" aria-labelledby="press-coverage-title">
      <StructuredData data={coverageSchema} />
      <div className="press-coverage-heading">
        <div>
          <p className="zip-eyebrow">In the press</p>
          <h2 id="press-coverage-title">Transition Year Ball Ireland</h2>
        </div>
        <p>Reports from Tralee Today and the Irish Independent cover Transition Year Ball events organised by the DebsGuru team at Ballyroe in Kerry. The same TY Ball organisers are behind TYBalls.ie.</p>
      </div>

      <div className="press-coverage-grid" aria-label="Press reports about DebsGuru TY Ball events">
        {coverage.map((item) => (
          <a className="press-card" href={item.url} key={item.url} rel="noreferrer" target="_blank">
            <div className="press-card-meta">
              <span><i aria-hidden="true" />{item.publication}</span>
              <time dateTime={item.date}>{item.dateLabel}</time>
            </div>
            <div className="press-card-copy">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
            <span className="press-card-link">Read the report <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>

      <div className="press-coverage-footer">
        <p>Coverage of events held at Ballyroe in Kerry.</p>
        <Link href="/venues">Explore TY Ball venues in Ireland <span aria-hidden="true">→</span></Link>
      </div>
    </section>
  );
}
