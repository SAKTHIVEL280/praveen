# Praveen S — Cloud AI Engineer & Systems Architect Portfolio

A cinematic, performance-focused, AI-native portfolio engineered for **Praveen S** (B.E. Computer Science and Engineering — Artificial Intelligence and Machine Learning, 9.2/10 CGPA).

Built with **React**, **TypeScript**, **GSAP ScrollTrigger**, **Lenis Smooth Scroll**, and **Tailwind CSS** styled in a bespoke **Caterpillar Dark & Yellow Palette** (`#0D0D0D` Dark Charcoal, `#FFCD00` Caterpillar Yellow).

---

## 🌟 Key Highlights

- **Caterpillar Theme Aesthetics**: Bold, high-contrast dark industrial design with custom morphing SVG curves and Caterpillar Yellow section breaks.
- **Candidate Engineering Focus**: Tailored for enterprise cloud, multi-agent AI orchestration, and software engineering roles.
- **Verified Credentials Section**: Displaying authentic official badges for Microsoft, Oracle, and Anthropic with live verification links.
- **Production Projects Showcase**: Real-world systems including *Mecandria ERP SaaS*, *Complaint Priority OS*, *EnviroScan AI Platform*, and *HMS Cloud Infrastructure*.
- **Technical Skills Matrix**: 6 exact skill categories directly synchronized with candidate resume.
- **Cinematic Motion**: Line-draw intro loader, Lenis smooth scrolling, text scrambling, magnetic hover effects, and GSAP ScrollTrigger timelines.

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 18, TypeScript, Vite 5
- **Styling**: Tailwind CSS, Vanilla CSS Design System, Custom SVG Wave Generators
- **Animation**: GSAP 3 + ScrollTrigger, Studio Freight Lenis
- **Routing**: React Router DOM v6
- **Testing**: Vitest, React Testing Library
- **Deployment**: Vercel SPA Routing (`vercel.json`), Static WebP Assets

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation & Setup

```bash
# Clone repository
git clone https://github.com/SAKTHIVEL280/praveen.git
cd praveen

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:8080`.

---

## 📜 Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts local Vite development server with hot reload |
| `npm run build` | Builds optimized production bundle in `dist/` |
| `npm run preview` | Locally previews production build |
| `npm run test` | Executes Vitest unit & contract test suite |
| `npm run lint` | Runs ESLint for code quality checks |

---

## 📂 Project Structure

```text
praveen-portfolio/
├── public/                  # Favicons, robots.txt, sitemap, resume PDF
├── src/
│   ├── assets/              # WebP project screenshots, official credential badges
│   ├── components/
│   │   ├── sections/        # Hero, Manifesto, Philosophy, Projects, Skills, Certifications, Footer
│   │   ├── IntroLoader.tsx  # Line-draw counter & curtain transition
│   │   ├── Magnetic.tsx     # Magnetic hover micro-interaction
│   │   └── SmoothScroll.tsx # Lenis + GSAP ticker integration
│   ├── pages/               # Index (Home) and Projects detail routes
│   └── index.css            # Custom CSS variables & Caterpillar theme rules
├── vercel.json              # Vercel SPA rewrite & security headers
├── vite.config.ts           # Vite build configuration
└── README.md                # Project documentation
```

---

## 📄 License & Credits

Designed & Engineered for **Praveen S**. All rights reserved © 2026.
