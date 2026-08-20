# Qwen-UI-Agent — Technical Report Website

> [!IMPORTANT]
> **Website source only — this is not the Qwen-UI-Agent implementation repository.**
>
> This repository contains only the source code and static assets for the
> [Qwen-UI-Agent project website](https://tongyi-mai.github.io/Qwen-UI-Agent/),
> which is hosted with GitHub Pages. It does **not** contain the model,
> training code, or agent implementation.
>
> **Looking for the Qwen-UI-Agent code? Visit the official project repository:**
> [**Tongyi-MAI/MAI-UI**](https://github.com/Tongyi-MAI/MAI-UI)
>
> **本仓库仅为网站源码，并非 Qwen-UI-Agent 的项目实现代码仓。**
>
> 本仓库只包含
> [Qwen-UI-Agent 项目网站](https://tongyi-mai.github.io/Qwen-UI-Agent/)
> 在 GitHub Pages 上使用的网页源代码与静态资源，**不包含模型、训练代码或智能体实现代码**。
>
> **如需查找 Qwen-UI-Agent 的项目代码，请访问官方项目代码仓：**
> [**Tongyi-MAI/MAI-UI**](https://github.com/Tongyi-MAI/MAI-UI)

This repository powers the bilingual Qwen-UI-Agent technical report website.
The site presents real-world capabilities, benchmark results, broader general
and agentic capabilities, playable demos, and release materials.

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm test
npm run build:pages
```

`npm run build:pages` creates the static GitHub Pages output in `out/`. The
project is configured for a root Pages site and ships `public/.nojekyll`.
`.github/workflows/deploy-pages.yml` builds and publishes this output whenever
the `main` branch is pushed.

## Editing guide

- Edit all bilingual copy, capability-carousel items, benchmark cards,
  broader-capability tables, and video links in `app/siteContent.ts`.
- `APPLICATIONS` controls the six visual slides in the interactive
  “what it can do” carousel. Each card intentionally contains only a visual,
  label, title, and short description.
- Capability visuals support a CSS-drawn mobile scene, a muted looping local
  video, a three-frame animated browser sequence, and regular image crops.
- `MODEL_ORGANIZATIONS` maps each benchmark entry to its visible publisher
  label and local asset in `public/brand-logos/`.
- `GENERAL_CAPABILITY_GROUPS` is rendered inside Performance as the “Broader
  Capabilities” subsection; it is not a standalone page section.
- Desktop performance cards use a three-column layout and collapse
  responsively on narrower screens.
- The five real-device mobile workflows are hosted directly from
  `public/demos/source/`; edit their bilingual titles and instructions in
  `DEMO_VIDEOS`.
- The two full-length Computer Use workflows are also hosted from
  `public/demos/source/` as web-optimized 720p H.264 videos. Their complete
  bilingual task instructions live in `DEMO_VIDEOS`.
- The Demo explorer uses five domains: real-device mobile, computer use,
  cross-device GUI use, mobile use with Deep Research, and proactive service.
  The cross-device domain embeds the two official Bilibili workflows for
  phone-to-PC receipt processing and mobile-search / PC-summary work. The two
  proactive workflows are locally hosted portrait videos with bilingual
  instructions.
- The Deep Research domain embeds the two official Bilibili demos for
  evidence-based weight-loss verification and World Cup / RedNote retrieval.
- Every `DEMO_VIDEOS` entry records its original instruction language in
  `instructionSourceLanguage`. The opposite-language interface automatically
  marks the instruction as `translated from Chinese` or `翻译自英文指令`.
- Edit page structure in `app/components/ReportPage.tsx`.
- Edit the visual system and responsive layout in `app/globals.css`.
- Replace the `Coming soon` resource cards with the final technical report, code, and
  checkpoint URLs at release time.

The primary flow is Capabilities → Performance (including Broader
Capabilities) → Demos → Citation.

Every visible navigation, benchmark-domain, demo-category, carousel-control,
and status label should provide both English and fully localized Chinese copy.
Model and benchmark proper names remain unchanged.

External reference embeds remain explicitly labeled as temporary samples.
Result figures that conflict across the current draft are intentionally
omitted until the technical-report values are frozen.

The compact benchmark logos are stored locally so the charts do not depend on
third-party requests. Most SVGs come from Lobe Icons 1.94.0; Gemini and
Anthropic use the supplied reference icons, and the Apodex avatar comes from
its official Hugging Face organization. Brand marks remain subject to their
respective trademark guidelines and are used only for source identification.
