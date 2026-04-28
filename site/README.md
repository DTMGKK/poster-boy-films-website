# Poster Boy Films Website

Static site for posterboyfilms.ie. Built with Eleventy. Edited via Decap CMS.

**To deploy:** see `DEPLOY.md`.

## Structure

```
site/
├── package.json          # Node dependencies
├── .eleventy.js          # Eleventy config
├── netlify.toml          # Netlify build config
├── DEPLOY.md             # Deploy instructions
└── src/
    ├── _data/            # Editable site data (YAML)
    │   ├── site.yml      # Hero, slate, contact copy
    │   ├── ecosystem.yml # The two studios
    │   └── method.yml    # The four levels
    ├── _includes/        # Shared layouts
    ├── projects/         # One .md file per project
    ├── admin/            # Decap CMS UI + config
    ├── assets/           # Logo files
    ├── static-pages/     # Pages not yet templatised
    │   ├── index.html        # Brick breaker game (entry point)
    │   ├── catalogue.html
    │   ├── projects.html
    │   ├── work-library.html
    │   └── project-template.html
    ├── pbf-system.css    # Shared design system CSS
    └── home.njk          # Homepage template (uses _data)
```

## Local dev

```bash
npm install
npm run dev
```

Open http://localhost:8080
