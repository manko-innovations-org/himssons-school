# HIMSSON — first-preview application skeleton

This repository now contains a minimal Next.js application alongside the original architecture documents. It is a public, non-operational preview, not a school dashboard or a working authentication system.

## Approved scope and architecture

The first preview implements only:

- A shared, responsive application shell.
- A sign-in screen with credential entry and submission **disabled**.
- Five navigable domain placeholders: School & People, Money, Academics, Communication, and Documents & School Operations.
- Explicit, unconnected organization and active-school context.
- Swahili-first interface copy with an in-memory English toggle. Language changes do not establish an identity or school context.

The existing five documents are preserved. Decisions follow the approved master architecture (0.2, 0.4, 0.8, 0.10, 0.14) and `.github/copilot-instructions.md`. The `.docx` master in this checkout contains readable plain text; the two existing development Markdown documents are empty. Styling is a small provisional shared baseline, not a new locked design system. Role-based experiences cannot be implemented until real identity and permissions exist.

## Runtime and package manager

The selected Next.js + React stack is compatible with the connected environment's Docker `node:22` runtime. The application uses JavaScript, plain CSS and npm, with no ORM, authentication dependency, UI framework, or database client. `package-lock.json` records reproducible dependency versions. Use Node 22 and npm 10.9.9.

```sh
npm ci
npm test
npm run build
npm run dev
```

The development command binds to `0.0.0.0:3000`. `npm start` serves a completed production build for a separate production smoke test; it is not the live-edit preview command.

No environment variables or external credentials are required to render this skeleton.

## Preview environment

Base44 routes the sandbox's host port 3000 into its preview. Persistent Compose configuration is owned by the separate environment repository, **not this source repository**. There is no source-owned Compose file or deployment configuration to run yet.

The environment needs a `node:22` application service with live source mounted, a named dependency volume, lockfile-based `npm ci` on startup, and `npm run dev` exposed on host port 3000. It also needs an HTTP healthcheck and the preview's exact permitted development origin appended through an environment-owned Next.js configuration wrapper. Preview overrides must apply only when `BASE44_PREVIEW_MODE` equals `"1"`; absent or other values must retain normal Next.js behavior. The wrapper must preserve source configuration and live reload. No source-level preview bypass is included.

Once the environment configuration is saved on Main, the platform's supported Compose command is:

```sh
docker compose --project-name app \
  --project-directory "$BASE44_PROJECT_ROOT" \
  -f "$BASE44_CONFIG_ROOT/docker-compose.base44.yml" up -d
```

This command requires that environment-owned configuration to exist. A temporary test container is not a saved Base44 environment.

For this implementation, a source-mounted `node:22` container named `himsson-skeleton-preview` is temporarily serving `npm run dev` on host port 3000. Its dependency installation and HTTP healthcheck passed. It is **not** a saved Compose setup and will not be reconstructed automatically in a fresh sandbox. The environment inspection/configuration tools were unavailable in this working-branch session; finish and save the environment setup on Main once this source is available there. The native server reports the preview development origin as blocked for its live connection, so hot reload through the preview is not verified; no broad allowlist or shared source override was added.

## Explicit dependencies and exclusions

### PostgreSQL

PostgreSQL is the proposed database. The connected Docker environment has a PostgreSQL 16 image available, but no database service, database schema, database credentials, migrations, or application data layer is configured. The shell does not need database access and does not substitute an in-memory or fake backend. Add environment-owned PostgreSQL infrastructure and approve the data-access/migration approach when a database-backed slice is authorized. Do not use the UI school label as an authorization boundary.

### Authentication and authorization

No provider, identity store, session implementation, recovery mechanism, credentials, or seeded user exists. The sign-in screen does not accept or send credentials, create cookies or user sessions, or grant school access. The shell and placeholder pages are intentionally public and contain no personal or operational records.

The next authentication decision could use an approved external OIDC identity provider or an approved maintained authentication library with PostgreSQL-backed identities/sessions. These are options only; neither is installed or selected. Before enabling sign-in, agree the identity lifecycle, session protections, recovery process, role/scope/permission enforcement, and organization/school isolation. Secrets must be supplied through Base44's secure secret store, never source files or chat.

### Deployment

No hosting provider, production database, CI/CD workflow, or production deployment target is selected. A successful local Next.js build establishes framework/runtime compatibility, **not** production-host compatibility or deployment readiness. Confirm a target supporting the selected Next.js runtime and PostgreSQL before production setup.

Student management, finance, attendance, academic records, messaging, uploads, offline synchronization, operational data, school switching and real sign-in are outside this preview.

## Verification

`npm test` uses Node's built-in test runner for the five-domain navigation contract, bilingual message completeness, and explicit unconnected-state copy. These tests are not authentication, authorization, database, or business-workflow tests.

For browser verification: open `/`, check disabled credential controls, switch to English, follow all five domain links, return home, and check navigation at mobile width. An unknown domain must show the application's not-found page, not a placeholder. Signed-in and database-backed behavior cannot be verified until those systems exist. Inspect actual setup/build results rather than interpreting a rendered shell as successful authentication.

### Results from the initial implementation

- **Passed:** `npm ci` on Node 22.23.4 / npm 10.9.9.
- **Passed:** `npm test` — all three contract tests.
- **Passed:** `npm run build` — Next.js 16.4.3 production compilation and static generation of home and all five domain pages; React and React DOM resolved to 19.3.1.
- **Passed:** `npm audit --omit=dev --audit-level=high` reported zero vulnerabilities at the time of the check. This is not a security assessment.
- **Passed:** HTTP requests to `/` and each of the five domain routes returned 200 with the expected heading, explicit unconnected school context and no session cookie. The sign-in response contains a disabled credential fieldset and the authentication-dependency notice.
- **Passed:** `/domains/not-a-domain` returned 404 with the custom not-found content.
- **Observed:** browser captures show the home/sign-in screen in Swahili and English.
- **Not automatically verified:** browser click-through of all five destinations, language-switch assertions, mobile navigation/layout, and preview hot reload. Three browser runs were interrupted by document replacement, losing their final assertions. Temporary startup alternatives were discarded; the final server uses the native development command and all route responses were rechecked successfully.
- **Blocked / intentionally absent:** signed-in behavior, authorization, real school selection, database-backed flows, production deployment, and persistent environment-owned Compose validation. No authentication or data-access claim is made.
- **Passed:** the five original tracked documents are unchanged.

The runnable, non-operational skeleton is present. Full browser acceptance and reproducible environment provisioning remain incomplete.
