# CodeLingo AI Deployment Checklist

Goal: prepare CodeLingo AI for public portfolio deployment, with Vercel as the default recommended host.

## 1. Vercel Deployment Readiness

Status: Ready with minor presentation follow-ups

- Build command: `npm run build`
- Test command before deploy: `npm test`
- Framework preset: Next.js
- Runtime environment variables: none required for the current local-first MVP
- Backend services: none
- Database services: none
- Authentication providers: none
- Public deployment risk: low, because the MVP stores progress locally in the browser and does not depend on external secrets or APIs

Recommended Vercel settings:

```text
Framework Preset: Next.js
Install Command: npm install
Build Command: npm run build
Output Directory: default Next.js output
Environment Variables: none required
```

Pre-deploy command sequence:

```bash
npm install
npm test
npm run build
```

## 2. Metadata Review

Status: Basic metadata ready

Current metadata in `app/layout.jsx`:

```js
export const metadata = {
  title: "CodeLingo AI",
  description: "Duolingo-style microlearning for Python, SQL, data, machine learning, and AI."
};
```

Ready:

- App title exists.
- App description exists.
- Root layout declares `lang="en"`.
- Metadata is suitable for an initial portfolio MVP deployment.

Needs improvement after public URL exists:

- Add canonical URL.
- Add Open Graph metadata.
- Add Twitter card metadata.
- Add richer deployment-specific description if the deployed URL is shared on LinkedIn, GitHub, or portfolio pages.

## 3. Open Graph Image

Status: Needed before public sharing

Current state:

- No Open Graph image asset was found.
- No `public/` image asset directory was found.
- README currently includes screenshot placeholders but no committed preview images.

Recommended asset:

```text
public/og-image.png
```

Suggested OG image content:

- Product name: CodeLingo AI
- Short value proposition: Duolingo-style coding microlearning
- Visual cues: dashboard, XP, 6 tracks, 60 questions
- Size: 1200 x 630 px

Suggested future metadata:

```js
openGraph: {
  title: "CodeLingo AI",
  description: "A portfolio-ready coding microlearning MVP with XP, daily missions, review, and learning analytics.",
  images: ["/og-image.png"]
}
```

## 4. Favicon Check

Status: Needed before public sharing

Current state:

- No favicon file was found.
- No custom brand icon was found.
- No `public/` directory was found.

Recommended files:

```text
public/favicon.ico
public/icon.png
public/apple-touch-icon.png
```

Minimum acceptable pre-deploy task:

- Add `public/favicon.ico` or `app/icon.png` with a simple CodeLingo AI mark.

## 5. Live Demo URL Placeholder

Status: Needed after deployment

Current placeholder:

```text
Live Demo: TODO - add Vercel URL after deployment
```

Recommended final format:

```md
Live Demo: https://codelingo-ai.vercel.app
```

Where to add it:

- Top of `README.md`, near MVP status and validation highlights
- `PORTFOLIO_V1.md`, under Project Overview or Future Roadmap
- Personal portfolio project card

## 6. Screenshot Asset Locations

Status: Planned

README already identifies screenshot placeholders. Recommended committed locations:

```text
docs/screenshots/dashboard-desktop.png
docs/screenshots/quiz-active.png
docs/screenshots/explanation-card.png
docs/screenshots/results-summary.png
docs/screenshots/dashboard-mobile.png
```

Recommended capture list:

- Desktop dashboard with daily mission and learning tracks
- Active quiz question with hint and XP reward
- Explanation card after answer submission
- Quiz result summary
- Mobile dashboard at 390px width

README image block to add after assets exist:

```md
## Screenshots

![CodeLingo AI dashboard](docs/screenshots/dashboard-desktop.png)
![CodeLingo AI mobile dashboard](docs/screenshots/dashboard-mobile.png)
```

## 7. README Demo Section

Status: Needed after deployment

Current state:

- README is portfolio-grade and recruiter-friendly.
- README includes screenshot placeholders.
- README does not yet include a live demo link because no public URL has been added.

Recommended section:

```md
## Live Demo

- Live app: TODO - add Vercel URL
- Case study: PORTFOLIO_V1.md
- Deployment checklist: DEPLOYMENT_CHECKLIST.md
```

Recommended placement:

- Immediately after the opening MVP status block, before `## 1. Project Overview`.

## 8. Portfolio Linking Section

Status: Needed after deployment

Recommended links to add after public deployment:

```md
## Portfolio Links

- Live Demo: TODO - add Vercel URL
- Case Study: [PORTFOLIO_V1.md](PORTFOLIO_V1.md)
- Project Status: [PROJECT_STATUS.md](PROJECT_STATUS.md)
- Roadmap: [ROADMAP.md](ROADMAP.md)
- Daily Log: [docs/DAILY_LOG.md](docs/DAILY_LOG.md)
```

Recommended external portfolio placement:

- Portfolio homepage project card
- GitHub repository description
- Resume project bullet
- LinkedIn featured project

## Deployment Recommendation

CodeLingo AI is ready for a first Vercel portfolio deployment from a functional perspective.

Deploy now if the goal is to validate the app publicly and collect a live URL. Before actively sharing the link with recruiters, complete the presentation polish items:

1. Add favicon or app icon.
2. Add Open Graph image.
3. Deploy to Vercel.
4. Add live demo URL to README.
5. Add screenshot assets.
6. Add portfolio links to README and `PORTFOLIO_V1.md`.
7. Run one post-deployment desktop and mobile smoke test.

Final pre-share readiness target:

- `npm test` passes
- `npm run build` passes
- Vercel deployment succeeds
- Live demo URL works
- README includes live demo, screenshots, and portfolio links
- Favicon and OG preview appear correctly
