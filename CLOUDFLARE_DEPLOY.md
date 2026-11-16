# ShuleProGlobal — Cloudflare Workers migration

This branch prepares a Cloudflare Workers static-assets deployment while leaving the existing Netlify root files and Supabase project untouched.

## Files
- `site/index.html`, `site/modules.js`: exact copies of the current app files from the main branch.
- `site/_headers`: copied security headers and current Content Security Policy.
- `worker.js`: serves the static assets and maps the root path to index.html.
- `wrangler.toml`: Cloudflare Workers static-assets configuration.

## Deploy
1. In Cloudflare Dashboard, open Workers & Pages and create a Worker named `shuleproglobal`.
2. Connect the GitHub repository `Eckson2621/ShuleproGlobal` and select branch `cloudflare-workers-migration`, or deploy this branch using Wrangler from its repository checkout.
3. Build command: leave empty. Deploy command: `npx wrangler deploy`.
4. Confirm the Worker uses the included `wrangler.toml` and static assets directory `site`.
5. Smoke-test registration screen, sign-in, password recovery redirect, Supabase requests, modules workspace, and blocked/inactive-school access.
6. Keep Netlify online until these tests pass. Do not change Supabase URL/keys during hosting migration.

## Important Supabase configuration check
The live application source currently points to `https://btrxhcfhnriekwsazvnc.supabase.co`, while the README identifies the database as `Shulepro-v22`. Verify in the Supabase dashboard which project contains the production school data before changing any backend setting. This migration intentionally preserves the existing application URL and anon key unchanged.

## Limitations
This repository change prepares the deployment; it does not itself create a Cloudflare account deployment or verify the resulting `workers.dev` URL. Cloudflare account authorization is required for the final deploy.
