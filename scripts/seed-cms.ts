import { getPayload } from "payload";
import config from "@payload-config";
import type { Page } from "@/payload-types";
import path from "node:path";

type SeedPage = Omit<Page, "id" | "createdAt" | "updatedAt">;

const pages: SeedPage[] = [
  {
    title: "How it works",
    slug: "how-it-works",
    hero: {
      eyebrow: "How it works",
      title: "From enquiry to event",
      intro: "Start with a date, location and guest estimate.\nDebsGuru turns them into a plan the committee can review with confidence.",
    },
    sections: [
      {
        key: "stages",
        title: "Four clear stages",
        items: [
          { title: "Share the starting point", text: "Send the school, county, preferred date and a realistic guest estimate. You do not need a final list to begin." },
          { title: "We check what fits", text: "DebsGuru reviews suitable venues and event arrangements for the date, location and expected attendance." },
          { title: "Review one clear proposal", text: "The committee sees the available venue, inclusions, practical requirements and pricing together before deciding." },
          { title: "Confirm the event", text: "The date is secured only after availability, pricing and the booking terms have been agreed with DebsGuru." },
        ],
      },
    ],
    callToAction: { eyebrow: "Ready to begin", title: "Booking Enquiry Form", buttonLabel: "Open the form", buttonLink: "/enquire" },
    seo: {
      title: "How to Plan a TY Ball in Ireland",
      description: "See the four steps from a TY Ball enquiry to a confirmed event: share your school and date, review suitable arrangements, check the proposal and confirm.",
      canonicalPath: "/how-it-works",
      noIndex: false,
    },
    _status: "published",
  },
  {
    title: "Cost guide",
    slug: "cost-guide",
    hero: {
      eyebrow: "TY Ball cost guide",
      title: "What shapes the cost?",
      intro: "Your proposal follows the venue, date, guest estimate and the parts of the night your committee chooses.",
    },
    sections: [
      {
        key: "statements",
        title: "Built around your night.",
        items: [
          { title: "Venue and date", text: "Venue, date and location set the starting point." },
          { title: "Guest estimate", text: "A realistic guest estimate shapes capacity and cost." },
          { title: "Dinner and service", text: "Dinner, service and dietary needs form one part." },
          { title: "Entertainment", text: "Entertainment follows the committee’s priorities." },
        ],
      },
      {
        key: "factors",
        eyebrow: "Pricing factors",
        title: "Every part counts.",
        text: "DebsGuru checks current venue and supplier costs, then brings the relevant inclusions and pricing into one proposal.",
        items: [
          { title: "Venue and date", text: "Location, availability and time of year influence the starting cost." },
          { title: "Guest estimate", text: "A realistic number sets the capacity and helps suppliers price accurately." },
          { title: "Dinner and service", text: "Menu, service style and dietary needs become part of the proposal." },
          { title: "Entertainment", text: "DJ, lighting, photography and extras follow the committee’s priorities." },
          { title: "Security included", text: "Professional security is included in every event booking." },
          { title: "Event staffing", text: "DebsGuru staff and hotel staff run the agreed timings and event plan." },
        ],
      },
    ],
    callToAction: {
      eyebrow: "Send the starting point",
      title: "Ready for a real proposal?",
      text: "Share the school, county, date or flexibility, guest estimate and the parts of the night that matter most.",
      buttonLabel: "Booking Enquiry Form",
      buttonLink: "/enquire",
    },
    seo: {
      title: "TY Ball Cost Guide Ireland",
      description: "Understand what shapes TY Ball costs in Ireland, including the venue, date, attendance, dinner, entertainment, security and event staffing.",
      canonicalPath: "/cost-guide",
      noIndex: false,
    },
    _status: "published",
  },
  {
    title: "Parents and schools",
    slug: "parents-schools",
    hero: {
      eyebrow: "For parents and schools",
      title: "Trusted experience",
      intro: "TYBalls.ie is from the team at DebsGuru.ie. Over 10 years of experience and thousands of students impressed.",
    },
    sections: [
      {
        key: "communication",
        eyebrow: "How communication works",
        title: "Committee-led",
        text: "DebsGuru works directly with Debs and TY Ball committees and provides them with all the information required for each event.",
        items: [
          { title: "Direct committee contact", text: "The student committee works directly with our team." },
          { title: "Tickets and guest list", text: "The student committee manages ticket sales and sends us the guest list for entry." },
          { title: "Event information", text: "We provide the committee with the event timings and all other necessary information, which they share with everyone attending." },
          { title: "Security and staffing", text: "Security is included in every booking. DebsGuru staff and hotel staff run the event." },
          { title: "Transport guidance", text: "Students book their own local transport suppliers. We guide the committee on timings and locations." },
          { title: "Parents are welcome", text: "Parents are welcome to attend the event." },
          { title: "New enquiries", text: "Please complete the Booking Enquiry Form on this website." },
          { title: "Other enquiries", text: "Please email info@debsguru.ie." },
        ],
      },
      {
        key: "existing-event",
        eyebrow: "Questions about an existing event",
        title: "Your committee contact",
        items: [
          { title: "Committee representative", text: "For any questions relating to your specific event, please contact your committee representative." },
          { title: "Event privacy", text: "In line with GDPR, we can only discuss individual event details with the account holder, which is the committee." },
        ],
      },
    ],
    callToAction: { eyebrow: "New enquiry", title: "Start with the booking form", buttonLabel: "New booking enquiry", buttonLink: "/enquire" },
    seo: {
      title: "TY Ball Information for Parents and Schools",
      description: "How TYBalls.ie and DebsGuru work with student committees on ticket sales, guest lists, event information, security, staffing and transport guidance.",
      canonicalPath: "/parents-schools",
      noIndex: false,
    },
    _status: "published",
  },
  {
    title: "For committees",
    slug: "for-committees",
    hero: {
      eyebrow: "For TY committees",
      title: "Start with the basics",
      intro: "You do not need every answer. Five useful details give DebsGuru enough to start shaping the event.",
    },
    sections: [
      {
        key: "checklist",
        eyebrow: "Committee checklist",
        title: "Five things to share",
        text: "These basics keep the first conversation focused. DebsGuru can then check the venue, event arrangements and pricing that fit your group. Students book their own local transport suppliers; our team guides the committee on timings and locations.",
        items: [
          { title: "A preferred date", text: "Share your first choice and any flexibility. Nearby dates can open more suitable venue options." },
          { title: "A realistic guest estimate", text: "A rough number is enough to begin. The final guest list can follow later." },
          { title: "The school and county", text: "Location helps DebsGuru focus on suitable venues and practical event timings." },
          { title: "The committee’s priorities", text: "Tell us what matters most, whether that is the venue, dinner, music, photography or something else." },
          { title: "One committee contact", text: "One named contact keeps decisions, questions and updates clear for everyone involved." },
        ],
      },
    ],
    callToAction: { eyebrow: "Ready to begin", title: "Booking Enquiry Form", buttonLabel: "Open the form", buttonLink: "/enquire" },
    seo: {
      title: "TY Ball Planning for Student Committees",
      description: "A practical TY Ball planning checklist for student committees: the preferred date, county, guest estimate, priorities and committee contact needed to begin.",
      canonicalPath: "/for-committees",
      noIndex: false,
    },
    _status: "published",
  },
  {
    title: "Booking enquiry",
    slug: "enquire",
    hero: {
      eyebrow: "Your event starts here",
      title: "Booking Enquiry Form",
      intro: "Share the school, preferred date and likely attendance.\nA DebsGuru coordinator reviews every enquiry before any date or venue is confirmed.",
    },
    sections: [
      {
        key: "before-you-start",
        eyebrow: "Before you start",
        title: "Have these ready",
        items: [
          { title: "School and location", text: "Include another school if you are joining together." },
          { title: "Year size", text: "This gives the team a better attendance estimate." },
          { title: "Date and venue area", text: "Your preferences give the team a clear starting point." },
        ],
      },
    ],
    callToAction: { eyebrow: "No commitment yet", title: "Send your starting point", text: "This enquiry starts a conversation and does not reserve a date.", buttonLabel: "Submit enquiry", buttonLink: "#booking-enquiry" },
    seo: {
      title: "TY Ball Booking Enquiry Form",
      description: "Send a TY Ball booking enquiry with your school, year size, preferred date, county and estimated attendance. The DebsGuru team will review the details.",
      canonicalPath: "/enquire",
      noIndex: false,
    },
    _status: "published",
  },
];

const homeFaqs = [
  ["Do we need final guest numbers?", "No. Start with a realistic estimate and confirm the final number later."],
  ["Who coordinates the event?", "A named DebsGuru coordinator works with the committee, venue and event team."],
  ["Is security included?", "Yes. Security is included in every event booking, with DebsGuru staff and hotel staff running the event."],
  ["Does DebsGuru arrange transport?", "No. Students book their own local transport suppliers. DebsGuru guides the committee on timings, locations and the practical arrangements to share with those suppliers."],
  ["Can dietary and access needs be planned?", "Yes. Share them early so the selected venue can confirm the arrangements."],
  ["Does an enquiry reserve the date?", "No. A date is secured only after availability, pricing and booking terms are agreed."],
] as const;

const payload = await getPayload({ config });

const mediaAssets = [
  ["drive-arrival", "public/images/drive-arrival.jpg", "Friends arriving together at a DebsGuru event", "vertical"],
  ["drive-dinner", "public/images/drive-dinner.jpg", "Students enjoying dinner at a DebsGuru event", "vertical"],
  ["drive-photobooth", "public/images/drive-photobooth.jpg", "Students using the photo booth", "vertical"],
  ["drive-dance", "public/images/drive-dance.jpg", "Friends dancing together at a DebsGuru event", "vertical"],
  ["drive-group", "public/images/drive-group.jpg", "Friends posing together at the photo booth", "vertical"],
  ["drive-garden", "public/images/drive-garden.jpg", "Students gathering at an event venue", "vertical"],
  ["venues-video", "public/video/tyballs-school-arrival-vertical.mp4", "Students arriving at a TY Ball venue", "vertical"],
  ["venues-poster", "public/images/tyballs-school-arrival-poster.webp", "Students arriving at a TY Ball venue", "vertical"],
  ["dinner-video", "public/video/tyballs-real-event-vertical.mp4", "Dinner at a real DebsGuru event", "vertical"],
  ["dinner-poster", "public/images/tyballs-real-event-poster.webp", "Dinner at a real DebsGuru event", "vertical"],
  ["photobooth-video", "public/video/tyballs-photobooth-vertical.mp4", "Students enjoying a photo booth", "vertical"],
  ["photobooth-poster", "public/images/tyballs-photobooth-poster.webp", "Students enjoying a photo booth", "vertical"],
  ["djs-video", "public/video/tyballs-disco-vertical.mp4", "Professional DJ and dance floor at a DebsGuru event", "vertical"],
  ["djs-poster", "public/images/tyballs-disco-poster.webp", "Professional DJ and dance floor at a DebsGuru event", "vertical"],
] as const;

const mediaIDs = new Map<string, string>();
for (const [key, relativeFilePath, alt, orientation] of mediaAssets) {
  const filePath = path.resolve(process.cwd(), relativeFilePath);
  const filename = path.basename(filePath);
  const existing = await payload.find({ collection: "media", limit: 1, pagination: false, where: { filename: { equals: filename } } });
  const media = existing.docs[0] ?? await payload.create({
    collection: "media",
    data: { alt, orientation },
    filePath,
    overrideAccess: true,
  });
  mediaIDs.set(key, media.id);
}

const galleryData = {
  title: "Real DebsGuru event moments",
  slug: "home-real-event-moments",
  description: "Approved real event photography used on the TYBalls.ie home page.",
  items: ["drive-arrival", "drive-dinner", "drive-photobooth", "drive-dance", "drive-group", "drive-garden"].map((key) => ({ media: mediaIDs.get(key)! })),
  _status: "published" as const,
};
const existingGallery = await payload.find({ collection: "galleries", limit: 1, pagination: false, where: { slug: { equals: galleryData.slug } } });
const homeGallery = existingGallery.docs[0]
  ? await payload.update({ collection: "galleries", id: existingGallery.docs[0].id, data: galleryData })
  : await payload.create({ collection: "galleries", data: galleryData });

await payload.updateGlobal({
  slug: "site-settings",
  data: {
    siteName: "TYBalls.ie",
    siteDescription: "Plan a TY Ball in Ireland with the DebsGuru team. Explore venues, dinner, professional DJs, photo booths, security and staffed event coordination.",
    contactEmail: "info@debsguru.ie",
    whatsappNumber: "353873431732",
    whatsappLabel: "Message us on WhatsApp",
    socialLinks: {
      instagram: "https://www.instagram.com/debsguru/",
      facebook: "https://www.facebook.com/DebsGuru",
      tiktok: "https://www.tiktok.com/@debsguru.ie",
      debsGuru: "https://debsguru.ie/",
    },
    footerStatement: "TYBalls.ie is brought to you by the team behind DebsGuru.ie.",
  },
});

await payload.updateGlobal({
  slug: "home-page",
  data: {
    hero: {
      eyebrow: "TY Ball organisers across Ireland",
      title: "Planning a TY Ball?",
      intro: "A memorable night for your guests. One clear plan for you.",
      primaryButtonLabel: "Booking Enquiry Form",
      primaryButtonLink: "/enquire",
      secondaryButtonLabel: "See how it works",
      secondaryButtonLink: "/how-it-works",
    },
    highlights: [
      { icon: "venue", title: "Venue search", text: "Matched to your county, date and guest estimate" },
      { icon: "contact", title: "One coordinator", text: "One contact from first conversation to the night" },
      { icon: "shield", title: "A managed event", text: "Security, DebsGuru staff and hotel staff included" },
    ],
    experience: {
      eyebrow: "Your night",
      title: "Everything in its place.",
      categories: [
        { name: "beautiful venues", video: mediaIDs.get("venues-video")!, poster: mediaIDs.get("venues-poster")! },
        { name: "dinner", video: mediaIDs.get("dinner-video")!, poster: mediaIDs.get("dinner-poster")! },
        { name: "photobooth", video: mediaIDs.get("photobooth-video")!, poster: mediaIDs.get("photobooth-poster")! },
        { name: "professional DJs", video: mediaIDs.get("djs-video")!, poster: mediaIDs.get("djs-poster")! },
      ],
    },
    proof: {
      eyebrow: "Proven experience",
      title: "Over 10 years.",
      text: "TYBalls.ie is brought to you by the team behind DebsGuru.ie, with thousands of students enjoying our events across Ireland.",
      gallery: homeGallery.id,
    },
    steps: [
      { title: "Share the basics", text: "School, county, date and estimated attendance." },
      { title: "Review the plan", text: "See the venue, inclusions and pricing together." },
      { title: "Enjoy the night", text: "Your coordinator keeps the agreed plan moving." },
    ],
    parentGuidance: {
      eyebrow: "For parents and schools",
      title: "Clear for everyone.",
      points: [
        { text: "Security is included in every booking" },
        { text: "DebsGuru and hotel staff run the event" },
        { text: "Parents are welcome to attend" },
      ],
    },
    finalCallToAction: {
      eyebrow: "Start with the basics",
      title: "Booking Enquiry Form",
      text: "Sending an enquiry does not reserve a date or create a booking.",
      buttonLabel: "Open the form",
      buttonLink: "/enquire",
    },
    seo: {
      title: "TY Ball Organisers Ireland | TYBalls.ie by DebsGuru",
      description: "Plan a TY Ball in Ireland with venue sourcing, food, entertainment, security and staffed event coordination from the team behind DebsGuru.ie.",
      canonicalPath: "/",
      noIndex: false,
    },
    _status: "published",
  },
});

for (const page of pages) {
  const existing = await payload.find({
    collection: "pages",
    limit: 1,
    pagination: false,
    where: { slug: { equals: page.slug } },
  });
  if (existing.docs[0]) {
    await payload.update({ collection: "pages", id: existing.docs[0].id, data: page });
  } else {
    await payload.create({ collection: "pages", data: page });
  }
}

for (const [question, answer] of homeFaqs) {
  const existing = await payload.find({
    collection: "faqs",
    limit: 1,
    pagination: false,
    where: { and: [{ page: { equals: "home" } }, { question: { equals: question } }] },
  });
  const data = { question, answer, page: "home" as const, _status: "published" as const };
  if (existing.docs[0]) {
    await payload.update({ collection: "faqs", id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection: "faqs", data });
  }
}

payload.logger.info(`CMS seed complete: ${pages.length} pages, ${homeFaqs.length} FAQs, ${mediaAssets.length} media files and 1 gallery.`);
await payload.destroy();
