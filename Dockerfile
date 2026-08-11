FROM node:24.14.1-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS tools
WORKDIR /app
ENV NODE_ENV=production
COPY . .
RUN addgroup --system --gid 1001 cms && adduser --system --uid 1001 --ingroup cms cms
USER cms

FROM node:24.14.1-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY
ARG NEXT_PUBLIC_TURNSTILE_ENABLED
ARG NEXT_PUBLIC_GTM_ID=""
ENV NEXT_PUBLIC_TURNSTILE_SITE_KEY=$NEXT_PUBLIC_TURNSTILE_SITE_KEY
ENV NEXT_PUBLIC_TURNSTILE_ENABLED=$NEXT_PUBLIC_TURNSTILE_ENABLED
ENV NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN if [ "$NEXT_PUBLIC_TURNSTILE_ENABLED" = "true" ]; then test -n "$NEXT_PUBLIC_TURNSTILE_SITE_KEY"; else test "$NEXT_PUBLIC_TURNSTILE_ENABLED" = "false"; fi
RUN npm run build

FROM node:24.14.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs /app/db ./db
RUN mkdir -p .next/cache && chown nextjs:nodejs .next/cache
USER nextjs
EXPOSE 3000
CMD ["sh", "-c", "node scripts/validate-env.mjs && node scripts/migrate.mjs && exec node server.js"]
