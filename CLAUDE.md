# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static, framework-free personal portfolio site for Rachel Lee (UI/UX designer). Plain HTML5 + vanilla CSS + vanilla JS — no build step, no bundler, no package manager dependencies (`package-lock.json` is an empty lockfile stub; ignore it).

## Running locally

There's no dev server script in `package.json`. Use the VS Code launch config or serve the root directly:

```bash
npx serve . --listen 3000 --no-clipboard
```

Then open `http://localhost:3000`. Any static file server works equally well since there is no build step — just open the HTML files directly in a browser, or serve the folder.

There is no lint/test/build tooling in this repo. Verify changes by opening the affected page(s) in a browser.

## Architecture

**One shared stylesheet and script for the whole site**: every page includes `css/style.css` (~1600 lines, single file, no preprocessor) and `js/script.js` (~120 lines, IIFE, no modules). Do not fork these per-page — add shared rules/behavior to the shared files and page-specific overrides inline in a `<style>` block only when truly page-specific.

**Design tokens live in `:root` in `css/style.css`** (lines ~51–95): color variables (`--text-main`, `--accent`, `--bg-odd`, etc.), spacing scale (`--sp-1`…`--sp-8`), and font-size scale (`--font-p`…`--font-h1`). Some tokens have duplicate/alias names for legacy case-study pages (e.g. `--ink` aliases `--text-main`). When adding new colors/spacing, extend this block rather than hardcoding values in page markup.

**Responsive breakpoints**: 1024px (tablet), 768px (mobile, hamburger nav kicks in), 480px (small mobile). Breakpoint overrides re-declare `:root` variables inside the media query (e.g. `--font-h1` shrinks at 1024px) — check for this pattern before changing a token's mobile behavior.

**Site is a flat collection of standalone HTML pages, not a router-driven app**:
- `index.html` — homepage (Hero / About / Works / AI / Contact)
- `portfolio.html` — main portfolio hub with category tabs (AI Agent, Web UI, Mobile UI, Web, Visual)
- `portfolio-*.html` — individual case-study / project detail pages (one file per project, e.g. `portfolio-sonar.html`, `portfolio-erp.html`, `portfolio-good.html`). To add a new project: copy the closest existing `portfolio-*.html`, edit content in place, then add a nav link/card pointing to it in `index.html` and `portfolio.html`.
- `portfolio-design-system-*.html` — a separate multi-page design system reference/spec (tokens, colors, typography, spacing, border, elevation, motion, z-index, theme, impact, products), built SGDS-style with primitive/semantic token layers. `portfolio-design-system-base.html` holds shared base styles/layout for this sub-site; the numbered pages (`01-tokens` … `11-products`) are its individual sections.
- `resume.html` / `enresume.html` — Chinese/English resume pages
- `works/` — currently empty (older case-study content has been folded into the `portfolio-*.html` pages directly, per README)

**JS behavior (`js/script.js`) is all vanilla, split into independent, defensively-guarded blocks** — each block does an `if (element exists)` check before wiring up, so it's safe to include the same script on pages missing some of the elements: nav scroll shadow, mobile menu toggle, `IntersectionObserver`-based `.reveal` animations, `.pf-tab` active-state detection (by comparing `location.pathname` to link `href`), horizontally-scrollable `.pf-tabs` arrows, and a touch/scroll-based `.slider` component (supports both horizontal and vertical via `.slider--v`) used on case-study pages for image galleries.

**Navigation active-state and cross-linking is manual**: nav links, portfolio category tabs, and homepage project cards all hardcode `href` targets to specific `portfolio-*.html` filenames. There's no central route config — renaming a page requires grepping for its filename across `index.html`, `portfolio.html`, and any other page that links to it.

## Fonts

Self-hosted **Orpheus Pro** (`fonts/OrpheusPro-Bold.ttf`, `fonts/Orpheus-Regular.ttf`) for display type, plus Lato + Noto Sans TC for body text (`--font-sans` token). Do not reintroduce Google Fonts for these — they were deliberately migrated to local files (see recent commit history).

## Images

`img/` holds all case-study screenshots and hero images, organized by project (subfolders like `img/T5`, `img/ww`, `img/aft`) plus flat hero images (`img/heroX.jpg`). When adding a new project's images, follow the existing per-project-subfolder convention rather than dumping everything flat.
