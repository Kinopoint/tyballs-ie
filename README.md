# TYBalls.ie

Independent TY Ball website and enquiry system for DebsGuru Ltd.

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
- Decision on the WhatsApp trial.
- LetsHost DNS change.
- Contabo VPS, backups, monitoring, certificate and restore test.
