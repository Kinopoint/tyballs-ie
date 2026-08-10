# TYBalls.ie production runbook

This runbook covers the first VPS release and normal operations. GitHub Pages remains a non-submitting preview; production must run the standalone Next.js application, PostgreSQL and the background services in `compose.yaml`.

## Information required before deployment

- VPS public IPv4 address and SSH access using an administrator key.
- Permission for Declan or the domain administrator to update `tyballs.ie` DNS.
- Production Cloudflare Turnstile site and secret keys restricted to `tyballs.ie` and `www.tyballs.ie`.
- Transactional SMTP credentials and the confirmed notification mailbox.
- Optional production GTM container ID. The website works without analytics.
- A local backup directory outside the source checkout, configured with `BACKUP_HOST_DIRECTORY`, plus a destination outside the VPS for encrypted database backups.

Instagram is not part of the launch-critical path. Its official connection can be added only after Declan confirms that the account is Business or Creator and authorises it.

## Host preparation

1. Provision a supported Ubuntu LTS VPS and install security updates.
2. Create a non-root deployment user with SSH-key access. Disable password authentication and direct root login.
3. Allow inbound ports `22`, `80` and `443` only. Restrict SSH by source IP where practical.
4. Install Docker Engine, Docker Compose, Nginx and Certbot from their supported repositories.
5. Clone the repository to a dedicated application directory owned by the deployment user.

## Environment

Create `.env` from `.env.example`, set mode `600`, and replace every descriptive value. Generate independent secrets; for example:

```bash
openssl rand -hex 32
openssl rand -hex 32
```

Use one value for `POSTGRES_PASSWORD` and a different value for `RATE_LIMIT_SALT`. Never commit `.env`, copy it to GitHub, or send it in WhatsApp/email.

Validate the file before starting the application:

```bash
docker compose config --quiet
docker compose build
docker compose run --rm --no-deps website node scripts/validate-env.mjs
```

The public Turnstile and GTM values are compiled into the browser bundle during `docker compose build`; rebuild the website image after changing either value.

## First release and TLS

Start the application stack before changing DNS:

```bash
docker compose up -d
docker compose ps
curl --fail http://127.0.0.1:3000/api/health
```

Install `infra/nginx/tyballs.ie.http.conf` as the initial Nginx site, enable it, then run `nginx -t` and reload. Ask the domain administrator to set:

- `A` record for `@` to the VPS IPv4 address;
- `CNAME` record for `www` to `tyballs.ie` (or a second `A` record to the same address).

After both names resolve to the VPS, request the certificate:

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d tyballs.ie -d www.tyballs.ie
```

Replace the bootstrap configuration with `infra/nginx/tyballs.ie.conf`, run `sudo nginx -t`, and reload Nginx. Verify automatic renewal with `sudo certbot renew --dry-run`.

## Release verification

1. Confirm `https://tyballs.ie/api/health` returns HTTP 200 with `status: ok` and a current `checkedAt` timestamp.
2. Open every public page on desktop and a physical mobile device; check navigation, videos, consent controls, canonical URLs and social sharing metadata.
3. Submit one clearly labelled production test enquiry using a real Turnstile challenge.
4. Confirm one PostgreSQL record and one SMTP notification. Confirm that the recipient can reply to the supplied contact email.
5. Accept analytics cookies and validate only the events in `ANALYTICS_TRACKING.md`; then reject/withdraw and confirm they stop.
6. Remove the test enquiry from the database after the check and record the deployment commit and time.

## Backups and restore testing

The `backup` service creates a PostgreSQL custom-format dump every 24 hours and retains local copies for 30 days. Local copies protect against database corruption but not loss of the VPS. Synchronise encrypted copies to a separate provider and alert on failed or missing uploads.

Create an immediate backup:

```bash
docker compose run --rm backup sh /usr/local/bin/backup.sh --once
```

Test the newest local backup in an isolated temporary database:

```bash
sh scripts/restore-test.sh
```

Run the restore test after the first deployment, after database migrations, and monthly. Never count an untested dump as a valid backup.

## Retention and privacy operations

The `retention` service removes non-booked enquiries 18 months after their last recorded activity and removes expired anti-abuse windows after 48 hours. If a lead status is updated manually, update `last_activity_at` in the same database operation. Booked event records are not automatically deleted and require an agreed operational retention rule.

Respond to access, correction or deletion requests using the contact details in the Privacy Notice. Export or delete only after verifying the requester and record the action without copying their form data into general logs.

## Monitoring

- Configure an external HTTPS uptime monitor for `/api/health` at a five-minute interval.
- Alert on non-200 responses, TLS expiry, unavailable containers, repeated application restarts, disk usage above 80%, and missing daily off-site backups.
- Review `docker compose logs website retention backup database` after alerts; logs rotate locally.
- Do not log form bodies, credentials, Turnstile tokens or full IP addresses.

## Updates and rollback

Before each release, record the current commit and create a fresh database backup. Build and test the new image, then restart only the changed services.

For an application rollback, check out the last verified commit, rebuild using the unchanged production `.env`, and run `docker compose up -d`. If a migration is incompatible, stop the website, restore the pre-release dump into a separate database first, verify it, then point `DATABASE_URL` to the restored database. Preserve the failed database until the incident is understood.
