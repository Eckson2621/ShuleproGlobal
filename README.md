# SHULEPRO GLOBAL V31.0

Global school-management platform by EAM VENTURES LTD (company registration pending).

## Current application structure

- `index.html`: school registration, Supabase Auth, school membership resolution, subscription selection, core student/marks/attendance/timetable/payment/report/backup flows.
- `modules.js`: school workspace, 48 structured department workspaces, School Journey dashboard, school setup form, Super Admin control center, teacher/class registers and the yearly-plan-gated student fee ledger.
- `_headers`: Netlify security headers and Content Security Policy.
- Supabase project: `Shulepro-v22`.

## Verified core database structures

The connected Supabase schema currently contains schools, school memberships, students, teachers, classes, subjects, exams, marks, results, attendance, timetable, reports, settings, subscriptions, plans, plan prices, payments, audit logs, super admins, fees and school module records. Existing data was not deleted by this code update.

## Existing core flows retained

- School registration and email-confirmed login through Supabase Auth.
- School membership and school-scoped RLS.
- Student registration, editing, searching and listing.
- Marks, attendance and timetable.
- 14-day trial selection and subscription pricing.
- Manual payment-reference submission and Super Admin payment review.
- School reports and print-to-PDF.
- JSON student backup and restore.
- Language selector.

## V31.0 changes

- Added a School Journey dashboard that shows registration, subscription, setup, student/staff/class, operations, reports, AI and Super Admin checkpoints.
- Added a guided School Setup form for address, phone, official email, website, academic year, term, currency and timezone. These values are saved in the existing `settings.settings_data` JSON record for that school.
- Preserved the existing school data and core modules.
- JavaScript syntax checks passed for the inline application script and `modules.js`.
- Confirmed that `index.html` loads `./modules.js` and that the repository contains `_headers`.

## Scope honesty: what is and is not complete

The 48 department workspaces currently provide school-scoped structured record registers on `public.school_module_records`. They are not all complete enterprise workflows. Specialised functions such as payroll calculations, parent/student self-service authentication, full library circulation, transport routing, country-specific curriculum engines, advanced report-card generation and detailed financial accounting still need dedicated implementation and end-to-end tests.

The current application code has passed static JavaScript syntax checks, but a full browser-based end-to-end test of registration, email confirmation, every role, every module and every payment path has not yet been completed. Do not describe the whole platform as production-ready until those tests pass.

## Security and data

- `school_module_records` has RLS and role-aware read/write policies.
- Sensitive workspace records have role restrictions.
- Student fee access is restricted at database-policy level to owner/headmaster/accountant roles and the active `premium_yearly` subscription.
- School membership helpers deny access to inactive schools.
- Supabase Security Advisor currently reports six SECURITY DEFINER function warnings and leaked-password protection disabled. The functions inspected include checks for authenticated ownership or Super Admin membership; these warnings still need a deliberate security review and Auth password-protection configuration.

## Paid integrations intentionally not activated

DPO/card settlement, SMS/WhatsApp delivery, AI API usage, custom domain and paid storage remain disconnected until the necessary accounts, credentials, contracts or subscriptions are supplied. Manual payment-reference review remains the current payment workflow. A TxID alone is not proof that funds have arrived.

## Netlify deployment

Keep `index.html`, `modules.js` and `_headers` together in the site root. The page loads `./modules.js`; uploading only `index.html` will leave the additional workspace unavailable.

If Netlify is connected to this GitHub repository, these commits may trigger its configured deployment. The Netlify dashboard and live deployment have not been verified from this repository connection. Confirm the published deployment before relying on the new version.
