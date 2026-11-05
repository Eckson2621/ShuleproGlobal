# SHULEPRO GLOBAL V30.0

Global school-management platform by EAM VENTURES LTD (company registration pending).

## Current application structure

- `index.html`: registration, authentication, existing school dashboard, core student/marks/attendance/timetable/subscription/report/backup flows and Supabase client.
- `modules.js`: global school workspace, 48 structured module workspaces, Super Admin control center, teacher and class registers, and the yearly-plan-gated student fee ledger.
- `_headers`: security headers and Content Security Policy for Netlify.
- Supabase project: `Shulepro-v22`.

## Existing core flows retained

- School registration and login through Supabase Auth.
- School membership and school-scoped RLS.
- Student registration and list.
- Marks, attendance and timetable.
- ShulePro subscription plans and manual payment-reference submission.
- Super Admin payment review.
- School report printing and JSON backup.
- Existing language selector.

## Added workspaces

School administration; admissions and guardians; student movement and welfare; staff directory, workload and leave; curriculum and lesson plans; examinations and interventions; attendance follow-ups and scheduling; student fees; finance and procurement; parent/student portal workspaces; announcements and communication log; library; hostel; transport; inventory; events and counselling; settings and audit references; ShulePro AI workspaces.

The new generic workspaces store school-scoped records in `public.school_module_records`. This provides a common first-stage data workspace. Modules requiring specialised workflows, dedicated relational tables, approvals, reporting logic or integrations still need their next implementation stage; they are not represented as fully finished enterprise workflows.

## Security and data

- `school_module_records` has RLS and role-aware read/write policies.
- Sensitive workspace records are restricted to leadership roles.
- Student fee access is restricted at the database-policy level to an active `premium_yearly` subscription (`$100 USD/year`) and owner/headmaster/accountant roles.
- Super Admin school activation status is enforced by school membership helper functions; inactive schools are denied normal school access.
- Existing SECURITY DEFINER functions and password-protection settings still require a separate security review in Supabase Auth.

## Paid integrations intentionally not activated

DPO/payment gateway settlement, card processing, SMS/WhatsApp delivery, AI API usage, custom domain and any paid storage/service remain unconnected until the relevant accounts, contracts or subscriptions are purchased and configured. Manual payment-reference review remains the existing payment workflow.

## Netlify deployment

Keep `index.html`, `modules.js` and `_headers` together in the site root. The page loads `./modules.js`; uploading only `index.html` will leave the new workspace unavailable.

If Netlify is connected to this GitHub repository, the commits can trigger its normal deployment. If the Netlify site was created using manual Drop upload, download the three root files and upload them together as one site folder. Confirm the live deployment after upload.
