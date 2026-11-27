# ShulePro Cloudflare Workers deployment

The application is a static HTML/JavaScript PWA. The Cloudflare Workers Static Assets configuration in `wrangler.jsonc` publishes the complete application from `dist/`.

## Safety

- The deployment workflow is manual (`workflow_dispatch)); pushing code does not deploy to production.
- It targets the existing Worker name `shuleproglobal1`, matching the current `shuleproglobal1.eckson.workers.dev` hostname.
- It does not run database migrations, change Supabase settings, or write to school records.
- The workflow copies the app shell, module bundle, PWA files, icons, and hosting headers together. It does not publish the repository root.

## One-time GitHub configuration

In the GitHub repository, open **Settings → Secrets and variables → Actions** and add:

- `CLOUDFLARE_API_TOKEN`: an API token with permission to edit Workers for the target account.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID that owns the existing Worker.

Do not put either value in source code or commit them.

## Deploy

After the secrets are configured, open **Actions → Deploy ShulePro to Cloudflare Workers → Run workflow** and run it from the intended branch. Check the workflow result, then verify the existing production hostname and test school registration/login, module loading, PWA install, and a hard refresh.

The workflow is deliberately manual so that the first deployment can be supervised. GitHub Pages and any other existing hosting are left untouched.
