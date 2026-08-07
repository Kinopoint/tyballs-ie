# TYBalls.ie

Independent TY Ball website and enquiry system for DebsGuru Ltd.

Project decisions and research implications are recorded in [CLIENT_DECISIONS.md](./CLIENT_DECISIONS.md), [RESEARCH_IMPLICATIONS.md](./RESEARCH_IMPLICATIONS.md) and [LEGAL_PRIVACY_MEMORY.md](./LEGAL_PRIVACY_MEMORY.md).

## Current implementation

- Mobile-first Next.js website with dedicated TY Balls positioning.
- Tailored-pricing and approximate-attendance messaging confirmed by the client.
- PostgreSQL-backed enquiry flow with server-side validation, deduplication and rate limiting.
- Cloudflare Turnstile verification.
- SMTP notification to DebsGuru after the lead is stored.
- Consent-gated Google Tag Manager and non-PII form events.
- Privacy, Cookie and Website Terms drafts for client review.
- Sitemap, robots directives, canonical metadata and social metadata.
- Standalone Docker build and Contabo-ready Compose configuration.
- Nginx reverse-proxy configuration for HTTPS after certificate issuance.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

For local form testing, use a PostgreSQL database and Cloudflare’s official Turnstile test keys. SMTP settings must point to a real test or transactional server.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run test:integration
```

The integration test creates an isolated temporary PostgreSQL database, starts the production Next.js server and a real local SMTP listener, verifies a Cloudflare Turnstile test token, submits the HTTP form, checks the persisted lead and delivered email, checks duplicate suppression, and removes the temporary database.

## Visual rollback points

Two annotated tags preserve the approved comparison states:

- `archive/pre-client-logo` — commit `721b48c`, before the client-supplied logo was integrated;
- `archive/pre-neon-redesign` — commit `81fdd78`, immediately before the site-wide neon design system.

Revert the neon redesign commit to keep the current content, real event media and enquiry form while removing only the new theme. Check out either archive tag only when an exact historical build is required.

## GitHub Pages preview

The static preview is published from the existing `gh-pages` branch at `https://kinopoint.github.io/tyballs-ie/`. The repository’s **Settings → Pages** must keep that branch as its publishing source.

`npm run build:pages` exports the site to `out/` at the repository base path `/tyballs-ie`. It temporarily excludes the server-only enquiry API from the export. Consequently, the Pages preview never loads Turnstile, does not submit enquiries, and displays a clear preview-only notice on the form. Real enquiries remain available only from the secure server deployment.

To reproduce the preview build locally:

```bash
npm run build:pages
```

## Production deployment

1. Create a dedicated Contabo VPS and restrict SSH to keys.
2. Install Docker Engine, Docker Compose, Nginx and Certbot.
3. Copy `.env.example` to `.env` and replace every descriptive value with the production credential.
4. Set `POSTGRES_PASSWORD` in the deployment environment.
5. Run `docker compose up -d --build`.
6. Install `infra/nginx/tyballs.ie.conf` on the host after obtaining the initial certificate.
7. Point `tyballs.ie` and `www.tyballs.ie` DNS records to the server only after client approval.

The domain password must never be sent by ordinary email. Either provide Declan with the final DNS records to enter in LetsHost or use a secure delegated-access method if LetsHost supports it.

## Required before public launch

- Client approval of the visual direction, copy and legal drafts.
- Final safety and supervision wording.
- Written approval or replacement of media assets.
- Production Turnstile, SMTP and GTM credentials.
- LetsHost DNS change.
- Contabo VPS, backups, monitoring, certificate and restore test.
