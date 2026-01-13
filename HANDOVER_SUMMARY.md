# Project Handover Summary (24 Items)

1) Source Code Repository & Access
- Repo: https://github.com/Smahesh26/bhanuprakash (owner: Smahesh26). Request access from owner.
- Clone: `git clone https://github.com/Smahesh26/bhanuprakash.git && cd bhanuprakash`

2) Branches (Prod/Staging)
- main = production (auto-deploys to Render).
- Staging not configured; create `staging` branch + Render service if needed.

3) CI/CD & Build Setup (Server Requirements Included)
- GitHub Actions: [.github/workflows/ci.yml](.github/workflows/ci.yml) → install (ignore scripts), Prisma generate, lint, typecheck, build.
- Render deploy: build `npm run build`; start `npm start`; Node ≥18 (CI uses 20.x).
- Suggested resources: ≥1–2 GB RAM, 1 vCPU baseline; Postgres 12+ with daily backups enabled; HTTPS via Render; outbound allowed to Stripe/SendGrid/Cloudinary.

4) README / How to Install, Build, Run, Test
- See [README.md](README.md#L1-L79).
- Key commands: `npm install`; `cp .env.local.example .env.local`; `npx prisma generate --schema=./prisma/schema.prisma`; dev `npm run dev`; prod `npm run build && npm run start`; quality `npm run lint && npm run typecheck && npm run build`.

5) Environment Variables Sample
- File: [.env.local.example](.env.local.example#L1-L110) — DATABASE_URL, NEXTAUTH_*, SENDGRID or SMTP, STRIPE keys, CLOUDINARY keys, ENCRYPTION_KEY, feature flags.

6) URLs (Staging/Prod) & Test Credentials
- Prod: Render (check dashboard for exact URL). Staging: not set yet.
- Test users (see [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md)): admin@example.com, instructor@example.com, student@example.com, student-premium@example.com (all `TestPass123!`).
- Stripe test cards: success 4242 4242 4242 4242; decline 4000 0000 0000 0002; 3DS 4000 0025 0000 3155.

7) Design Source Files (Figma)
- Not stored in repo. Request Figma link from prior team/owner.

8) Exported Design Assets (Icons/Images/Logos)
- See [public/assets](public/assets) (img/icons/logos), styles in [public/assets/scss](public/assets/scss), fonts in [public/assets/fonts](public/assets/fonts).

9) Font Files & Licenses
- Poppins, Inter (Google Fonts, OFL). If self-hosted, files under [public/assets/fonts](public/assets/fonts).

10) API Documentation
- No Swagger/Postman checked in. API routes live in [src/app/api](src/app/api) (auth, courses, quizzes, payments/stripe, blog, etc.). Stripe webhook: `/api/stripe/webhook`.

11) Database Schema / Dumps
- Prisma schema: [prisma/schema.prisma](prisma/schema.prisma); docs: [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md); sanitized sample: [local_db_dump.sql](local_db_dump.sql).

12) Third-Party Integrations
- Stripe (payments), Cloudinary (media/CDN), SendGrid or SMTP (email), NextAuth (auth). Configure via env vars.

13) Test User Accounts (Roles)
- Detailed credentials and flows in [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md) (admin, instructors, students, Stripe test cards).

14) Product Overview & User Flows
- See [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md) for features and journeys (student, instructor, admin).

15) Known Bugs / Open Issues
- Summary in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L415-L465): major issues resolved; minor gaps (no i18n, no SMS, no native apps).

16) Brand Guidelines / UI Style Guide
- Colors/typography in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L465-L520); refs to STYLE_GUIDE.md / BRAND_GUIDELINES.md if present.

17) Interactive Prototypes / Design Flows
- Placeholder “Provide URL” in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L520-L560); request Figma/prototype link from prior team.

18) Browser & Device Compatibility
- Supported browsers/breakpoints in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L560-L620) (Chrome/Edge 90+, Firefox 88+, Safari 14+, iOS/Android; breakpoints listed).

19) Tests & How to Run
- No automated tests yet; manual checklist noted. Run: `npm run lint`, `npm run typecheck`, `npm run build`. Manual flows in [TEST_ACCOUNTS.md](TEST_ACCOUNTS.md) and [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L620-L670).

20) Performance / Accessibility Audits
- Targets and current optimizations in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L620-L670) and [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md). Lighthouse guidance included there.

21) Point of Contact
- Placeholder in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L670-L720); fill with current maintainer/agency contact.

22) Reusable UI Components / Design Tokens
- Components: `src/components`; layouts: `src/layouts`; hooks: `src/hooks`; utils: `src/utils`; state: `src/redux`; SCSS tokens: [public/assets/scss](public/assets/scss).

23) Monitoring Dashboards / Alerting
- Not enabled. Recommendations (Sentry, Vercel Analytics, UptimeRobot) in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L720-L760). Use Render logs for deploy/runtime.

24) Backup & Recovery
- Render Postgres daily backups (7-day retention). pg_dump/restore steps in [HANDOVER_CHECKLIST.md](HANDOVER_CHECKLIST.md#L760-L828) and [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md). Code via Git; media via Cloudinary.

One-Command Quickstart (local)
```bash
git clone https://github.com/Smahesh26/bhanuprakash.git && \
cd bhanuprakash && \
npm install && \
cp .env.local.example .env.local && \
# fill .env.local values \
npx prisma generate --schema=./prisma/schema.prisma && \
# optional: npx prisma migrate dev --name init \
npm run dev
```
