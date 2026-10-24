# Arda Aydın Kılınç — Portfolio

Personal portfolio at **https://ardaaydinkilinc.com**.

A dark, motion-rich single-page site whose content (profile, about, stats, experience, skills, projects, contact, social links) is served by a .NET API and managed from an admin panel at `/admin`.

## Stack

| Layer    | Tech |
|----------|------|
| Frontend | Vite 5 · React 18 · TypeScript · Tailwind CSS · Framer Motion · React Router · Lucide / React Icons |
| Backend  | ASP.NET Core 8 · EF Core (MySQL) · JWT auth · BCrypt · SMTP mail (`PortfolioApi/`) |
| Hosting  | IIS / Plesk — SPA served from `dist/`, API mounted under `/api` |

## Frontend

```bash
npm install
npm run dev      # http://localhost:5173 — /api is proxied to VITE_PROXY_TARGET (default: production API)
npm run build    # type-check + production build into dist/
npm run lint
```

Environment (see `.env.example`):

| Variable            | Default                         | Purpose |
|---------------------|---------------------------------|---------|
| `VITE_API_URL`      | `/api`                          | Base URL the browser calls |
| `VITE_PROXY_TARGET` | `https://ardaaydinkilinc.com`   | Where the dev server proxies `/api` (use `http://localhost:5224` for a local backend) |

If the API is unreachable the site renders a bundled snapshot (`src/data/fallback.ts`) instead of an empty page; the admin panel shows a warning in that state.

### Structure

```
src/
  pages/            Landing (public) · Admin (lazy-loaded, /admin/*)
  components/
    sections/       Hero · About · Experience · Skills · Projects · Contact
    layout/         Navbar · Footer · Background · ScrollProgress
    ui/             Reveal · SpotlightCard · Tilt · Magnetic · Counter · SectionHeading
    admin/          Login · CollectionEditor · SingletonEditor · Form · panels
  context/          PortfolioContext — loads every resource, falls back per resource
  lib/              api.ts (typed client) · types.ts · icons.tsx · utils.ts
  data/             fallback.ts
public/
  web.config        IIS rewrite: SPA fallback for deep links, leaves /api alone
  og-image.png      Social preview · favicon.svg
```

## Backend

```bash
cd PortfolioApi
cp appsettings.Example.json appsettings.Development.json   # fill in MySQL, JWT and SMTP settings
dotnet run                                                # Swagger at /swagger in Development
```

All `POST`/`PUT`/`DELETE` endpoints require a `Bearer` token obtained from `POST /auth/login`; `GET` endpoints and `POST /email/send` are public.

## Deploy

1. `npm run build` → upload `dist/` (includes `web.config`) to the site root.
2. Publish `PortfolioApi` as an IIS application mounted at `/api`.

The GitHub Actions workflow in `.github/workflows/deploy.yml` also builds the frontend and publishes it to GitHub Pages.
