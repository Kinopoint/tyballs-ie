# Final visual implementation plan

Status: approved by the project owner on 2026-08-02; implementation is in progress.

## Goal

Complete the Editorial Rhythm A system across the production site without making unverified claims, showing identifiable minors, or weakening the enquiry flow. The site should feel like a calm, well-prepared invitation rather than an event directory or nightclub campaign.

## Visual system

1. Preserve `TYBalls.ie` as accessible HTML until the selected Higgsfield references are redrawn into deterministic production SVGs.
2. Use deep navy, warm paper, soft cream and restrained coral exactly as recorded in `selected-direction.md`.
3. Remove remaining decorative ordinal labels from committee and cost content; headings and order remain semantic and readable without visual numerals.
4. Use slow, editorial image composition: people and the managed event are always evident, with one decisive image per inner-page banner and a restrained four-scene hero switcher on the home page.

## Image map

| Asset | Placement | Required composition | Alt text |
| --- | --- | --- | --- |
| `event-hall` | Home hero, Arrival scene | Young adult formal guests arriving with an adult coordinator; no alcohol, text or branding | “Young adult guests arriving at a professionally managed formal event” |
| `planning-session` | Home hero, How it works and committee page | Adult coordinator walking adult committee representatives through the venue; no personal or school data | “An adult event coordinator guiding committee representatives through a venue” |
| `table-service` | Home hero and cost guide | Adult hospitality coordinator serving young adult guests; water only | “An adult hospitality coordinator serving guests at a formal event” |
| `venue-arrival` | Parents and schools | Adult coordinator reviewing arrival arrangements with parent or school representatives | “Adults reviewing arrival arrangements at an event venue” |
| `production-check` | Home hero and enquiry page | Adult producer and technician managing a live formal event | “Adult production staff managing a formal event” |

The earlier Soul 2.0 still-life photographs and the empty-room premium set were withdrawn after art-direction review. The five people-led paid replacements above were requested as `nano_banana_pro`; Higgsfield recorded the completed jobs under its canonical `nano_banana_2` model name. The first planning image was also rejected because generated text-like material appeared on a laptop and papers; the accepted replacement is a venue walkthrough without readable documents.

Every photo is generated through Higgsfield, inspected at full resolution, downloaded as its original, then converted to responsive WebP assets with a static `img` fallback. Images are decorative where HTML already communicates the critical fact; meaningful imagery receives specific alt text.

## Implementation sequence

1. Generate and review the five paid premium photographs above. Reject visible minors, alcohol, logos, text artefacts, impossible architecture, unsafe equipment, or misleading documentary cues.
2. Store originals and generation metadata under `branding/higgsfield/`; convert approved originals into local optimized web assets.
3. Apply the approved editorial visuals to their mapped sections without changing form submission, API, analytics or static-preview behaviour. Adapt the supplied fullscreen cinematic hero reference to the Editorial Rhythm system with solid navy scrims, accessible scene controls and no borrowed assets.
4. Make inner-page banners compact split layouts so the page purpose and supporting event image are visible together, keep desktop headings on one line where they fit, and preserve natural wrapping on mobile.
5. Add responsive desktop/mobile composition, `prefers-reduced-motion` safe static behaviour, dimensions to prevent layout shift, and `sizes` hints.
6. Redraw the approved lockups as deterministic SVGs and add horizontal, stacked, monochrome and favicon variants. Keep all critical naming in HTML.
7. Run lint, typecheck, production build, static Pages build and the real integration suite; visually inspect desktop and mobile; publish the static preview.

## Constraints and risks

- Generated photographs are illustrative, not evidence of actual TYBalls.ie clients, venues, suppliers or policies. No captions imply otherwise.
- Generative photography can introduce visual artefacts; every image requires acceptance review before site use.
- GitHub Pages has no enquiry API. The existing preview notice stays enabled and the form remains non-submitting in static export.
- The visible image system must not use image-only text or reduce legibility of the headline, form labels or legal content.
