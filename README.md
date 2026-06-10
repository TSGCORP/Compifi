# Compifi

> Compensation intelligence for the middle.

Marketing site for **Compifi** — pairing senior compensation advisory with enterprise-grade market data, delivered through a single platform. Built for mid-market HR leaders.

## Stack

Static HTML. Each page is a single self-contained file with inlined CSS and JS — no build step, no external assets, no relative-path headaches. Deploys cleanly to GitHub Pages, Netlify, Vercel, or any static host. Drop a file in a browser and it just works.

## Structure

```
/
├── index.html                # Homepage — positioning, problem framing, modules, advisory team, pricing teaser
├── product.html              # Six modules, each with use-cases and sample insights
├── pricing.html              # Three tiers, public numbers, comparison table, FAQ
├── about.html                # Founder narrative + company beliefs
├── contact.html              # Three paths: walkthrough, email, partner referral
├── compifi-dashboard.html    # Full demo dashboard (Meridian Health Systems)
├── 404.html                  # Not-found page
├── README.md
└── .gitignore
```

Seven HTML files. Each one fully self-contained.

## Brand tokens

The same tokens live in every page's `<style>` block. If you update one, update all (or extract back to a shared CSS file once the design is locked).

| Token | Hex | Use |
|---|---|---|
| `--crimson` *(legacy var name)* | `#9F1239` | Brand primary. The `ifi` in the wordmark, primary CTAs, one focal point per screen. |
| `--crimson-dark` | `#7E1F2D` | Hover state and lifted version on dark backgrounds. |
| `--crimson-soft` | `#FBEAEE` | Subtle brand-tinted backgrounds (e.g., highlighted comparison row). |
| Lifted-on-dark | `#C73558` | The `ifi` on dark backgrounds, so the wordmark stays vivid. |
| `--ink` | `#0A0A0A` | Primary text, `Comp` in the wordmark, dark sections. |
| `--paper` | `#FAFAF9` | Page background. |
| `--rule` | `#E2E8F0` | Borders and dividers. |

> Note: the CSS variable name `--crimson` is legacy from the original site build. It now holds oxblood. Renaming the variable is a deferred cleanup task — works fine as-is.

Typography: **Inter** (Medium 500 / Bold 700) via Google Fonts. Arial as the universal fallback. The wordmark is always `Comp` in Medium near-black + `ifi` in Bold oxblood, tight tracking, no space.

## Brand voice

Confident, analytical, refreshingly direct. The way a trusted advisor sounds — not the way a software product markets itself. Pricing is public. Hard truths are the value, not the bug.

## Local development

Double-click any HTML file. That's it.

## Deployment

### GitHub Pages
1. Push to `main`
2. Settings → Pages → Source: `main` branch, `/` (root)
3. Site goes live at `https://<user>.github.io/<repo>/` within a minute

### Custom domain
1. Add `CNAME` file at the repo root containing the domain (e.g. `compifi.ai`)
2. Point DNS at GitHub Pages (or configure Netlify/Vercel)

## Open items before launch

- [ ] Wire the contact form to a real handler (Formspree, Basin, or similar)
- [ ] Replace `compifi-dashboard.html` demo with the real dashboard when it ships
- [ ] Add a real `robots.txt` and `sitemap.xml`
- [ ] OG image + meta tags for social previews

## License

© 2026 Compifi, Inc. All rights reserved.
