# Final visual implementation plan

Status: approved by the project owner on 2026-08-02; implementation is in progress.

## Goal

Complete the Editorial Rhythm A system across the production site without making unverified claims, showing identifiable minors, or weakening the enquiry flow. The site should feel like a calm, well-prepared invitation rather than an event directory or nightclub campaign.

## Visual system

1. Preserve `TYBalls.ie` as accessible HTML until the selected Higgsfield references are redrawn into deterministic production SVGs.
2. Use deep navy, warm paper, soft cream and restrained coral exactly as recorded in `selected-direction.md`.
3. Remove remaining decorative ordinal labels from committee and cost content; headings and order remain semantic and readable without visual numerals.
4. Use slow, editorial image composition: one decisive image per page area, clear space around text, no visual collage or slider.

## Image map

| Asset | Placement | Required composition | Alt text |
| --- | --- | --- | --- |
| `place-setting` | Home hero and cost guide | One plain, unbranded place setting, no menu or bottle; home receives a high-contrast paper scrim | “A simple TY Ball place setting with a plain napkin and coral flower” |
| `planning-table` | How it works and committee page | Top-down committee planning materials with no readable names or school branding | “Event planning materials laid out on a table” |

The attempted ballroom, foyer and production photographs were rejected after review because they introduced prohibited signage, generated text, alcohol-like props, nightlife cues or unsafe equipment. Parents/schools and enquiry remain intentionally text-first rather than presenting a misleading visual. Only the two accepted source photographs above are published.

Every photo is generated through Higgsfield, inspected at full resolution, downloaded as its original, then converted to responsive WebP assets with a static `img` fallback. Images are decorative where HTML already communicates the critical fact; meaningful imagery receives specific alt text.

## Implementation sequence

1. Generate and review the five paid Soul 2.0 photographs above. Reject visible minors, alcohol, logos, text artefacts, impossible architecture, unsafe equipment, or misleading documentary cues.
2. Store originals and generation metadata under `branding/higgsfield/`; convert approved originals into local optimized web assets.
3. Apply the approved editorial visuals to their mapped sections without changing form submission, API, analytics or static-preview behaviour.
4. Add responsive desktop/mobile composition, `prefers-reduced-motion` safe static behaviour, dimensions to prevent layout shift, and `sizes` hints.
5. Redraw the approved lockups as deterministic SVGs and add horizontal, stacked, monochrome and favicon variants. Keep all critical naming in HTML.
6. Run lint, typecheck, production build, static Pages build and the real integration suite; visually inspect desktop and mobile; publish the static preview.

## Constraints and risks

- Generated photographs are illustrative, not evidence of actual TYBalls.ie clients, venues, suppliers or policies. No captions imply otherwise.
- `Soul 2.0` can introduce visual artefacts; every image requires acceptance review before site use.
- GitHub Pages has no enquiry API. The existing preview notice stays enabled and the form remains non-submitting in static export.
- The visible image system must not use image-only text or reduce legibility of the headline, form labels or legal content.
