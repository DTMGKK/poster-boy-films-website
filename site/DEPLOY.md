# Poster Boy Films — Deploy Guide

## What this is

A static website for posterboyfilms.ie powered by:

- **Eleventy** — generates HTML from templates and data files
- **Decap CMS** — browser-based content editor at `/admin`
- **Netlify** — free hosting + auto-deploy when content changes
- **GitHub** — stores the code and content

## What you can edit (today, after deploy)

Once deployed, you log in at `posterboyfilms.ie/admin` and edit:

1. **Site Copy** — hero headline, subtitle, slate heading, contact email, CTA copy
2. **Ecosystem (Studios)** — PBF and Adventureverse cards: name, description, CTAs
3. **Method (Four Levels)** — the four-step "how we work" section
4. **Projects** — add new projects, edit existing, reorder, hide/show

Save in the editor → Netlify rebuilds in 60 seconds → live site updates.

## What's still static (Phase 2)

These pages still need template conversion to be CMS-editable:

- `index.html` — the brick breaker game (no content to edit anyway, leave static)
- `catalogue.html` — full catalogue page (will share project data eventually)
- `projects.html` — slate page (will share project data eventually)
- `work-library.html`
- `project-template.html`

These work as-is; they just can't be edited via CMS yet. We'll convert them in a follow-up session.

---

## DEPLOY — your 5-step setup (~30 minutes total)

### Step 1 — Create a GitHub account
**Time:** 2 minutes (skip if you have one)

Go to https://github.com/signup. Use your dave@adventurverse.studio email.

### Step 2 — Create a repository and push this code
**Time:** 10 minutes

1. On GitHub, click **+ New repository**
2. Name it: `poster-boy-films-website`
3. Set to **Private** (you can change later)
4. Click **Create repository**
5. On the repo page, click **uploading an existing file**
6. Drag the entire contents of this `site/` folder into the upload area (everything — `package.json`, `.eleventy.js`, `netlify.toml`, the whole `src/` folder)
7. Scroll down, click **Commit changes**

### Step 3 — Connect Netlify
**Time:** 5 minutes

1. Go to https://app.netlify.com/signup
2. Sign up with **GitHub** (one-click)
3. After login, click **Add new site → Import an existing project**
4. Pick **GitHub** as the provider, authorize, then select `poster-boy-films-website`
5. Build settings should auto-fill (publish: `_site`, command: `npm install && npm run build`). Click **Deploy site**
6. Wait ~2 minutes. You'll see a URL like `https://random-name.netlify.app`. **The site is live.**

### Step 4 — Enable Netlify Identity (so you can log into the CMS)
**Time:** 5 minutes

1. In Netlify, open the site → **Site settings → Identity → Enable Identity**
2. Under **Registration preferences**, set to **Invite only** (so randoms can't sign up)
3. Under **Services → Git Gateway**, click **Enable Git Gateway**
4. Go to **Identity → Invite users**, invite `dave@adventurverse.studio`
5. Check your email, click the invite link, set a password
6. Done. You can now log in at `your-site.netlify.app/admin/` and edit content.

### Step 5 — Point your domain at Netlify
**Time:** 10 minutes (depends on where domain is registered)

1. In Netlify: **Site settings → Domain management → Add custom domain → posterboyfilms.ie**
2. Netlify shows you DNS records you need to add
3. Go to where you bought the domain (Squarespace's domain registrar, or wherever)
4. Add the DNS records Netlify shows you (an A record + a CNAME record)
5. Wait up to 24 hours for DNS to propagate (usually under an hour)
6. Cancel your Squarespace site subscription (keep the domain registration if it's there)

---

## Local development (optional, only if you want to preview before pushing)

If you ever want to preview locally:

```bash
cd site/
npm install
npm run dev
```

Open http://localhost:8080. Changes to data files reload automatically.

You don't need to do this — Netlify builds for you on every push.

---

## How to add a new project

1. Log into `/admin`
2. Click **Projects (Slate)** in the sidebar
3. Click **New Projects**
4. Fill the fields
5. Click **Publish → Publish now**
6. Wait 60 seconds. Refresh the homepage. New project is on the slate.

## How to edit hero copy

1. Log into `/admin`
2. Click **Site Copy → Site-wide Settings**
3. Edit any field
4. Click **Publish → Publish now**
5. Wait 60 seconds. Refresh.

## Help / Troubleshooting

- **CMS won't load** — Check Netlify Identity is enabled and Git Gateway is on
- **Changes don't show up** — Wait full 60 seconds, then hard refresh (Cmd+Shift+R)
- **Build failed** — Open Netlify → Deploys → click the failed deploy → see error log

When stuck, send me the error message and I'll fix it.
