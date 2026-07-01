<div align="center">

# ⚡ pranjalkrishnanand.xyz

### Premium Cinematic Portfolio Website

*Electronics & Communication Engineering · Embedded Systems · IoT · FPGA · Robotics*

[![Live Site](https://img.shields.io/badge/🌐_Live_Site-pranjalkrishnanand.xyz-3b82f6?style=for-the-badge&logoColor=white)](https://pranjalkrishnanand.xyz)
[![Deploy](https://img.shields.io/github/actions/workflow/status/IamKnight8055/content-prod/nextjs.yml?style=for-the-badge&label=Deploy&logo=github-actions&logoColor=white)](https://github.com/IamKnight8055/content-prod/actions)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

</div>

---

## 🎬 Overview

A **world-class personal portfolio** built with a cinematic design philosophy — blending the aesthetic sensibilities of Apple, A24 Films, NASA JPL, and modern architectural magazines into a single immersive engineering showcase.

Every animation is intentional. Every interaction feels premium. Every section tells a story.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🎨 **Design** | Dark-first, editorial layout with glassmorphism accents |
| ⚡ **Animations** | Framer Motion — scroll reveals, stagger sequences, shared layouts |
| 🖱️ **Custom Cursor** | Lagged ring cursor with hover state morphing |
| 🔌 **PCB Canvas Hero** | Custom canvas-drawn animated circuit board background |
| ⌨️ **Typewriter Effect** | Role cycling with smooth character-by-character typing |
| 📊 **Animated Counters** | Easing-based number counters triggered on scroll |
| 📱 **Fully Responsive** | Mobile-first, tested across all breakpoints |
| ♿ **Accessible** | ARIA labels, keyboard nav, `prefers-reduced-motion` support |
| 🚀 **Static Export** | Deploys as pure HTML/CSS/JS — no server required |
| 🔍 **SEO Ready** | Full meta tags, Open Graph, Twitter cards |

---

## 🗂️ Sections

```
Hero          →  PCB circuit animation · typewriter roles · animated entrance
About         →  Editorial 2-column layout · floating glass profile card
Skills        →  Animated progress bars · 4 categories · marquee ticker
Projects      →  Director's Grid · expand-to-detail modal · circuit art thumbnails
Experience    →  Alternating glowing timeline
Research      →  Publication cards with status badges
Achievements  →  Animated counters · awards grid · horizontal certifications slider
Contact       →  Contact form · social links · resume download
```

---

## 🛠️ Tech Stack

```
Framework     Next.js 16  (App Router, Static Export)
Language      TypeScript 5
Styling       Tailwind CSS v4  +  Custom CSS Design Tokens
Animations    Framer Motion
Fonts         Inter · Space Grotesk · IBM Plex Mono  (Google Fonts)
Deployment    GitHub Actions  →  GitHub Pages
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/IamKnight8055/content-prod.git
cd content-prod

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:3000
```

### Production Build

```bash
npm run build
# Outputs static files to /out — ready for any static host
```

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout — fonts, metadata, cursor, nav
│   ├── page.tsx            # Main page — composes all sections
│   └── globals.css         # Design system — tokens, typography, animations
├── components/
│   ├── effects/
│   │   └── CustomCursor.tsx
│   ├── layout/
│   │   ├── Navigation.tsx  # Frosted glass nav + scroll progress bar
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx         # Canvas PCB animation + entrance sequence
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Projects.tsx     # Director's Grid + expand-to-modal
│       ├── Experience.tsx   # Alternating timeline
│       ├── Research.tsx
│       ├── Achievements.tsx # Animated counters + certifications
│       └── Contact.tsx
├── data/
│   ├── projects.ts
│   ├── skills.ts
│   └── achievements.ts     # Experience · achievements · stats · certs
├── hooks/
│   └── useHelpers.ts       # useMousePosition · useScrollProgress · useInView
├── lib/
│   └── utils.ts
├── public/
│   └── CNAME               # pranjalkrishnanand.xyz
└── .github/
    └── workflows/
        └── nextjs.yml      # CI/CD — build → deploy to GitHub Pages
```

---

## 🌐 Deployment

This site auto-deploys to **GitHub Pages** on every push to `main` via GitHub Actions.

**Setup (one-time):**
1. Go to **Settings → Pages** in this repo
2. Set source to **GitHub Actions**
3. Push to `main` — done ✅

**Custom Domain:** `pranjalkrishnanand.xyz` is configured via `public/CNAME`.

---

## 🎨 Design System

The design uses a dark-first palette with engineering-inspired accent colors:

| Token | Color | Use |
|---|---|---|
| Background | `#09090b` | Base |
| Surface | `#111113` | Cards |
| Electric Blue | `#3b82f6` | Primary accent |
| Cyan | `#06b6d4` | Signal processing |
| Violet | `#8b5cf6` | Robotics / AI |
| Emerald | `#10b981` | Research / live |

Typography scale uses **fluid sizing** (`clamp()`) for editorial-style headings at any screen size.

---

## 📬 Contact

**Pranjal Krishnanand**
- 🌐 [pranjalkrishnanand.xyz](https://pranjalkrishnanand.xyz)
- 💻 [github.com/IamKnight8055](https://github.com/IamKnight8055)

---

<div align="center">

*Built with precision and obsession · © 2025 Pranjal Krishnanand*

</div>
