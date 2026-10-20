# HIMSSON — Permanent GitHub Copilot Instructions

## 1. Project Identity

HIMSSON is a Tanzania-focused school management and operating platform for private Primary, Secondary, and Advanced-level schools. It is being developed under MANKO Innovations as a connected school operating platform, not as a collection of unrelated features.

## 2. Mandatory Source-of-Truth Order

Before making a material implementation decision, consult these sources in this order:

1. The approved HIMSSON architecture document in `docs/architecture/` — authoritative for locked product and architecture decisions.
2. `docs/architecture/HIMSSON-ARCHITECTURE-CONTEXT.md` — concise implementation reference derived from the approved document. It does not replace the original.
3. Existing repository code, configuration, tests, and migrations — authoritative evidence of what is currently implemented, not permission to contradict approved requirements.
4. The current development task and its acceptance criteria — defines the scope of the work, within the constraints above.

If the source document is missing, inaccessible, ambiguous, or appears to conflict with another source, report the exact issue and stop the affected implementation. Do not fabricate the missing decision.

## 3. No Invented Technology Stack

The technology stack is not to be assumed.

Do not select, install, scaffold, or silently introduce a frontend framework, backend framework, database, ORM, authentication provider, hosting platform, deployment service, UI library, state-management library, or other major dependency without an explicit approved decision.

Inspect the repository before proposing a technical implementation. If it is empty, report that fact and identify the technical decisions that must be made before application scaffolding.

Do not claim that any stack, service, integration, feature, or test exists unless repository evidence supports that claim.

## 4. Locked Decisions Must Be Preserved

Treat architecture sections marked `LOCKED`, `LOCKED — APPROVED`, or equivalent in the approved source document as binding.

Do not silently revise, reinterpret, replace, or weaken them. Do not turn deferred decisions, examples, optional features, or implementation possibilities into approved requirements.

A material conflict requires this process:

**STOP → IDENTIFY CONFLICT → CITE THE AFFECTED DECISIONS → PROPOSE OPTIONS → REQUEST AN EXPLICIT DECISION → DOCUMENT THE OUTCOME.**

Do not modify a locked decision merely to make the implementation easier.

## 5. Core Product Architecture

HIMSSON must preserve the five connected product domains:

1. School & People
2. Money
3. Academics
4. Communication
5. Documents & School Operations

Every domain must have clear responsibility for its authoritative data and business rules. Cross-domain workflows may use another domain's records but must not create competing versions of the same truth.

The user interface must not become the owner of business rules or authoritative records.

## 6. Organization, School Context, and Authorization

Respect the approved organization-to-school model and the possibility of multiple independently operated schools under one organization.

Never assume that one organization has only one school, or that education level automatically equals a separate school.

Every school-scoped operation must enforce the correct organization, school, relationship, and permission context. A school selector, hidden button, frontend route guard, or dashboard shortcut is not a security boundary.

Authorization must be enforced by the appropriate trusted backend or server-side boundary once the technology architecture is approved.

Never expose another school's data through lists, detail views, searches, exports, reports, notifications, caches, or indirect relationships.

## 7. Domain Integrity

Preserve the following principles from the approved architecture:

- Financial truth belongs to the responsible financial domain. A payment must not be treated as successful merely because a user clicked a button or a provider request was initiated.
- Academic source records, marks, calculations, validated results, publication status, and report-card presentation are distinct responsibilities.
- Communication informs recipients about authoritative domain events; it does not independently establish payment, attendance, academic, or timetable truth.
- Documents and data-management operations must preserve authorization, provenance, integrity, auditability, and appropriate recovery.
- Consequential changes must not silently rewrite historical records.
- Retries, imports, synchronization, and external integrations must be designed to avoid duplicate or conflicting outcomes.

Follow the detailed rules in the relevant approved architecture sections.

## 8. Approved UX Principles

Follow HIMSSON Architecture Lock 0.10:

- Mobile-first, practical workflows suitable for Tanzania and low-end Android devices.
- Swahili and English support, with Swahili-first defaults appropriate to the initial market.
- Clear active-school and organization context.
- Role-aware experiences that never substitute for authorization.
- Five-domain navigation, with exact menu layout and page hierarchy treated as UI-design decisions unless separately approved.
- Consistent forms, lists, record details, status indicators, loading, empty, offline, error, confirmation, and recovery states.
- Clear distinction between pending, completed, failed, blocked, awaiting review, and other relevant states.
- Avoid unnecessary data transfer, heavy assets, and interaction patterns that make routine school work harder.

Do not claim that a specific sidebar, bottom-navigation arrangement, icon set, color palette, or detailed page hierarchy is locked unless the approved documents explicitly say so.

## 9. Development Discipline

Follow the approved development principle:

**DISCUSS → DEFINE → CHALLENGE → LOCK → DOCUMENT → BUILD → TEST → VERIFY → NEXT**

For each task:

1. Read the relevant architecture and inspect the repository.
2. State the objective, scope, dependencies, assumptions, and acceptance criteria.
3. Identify conflicts or unresolved architectural decisions before coding.
4. Implement only the approved scope.
5. Run relevant checks and tests that are actually available.
6. Report changed files, decisions made, verification performed, failures, limitations, and remaining work.

Do not expand into unrelated modules, add speculative features, perform broad refactors, or scaffold the entire system when the task authorizes only one phase.

Do not mark an operation, fix, or feature as verified without evidence.

## 10. Security, Privacy, and Secrets

- Never commit passwords, API keys, access tokens, private credentials, or production secrets.
- Use environment-variable placeholders and a safe example configuration only when the selected stack requires them.
- Do not weaken access control to make a demo work.
- Do not expose sensitive student, parent, staff, financial, or authentication data in logs, test fixtures, screenshots, or error messages.
- Validate consequential actions at the trusted enforcement boundary, not only in the interface.
- Preserve audit and traceability requirements defined by the approved architecture.

## 11. Testing and Release Readiness

Follow HIMSSON Architecture Lock 0.14. Use risk-based, layered, evidence-driven testing.

As applicable, consider unit, integration, contract, end-to-end, authorization/security, operational, regression, recovery, and performance testing.

For every reported test, distinguish:
- Passed
- Failed
- Blocked
- Not run / untested

A rendered screen is not proof that the workflow works. A claimed fix is not verified until the relevant retest passes. Never invent test results.

## 12. How to Handle Unresolved Decisions

When a task depends on an unresolved technical or product decision:

1. State what the approved documents establish.
2. State what remains undecided.
3. Explain why the decision is required now.
4. Offer a small number of concrete options and their trade-offs when useful.
5. Wait for approval before introducing an irreversible architectural choice.

Do not treat silence, convenience, common industry practice, or Copilot suggestions as approval.

## 13. Required Response Format for Development Tasks

Before substantial changes, provide a concise pre-build summary:
- Task and intended outcome
- Relevant approved architecture sections
- Repository evidence inspected
- Files expected to change
- Dependencies and unresolved decisions
- Acceptance criteria
- Explicit exclusions

After implementation, report:
- Files changed
- What was implemented
- Tests/checks run and their actual outcomes
- Known gaps, risks, or untested behavior
- Whether the acceptance criteria are satisfied
- The next recommended step

If the approved source or required technical decision is unavailable, stop the affected work rather than guessing.

## 14. Final Rule

Copilot is an implementation assistant, not the owner of HIMSSON's product decisions. The approved architecture governs implementation. Repository evidence governs claims about the current code. Explicit project approval governs material changes.