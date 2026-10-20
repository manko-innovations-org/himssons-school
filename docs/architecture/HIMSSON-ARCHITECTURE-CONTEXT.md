# HIMSSON — Architecture Context for Development

**Product:** HIMSSON School Management System  
**Parent company:** MANKO Innovations  
**Initial market:** Tanzania  
**Status:** Development reference derived from the existing approved architecture  
**Authority:** The approved HIMSSON architecture document takes precedence over this summary.

## 1. How to Use This Document

Read this document before implementing a feature. Then consult the corresponding section of the approved source document for full requirements, constraints, exceptions, and deferred decisions.

Do not use this summary to infer requirements that are not explicitly stated in the approved source.

**Approved source document:** `docs/architecture/HIMSSON-MASTER-ARCHITECTURE.docx`

If the filename or location differs in the repository, update this reference to the actual path. Do not create a replacement document and label it authoritative without approval.

## 2. Product Definition — HIMSSON 0.0

HIMSSON is a Tanzania-focused school management and operating platform for private Primary, Secondary, and Advanced-level schools.

It is designed to control school finances, save administrative time, improve communication, and replace fragmented paper-based processes with one connected digital system.

HIMSSON is a connected school operating platform, not a collection of independent features.

All implementation decisions must support that definition.

## 3. Product Principles — HIMSSON 0.1

The approved principles include:

- School operations, clarity, reliability, accountability, accessibility, and practical usefulness come first.
- Tanzanian payment realities matter. M-Pesa, mobile money, and USSD are important architectural considerations.
- Offline capability must be considered architecturally, including queued changes, synchronization, conflict handling, and visible sync state where applicable.
- The product must remain practical on low-end Android devices and constrained mobile connections.
- Swahili and English must both be supported. Swahili is a first-class language and should receive appropriate priority for the initial market.
- Avoid unnecessary heavy assets, excessive network requests, bloated interfaces, and needless background processing.

These principles do not, by themselves, approve a specific payment provider, offline technology, framework, or infrastructure choice.

## 4. Connected Product Domains — HIMSSON 0.2

The five core domains are:

1. **School & People**
2. **Money**
3. **Academics**
4. **Communication**
5. **Documents & School Operations**

Each domain must have clear data ownership and controlled relationships with other domains.

Examples of authoritative ownership:
- Student identity and parent relationships: School & People.
- Fee obligations, payments, receipts, and balances: Money.
- Attendance, marks, and validated academic results: Academics.
- Message delivery records: Communication.
- Student documents: Documents.

A presentation page, notification, report, or navigation link must not become a competing source of authoritative truth.

## 5. Development Discipline — HIMSSON 0.3

The approved development sequence is:

**DISCUSS → DEFINE → CHALLENGE → LOCK → DOCUMENT → BUILD → TEST → VERIFY → NEXT**

Every phase needs defined scope, objectives, dependencies, expected output, verification criteria, and stopping conditions.

Do not allow screens to become accidental architecture. Understand the underlying workflow and business rules before implementing dependent UI.

Do not roam into unrelated modules or treat implementation convenience as permission to change approved decisions.

## 6. Organization and School Model — HIMSSON 0.4 and 0.5

The approved model is:

**Organization → one or more Schools**

A school is an independently operated educational environment within an organization.

The architecture supports:
- One school containing multiple education levels.
- Separate schools for different education levels.
- Mixed organizational structures with different schools supporting different levels.

Education level does not automatically equal a separate school.

Schools remain operationally independent even when they belong to the same organization. Access across schools must be explicitly authorized. An organization-level owner/director may access multiple linked schools according to the approved authorization model.

The owner/director and school administrator are distinct levels of responsibility. Consult the source document for the full role and access rules.

## 7. Academic Structure — HIMSSON 0.6

The academic architecture separates academic context, teaching structures, assessment evidence, calculations, validated results, and official publications.

The approved model includes distinct responsibilities for:
- Education levels, academic years, periods, groups, streams, and subject combinations.
- Subjects, subject offerings, subject enrollment, and teacher assignments.
- Assessments and individual marks.
- Configurable calculations, grading, totals, averages, optional ranking, and result validation.
- Official result publication and report-card presentation.

A subject is not the same thing as a subject offering. A teacher is not permanently attached to a subject merely because they teach it in one context. A report card presents validated academic information; it does not own the marks or independently establish official results.

Academic calculations must not be implemented as UI-only logic. Preserve raw scores, relevant academic context, rule versions, correction traceability, and historical official results as required by the approved architecture.

### Academic calendar

The approved principle is that Primary and Secondary academic years generally begin in January, while Advanced-level academic years begin after June. Foreign-syllabus schools may differ.

Do not hard-code one universal calendar for every school.

### Timetable and scheduling

Formal timetable scheduling is optional; core school operations must not depend on it.

The approved scheduling architecture requires:
- Fundamental conflicts to be blocked unless an explicitly permitted exception applies.
- Legitimate combined teaching to be represented and validated without duplicate commitments or loss of individual academic records.
- Room sharing to be authorized and validated against independent constraints.
- Advisory room-capacity excess to be distinguishable from mandatory capacity violations.
- Mandatory capacity violations not to be bypassed through ordinary overrides.
- Scheduling status, constraint compliance, and operational readiness to remain distinct.
- Acknowledgment and notification delivery not to be mistaken for resolution.
- Closure to verify the latest committed booking state.
- Relevant violations, escalation, overdue handling, and historical records to follow the detailed locked rules in the source document.

Consult the complete HIMSSON 0.6 subsections before implementing academic or scheduling behavior. This summary is not a substitute for those detailed constraints.

## 8. Communication and Notifications — HIMSSON 0.7

Communication is a shared platform capability, not a separate messaging implementation inside every module.

The approved lifecycle is:

**Operational Event → Notification Rule → Recipient Resolution → Channel Selection → Delivery → Delivery Status**

The source domain owns the truth of the underlying event. Communication manages notification rules, recipient resolution, channel selection, delivery, retries or permitted fallback behavior, delivery-status tracking, and communication history.

Recipients must be resolved through verified relationships, applicable permissions, and school scope.

Do not report a message as delivered or read unless the available evidence supports that status. A communication record must not independently establish that a payment succeeded, an attendance event occurred, or an academic result became official.

Support for Swahili and English, affordability, mobile-first access, and unreliable connectivity are architectural considerations.

## 9. Security and Data Management — Consult HIMSSON 0.8 and 0.9

The detailed source document governs authorization, organization and school isolation, sensitive information, auditability, data management, imports, exports, backups, recovery, reconciliation, and related requirements.

Implementation must preserve:
- Least-privilege access.
- School and organization isolation.
- Authorized, validated, traceable consequential operations.
- Data provenance and historical integrity.
- Clear outcomes for successful, failed, partial, and interrupted operations.
- Safe retries that do not create duplicate or conflicting outcomes.
- Controlled reconciliation and recovery.
- Appropriate handling of sensitive information and files.

Imported historical records must not automatically be treated as newly confirmed business events. A historical payment import, for example, must not initiate a second collection or misleading payment notification.

Never weaken security or data integrity to make a demonstration easier.

## 10. User Experience and Navigation — HIMSSON 0.10

**Status in the source document: LOCKED — APPROVED.**

The UX architecture is role-aware, mobile-first, practical, and organized around the five core domains.

Role-aware experience defaults include:
- Owner/Director: organization oversight, school switching, relevant summaries, and authorized organization-level operations.
- School Administrator: school operations, people, records, configuration, and authorized oversight.
- Teacher: assigned classes, subjects, attendance, assessments, and permitted teaching responsibilities.
- Accountant: authorized financial operations, payments, balances, reconciliation, and reporting.
- Parent/Guardian: authorized child information, permitted payments, announcements, and published academic information.

These experience defaults do not replace backend authorization.

The active school must be clearly identifiable. Switching schools must deliberately update the active context. Organization-level views must be distinguishable from individual-school views. A school selector is not a security boundary.

The interface must prioritize task-oriented workflows, mobile and low-end Android usability, Swahili and English, accessible controls, clear statuses, reusable patterns, and reliable error recovery.

**Important boundary:** The source document leaves exact menu layout, icons, page hierarchy, and other detailed UI decisions to UI design. Do not treat a proposed sidebar, bottom-navigation arrangement, color palette, or page layout as a locked requirement unless an approved decision explicitly establishes it.

## 11. Design System, Configuration, and Technical Architecture

Consult the corresponding approved sections before implementing shared UI components, configuration behavior, external integrations, performance, or infrastructure.

Preserve the following architectural boundaries:
- Modules share interaction patterns without duplicating authoritative business logic.
- Configuration has an explicit owner, scope, validation rule, and defined effect.
- School-specific settings and records must not unintentionally alter another school.
- Integrations must preserve HIMSSON's authority over internal records, permissions, and domain rules.
- Performance optimizations must not weaken authorization, isolation, transaction integrity, or recoverability.
- Consequential configuration changes must not silently rewrite historical business events.

### Technology decisions not to invent

Do not assume or introduce a framework, language, database, ORM, authentication system, hosting provider, deployment platform, queue, caching strategy, or monitoring tool without an explicit decision.

The approved architecture leaves material implementation and deployment decisions open, including hosting, database, infrastructure, background-job technology, monitoring, and performance thresholds.

Inspect the actual repository and record an explicit technical decision before scaffolding the application.

## 12. Testing and Release Readiness — HIMSSON 0.14

**Status in the source document: LOCKED — APPROVED FOR NOW; detailed QA specification deferred.**

HIMSSON uses a risk-based, layered, evidence-driven testing strategy.

Testing should cover applicable:
- Unit behavior and business rules.
- Integration between domains, services, databases, jobs, and providers.
- Contracts between connected components.
- Complete end-to-end workflows.
- Authorization, role permissions, school isolation, and prohibited actions.
- Synchronization, recovery, failure handling, concurrency, and performance.

Test records must distinguish expected outcomes, actual outcomes, evidence, defects, fixes, and retests.

Use these result states accurately:
- Passed
- Failed
- Blocked
- Not run / untested

A screen rendering successfully does not prove the underlying workflow works. A defect described as fixed is not verified until the relevant retest succeeds.

## 13. Implementation Gate for Every Task

Before coding, Copilot must:

1. Identify the applicable approved architecture sections.
2. Inspect the actual repository and relevant files.
3. State the task's scope and acceptance criteria.
4. Identify dependencies and unresolved decisions.
5. Confirm that the proposed implementation does not contradict a locked decision.
6. Stop and ask for clarification if a required decision is unresolved.

After coding, Copilot must report:

1. Files changed.
2. What was implemented.
3. Tests and checks actually run, with their outcomes.
4. Known limitations, failures, and untested areas.
5. Whether the acceptance criteria are satisfied.
6. The next recommended step.

## 14. Authority and Change Control

This context is a derived summary, not a new architecture lock.

If it conflicts with the approved Word document, follow the approved source and flag the discrepancy for correction. Do not silently change either document.

A material change to a locked decision requires an explicit decision to reopen, evaluate, revise, document, and relock the affected architecture before implementation proceeds.