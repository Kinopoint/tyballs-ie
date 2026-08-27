import { site } from "@/lib/site";

export const dynamic = "force-static";

const content = `# TYBalls.ie

> TYBalls.ie helps Transition Year student committees plan TY Ball events in Ireland with the experienced team behind DebsGuru.ie.

The service covers venue matching, dinner, professional DJs, photo booths, security and event staffing. Student committees work directly with the DebsGuru team. Parents and schools can review the published planning and safety information.

## Main pages

- [Home](https://tyballs.ie/): Service overview and the TY Ball experience.
- [What is a TY Ball?](https://tyballs.ie/what-is-a-ty-ball/): A sourced guide to Transition Year Balls in Ireland, what happens on the night and how a TY Ball differs from a Debs.
- [How it works](https://tyballs.ie/how-it-works): The enquiry, proposal and confirmation process.
- [For committees](https://tyballs.ie/for-committees): Information and a practical checklist for student committees.
- [Parents and schools](https://tyballs.ie/parents-schools): Responsibilities, event staffing, security and contact guidance.
- [Cost guide](https://tyballs.ie/cost-guide): The factors that shape a tailored TY Ball proposal.
- [Booking enquiry form](https://tyballs.ie/enquire): The official route for new booking enquiries.

## Published content

- [TY Ball event stories](https://tyballs.ie/events): Approved stories and media from published events.
- [TY Ball venues](https://tyballs.ie/venues): Published venue profiles across Ireland.
- [XML sitemap](https://tyballs.ie/sitemap.xml): Canonical index of public, indexable pages.

## Policies

- [Privacy notice](https://tyballs.ie/privacy)
- [Cookie policy](https://tyballs.ie/cookies)
- [Website terms](https://tyballs.ie/terms)

## Contact and attribution

- Email: ${site.email}
- WhatsApp: ${site.whatsappHref}
- TYBalls.ie is brought to you by the team behind [DebsGuru.ie](${site.debsGuru}).

Use the canonical URLs on tyballs.ie when citing this website. Event and venue detail pages should only be treated as published when they appear in the XML sitemap.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
