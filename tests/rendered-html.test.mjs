import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Qwen-UI-Agent technical report", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  const siteContent = await readFile(
    new URL("../app/siteContent.ts", import.meta.url),
    "utf8",
  );
  assert.match(html, /<title>Qwen-UI-Agent — Technical Report<\/title>/i);
  assert.match(html, /MAI-UI Team/);
  assert.match(
    html,
    /Alibaba&#x27;s Next-Generation Real-World-Centric GUI Agent/,
  );
  assert.match(
    html,
    /One agent for real phones, computers, and web browsers, with Deep Research capabilities/,
  );
  assert.match(html, /in the real world through to completion/);
  assert.match(html, /src=["']\/tongyi-mark\.png["']/);
  assert.match(html, /Built to complete real work across GUI interfaces/);
  assert.match(html, /Mobile GUI Use/);
  assert.match(html, /Airport ride with time and budget constraints/);
  assert.match(html, /Set route &amp; time/);
  assert.match(html, /Compare price &amp; ETA/);
  assert.match(html, /Request approval/);
  assert.match(html, /Choose the fastest option under CNY 100/);
  assert.match(siteContent, /Reconcile a business-trip expense claim/);
  assert.match(siteContent, /extract eight receipt PDFs/);
  assert.match(siteContent, /Look up Alphabet's latest growth report/);
  assert.match(siteContent, /Search for Alphabet's latest growth report/);
  assert.doesNotMatch(siteContent, /Build an Alphabet growth report/);
  assert.match(siteContent, /Research a team dinner, then prepare the booking/);
  assert.match(
    siteContent,
    /Cross-check reviews, menu prices, and live availability/,
  );
  assert.match(siteContent, /Proactively recover from a cancelled flight/);
  assert.match(
    siteContent,
    /if a travel disruption appears in my notifications/,
  );
  assert.match(
    html,
    /Optimized for everyday tasks in real-device mobile GUI use/,
  );
  assert.match(html, /Computer GUI \+ CLI/);
  assert.match(html, /Browser Use/);
  assert.match(html, /Deep Research \+ GUI/);
  assert.match(html, /Proactive Service/);
  assert.doesNotMatch(html, /application-live-badge/);
  assert.doesNotMatch(
    html,
    /Five compact views|Move between scenarios|selected capability expands/,
  );
  assert.match(html, /Technical report/);
  assert.match(html, /https:\/\/github\.com\/Tongyi-MAI\/MAI-UI/);
  assert.match(html, />GitHub</);
  assert.match(html, /End-to-End GUI Tasks/);
  assert.match(html, /Broader Capabilities/);
  assert.match(
    html,
    /Real-world tasks demand more than interface interaction/,
  );
  assert.match(html, /without becoming a narrow GUI-only model/);
  assert.doesNotMatch(html, /Δ vs\. base|相对基础模型/);
  assert.match(html, /Foundational reasoning/);
  assert.match(html, /Broader agentic work/);
  assert.match(html, /UI-Venus 30B-A3B/);
  assert.match(html, /GUI-Owl 32B/);
  assert.match(html, /OpenCUA-72B/);
  assert.match(html, /BrowseComp \(BC\)/);
  assert.match(html, /BrowseComp-ZH \(BC-ZH\)/);
  assert.match(html, /deep-research retrieval on BrowseComp \(BC\)/);
  assert.match(html, /Qwen3\.5-27B/);
  assert.doesNotMatch(html, />27B base<|>27B 基础模型</);
  assert.doesNotMatch(
    html,
    /Every chart uses a 0–100 scale|compare models within each benchmark/,
  );
  assert.doesNotMatch(html, /Built as a system, not just a model/);
  assert.doesNotMatch(
    html,
    /codex-preview|Building your site|SkeletonPreview|Website source|TECHNICAL REPORT · PREVIEW|class=["']hero-scope["']/i,
  );
  assert.doesNotMatch(html, /USER CONTROL|RESOURCES/);
  assert.doesNotMatch(
    html,
    /A concise, application-first technical report website/,
  );
  assert.match(
    html,
    /href=["']\/Qwen-UI-Agent-Technical-Report\.pdf["']/,
  );
  assert.match(html, /target=["']_blank["']/);
  assert.match(html, /rel=["']noopener noreferrer["']/);
  assert.doesNotMatch(html, /Coming soon|即将发布/);

  const technicalReport = await stat(
    new URL(
      "../public/Qwen-UI-Agent-Technical-Report.pdf",
      import.meta.url,
    ),
  );
  assert.ok(technicalReport.size > 0);
});

test("includes publication sections, performance evidence, demos, and language controls", async () => {
  const response = await render();
  const html = await response.text();
  const siteContent = await readFile(
    new URL("../app/siteContent.ts", import.meta.url),
    "utf8",
  );

  for (const id of ["applications", "performance", "demos", "citation"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.doesNotMatch(html, /id=["']general["']/);
  assert.doesNotMatch(html, /id=["']system["']/);
  assert.doesNotMatch(html, /href=["']#general["']/);
  assert.doesNotMatch(html, /href=["']#system["']/);

  const performanceIndex = html.indexOf('id="performance"');
  const broaderCapabilitiesIndex = html.indexOf("Broader Capabilities");
  const demosIndex = html.indexOf('id="demos"');
  const applicationsIndex = html.indexOf('id="applications"');
  const citationIndex = html.indexOf('id="citation"');
  assert.ok(applicationsIndex < performanceIndex);
  assert.ok(performanceIndex < broaderCapabilitiesIndex);
  assert.ok(broaderCapabilitiesIndex < demosIndex);
  assert.ok(performanceIndex < demosIndex);
  assert.ok(demosIndex < citationIndex);

  const capabilityTabs =
    html.match(/class=["']capability-tab["']/g) ?? [];
  assert.equal(capabilityTabs.length, 6);
  assert.match(html, /role=["']tablist["']/);
  assert.match(html, /role=["']tabpanel["']/);
  assert.match(
    html,
    /aria-label=["']Qwen-UI-Agent capabilities["']/,
  );
  assert.match(html, /aria-label=["']Show previous capability["']/);
  assert.match(html, /aria-label=["']Show next capability["']/);
  assert.doesNotMatch(html, /class=["'][^"']*\bapplication-steps\b/);
  assert.doesNotMatch(html, /class=["'][^"']*\bapplication-stat\b/);

  const threeColumnGrids =
    html.match(/data-desktop-columns=["']3["']/g) ?? [];
  assert.equal(threeColumnGrids.length, 1);

  for (const category of ["mobile", "computer", "browser"]) {
    assert.match(
      html,
      new RegExp(`id=["']task-performance-tab-${category}["']`),
    );
    assert.match(
      html,
      new RegExp(`id=["']task-performance-panel-${category}["']`),
    );
  }
  assert.doesNotMatch(html, /task-performance-(?:tab|panel)-research/);
  const taskPerformanceMarkup = html.slice(
    html.indexOf('class="task-performance-tabs"'),
    html.indexOf("GUI Grounding"),
  );
  assert.doesNotMatch(taskPerformanceMarkup, /BrowseComp(?:-ZH)?/);
  const taskTabsMarkup =
    html.match(
      /class=["']task-performance-tabs["'][\s\S]*?<\/div>/,
    )?.[0] ?? "";
  assert.equal(
    (taskTabsMarkup.match(/role=["']tab["']/g) ?? []).length,
    3,
  );
  assert.doesNotMatch(taskTabsMarkup, /<small>/);
  assert.match(html, /End-to-end performance by task type/);
  assert.match(html, /data-card-count=["']3["']/);
  assert.match(html, /data-card-count=["']2["']/);
  assert.match(html, /data-card-count=["']1["']/);

  const exactTaskResults = [
    {
      id: "mobileworld",
      nextId: "mobileworld-real",
      entries: [
        ["Qwen-UI-Agent 27B", "82.1"],
        ["Seed 2.1 Pro", "73.2"],
        ["GPT-5.6 Sol", "70.1"],
        ["Claude Opus 4.8", "67.5"],
        ["Qwen 3.7 Plus", "62.3"],
        ["Gemini 3.1 Pro", "58.1"],
      ],
    },
    {
      id: "mobileworld-real",
      nextId: "android-daily",
      entries: [
        ["Qwen-UI-Agent 27B", "92.2"],
        ["Seed 2.1 Pro", "88.7"],
        ["Gemini 3.1 Pro", "86.2"],
        ["GPT-5.6 Sol", "85.4"],
        ["Claude Opus 4.8", "84.7"],
        ["Qwen 3.7 Plus", "72.7"],
      ],
    },
    {
      id: "android-daily",
      nextId: "osworld-verified",
      entries: [
        ["Qwen-UI-Agent 27B", "97.5"],
        ["Seed 2.1 Pro", "95.2"],
        ["Gemini 3.1 Pro", "93.8"],
        ["Claude Opus 4.8", "93.0"],
        ["GPT-5.6 Sol", "92.6"],
        ["Qwen 3.7 Plus", "79.8"],
      ],
    },
    {
      id: "osworld-verified",
      nextId: "osworld-v2",
      entries: [
        ["Qwen-UI-Agent 27B", "79.5"],
        ["Claude Opus 4.8", "83.4"],
        ["Seed 2.1 Pro", "78.8"],
        ["GPT-5.5", "78.7"],
        ["Gemini 3.1 Pro", "76.2"],
        ["Qwen 3.7 Plus", "73.3"],
      ],
    },
    {
      id: "osworld-v2",
      nextId: "webarena",
      entries: [
        ["Qwen-UI-Agent 27B", "40.0"],
        ["Claude Opus 4.8", "54.8"],
        ["GPT-5.5", "49.5"],
        ["MiniMax M3", "22.3"],
        ["Kimi K2.6", "22.1"],
        ["Qwen 3.7 Plus", "21.5"],
      ],
    },
    {
      id: "webarena",
      nextId: "ssp-native",
      entries: [
        ["Qwen-UI-Agent 27B", "73.6"],
        ["Claude Opus 4.8", "71.9"],
        ["GPT-5.5", "69.5"],
        ["Gemini 3.1 Pro", "65.3"],
        ["Qwen 3.7 Plus", "59.0"],
        ["GUI-Owl-1.5 32B", "48.4"],
      ],
    },
  ];
  for (const benchmark of exactTaskResults) {
    const start = siteContent.indexOf(`id: "${benchmark.id}"`);
    const end = siteContent.indexOf(`id: "${benchmark.nextId}"`, start);
    const block = siteContent.slice(start, end);
    assert.ok(start >= 0 && end > start);
    assert.equal((block.match(/\bname:/g) ?? []).length, 6);
    let previousIndex = -1;
    for (const [name, value] of benchmark.entries) {
      const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const entryIndex = block.search(
        new RegExp(
          `name: "${escapedName}"[\\s\\S]{0,80}value: ${value.replace(".", "\\.")}`,
        ),
      );
      assert.ok(entryIndex > previousIndex);
      previousIndex = entryIndex;
    }
  }

  for (const result of [
    "92.2",
    "97.5",
    "82.1",
    "79.5",
    "40.0",
    "73.6",
    "81.5",
    "76.6",
    "92.6",
    "70.0",
    "70.1",
    "67.5",
    "50.1",
    "44.2",
    "64.1",
    "75.0",
  ]) {
    assert.match(html, new RegExp(result.replace(".", "\\.")));
  }

  const groundingModelsBlock = siteContent.slice(
    siteContent.indexOf("export const GROUNDING_MODELS"),
    siteContent.indexOf("export const GROUNDING_BENCHMARKS"),
  );
  for (const [model, scores] of [
    ["Qwen-UI-Agent 27B", ["76.6", "81.5", "97.5", "92.6", "78.5", "70.0"]],
    ["Seed 2.1 Pro", ["65.3", "80.7", "96.6", "90.9", "78.0", "62.0"]],
    ["Qwen 3.7 Plus", ["68.9", "79.0", "96.6", "90.5", "78.2", "68.0"]],
    ["GUI-Owl-1.5 32B", ["72.9", "80.3", "95.3", "86.8", "69.7"]],
    [
      "UI-Venus-1.5 30B-A3B",
      ["69.6", "74.8", "96.2", "88.6", "70.6", "54.7"],
    ],
    ["MAI-UI-32B", ["67.9", "73.5", "96.5", "91.3", "75.0", "47.1"]],
  ]) {
    const modelStart = groundingModelsBlock.indexOf(`name: "${model}"`);
    assert.ok(modelStart >= 0);
    const nextModel = groundingModelsBlock.indexOf("\n  {", modelStart + 10);
    const modelBlock = groundingModelsBlock.slice(
      modelStart,
      nextModel >= 0 ? nextModel : undefined,
    );
    for (const score of scores) {
      assert.match(
        modelBlock,
        new RegExp(`:\\s*${score.replace(".", "\\.")}(?:,|\\n)`),
      );
    }
  }

  const performanceCards =
    html.match(
      /<article class=["']performance-card(?:\s[^"']*)?["']/g,
    ) ?? [];
  const performanceCardLegends =
    html.match(/class=["']performance-card-legend["']/g) ?? [];
  assert.equal(performanceCardLegends.length, performanceCards.length);
  assert.ok(performanceCardLegends.length > 0);
  assert.doesNotMatch(html, /class=["']performance-legend["']/);

  assert.match(html, /id=["']grounding-result-note["']/);
  assert.match(html, /ScreenSpot-Pro · No zoom/);
  assert.match(html, /ScreenSpot-Pro · Zoom-in/);
  assert.match(html, /SS-V2/);
  assert.match(html, /MM-GUI-L2/);
  assert.match(html, /OSW-G-R/);
  assert.match(html, /UI-Vision/);
  assert.match(html, /Author-reproduced result/);
  assert.doesNotMatch(
    html,
    /The technical report marks the same status|this page uses †/,
  );
  assert.match(
    html,
    /aria-describedby=["']grounding-result-note["']/,
  );

  assert.match(html, /aria-label=["']Primary navigation["']/);
  assert.match(html, /href=["']#main-content["']/);
  assert.match(html, /aria-pressed=["']true["'][^>]*>EN</);
  assert.match(html, />中文<\/button>/);
  assert.match(html, /href=["']\/mobileworld-real\/["']/);
  assert.match(html, /REAL-DEVICE MOBILE GUI USE/);
  assert.match(html, /LONG-HORIZON COMPUTER USE/);
  assert.match(html, /GUI-Only Success rate/);
  assert.match(html, /Learn about this benchmark/);
  assert.match(html, /Qwen-UI-Agent/);
  assert.doesNotMatch(html, /Qwen-UI-Agent 27B/);
  assert.doesNotMatch(html, /Ours 27B/);
  for (const organization of [
    "ByteDance Seed",
    "Google",
    "OpenAI",
    "Anthropic",
  ]) {
    assert.match(html, new RegExp(organization));
  }
  assert.match(html, /<small>Alibaba<\/small>/);
  for (const model of [
    "GUI-Owl-1.5 32B-Instruct",
    "GUI-Owl-1.5 32B",
  ]) {
    const escapedModel = model.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(
      siteContent,
      new RegExp(
        `"${escapedModel}":\\s*\\{[\\s\\S]{0,140}logo:\\s*"/brand-logos/qwen\\.svg"`,
      ),
    );
    assert.doesNotMatch(
      siteContent,
      new RegExp(
        `"${escapedModel}":\\s*\\{[\\s\\S]{0,140}logo:\\s*"/brand-logos/alibaba\\.svg"`,
      ),
    );
  }
  for (const logo of [
    "qwen.svg",
    "bytedance.svg",
    "gemini-user.webp",
    "openai.svg",
    "anthropic-user.webp",
    "kimi.svg",
    "minimax.svg",
    "antgroup.svg",
  ]) {
    assert.match(html, new RegExp(`brand-logos/${logo.replace(".", "\\.")}`));
  }
  assert.doesNotMatch(
    html,
    /409 tasks · 104 live apps · 7 domains|117 tasks · matched 50-step budget|361 real desktop tasks · second overall/,
  );
  for (const category of [
    "Real-device Mobile Use",
    "Computer Use",
    "Cross-device GUI Use",
    "Mobile Use \\+ Deep Research",
    "Proactive Service",
  ]) {
    assert.match(html, new RegExp(category));
  }
  assert.match(html, /class=["']section-title["']>DEMOS</);
  assert.match(html, /class=["']section-icon-solid["']/);
  assert.doesNotMatch(html, /INTERACTION DEMOS|NOW SHOWING/);
  assert.match(html, /Choose a demo domain/);
  assert.match(html, /Available workflows/);
  assert.match(html, /05[\s\S]{0,80}domains/);
  assert.match(html, /Demo case[\s\S]{0,40}01[\s\S]{0,30}\/[\s\S]{0,30}05/);
  assert.doesNotMatch(html, /Selected workflow|当前工作流/);
  assert.doesNotMatch(html, /class=["']demo-workflow-total["']/);
  assert.doesNotMatch(
    html,
    /class=["']demo-stage-meta["'][\s\S]{0,160}<span/,
  );
  assert.match(html, /class=["']demo-workflow-selector["']/);
  assert.match(html, /class=["']demo-task-instruction["']/);
  assert.match(
    html,
    /Task instruction \(translated from Chinese\)/,
  );
  assert.match(
    html,
    /Swipe horizontally to compare all models/,
  );
  const demoDomainButtons =
    html.match(/class=["'][^"']*\bdemo-category-button\b[^"']*["']/g) ??
    [];
  assert.equal(demoDomainButtons.length, 5);
  const demoDomainCounts =
    html.match(/class=["']demo-domain-count["']/g) ?? [];
  assert.equal(demoDomainCounts.length, 0);
  const initialWorkflowButtons =
    html.match(/class=["'][^"']*\bavailability-[^"']+["']/g) ?? [];
  assert.equal(initialWorkflowButtons.length, 5);
  for (const demo of [
    "Recipe research \\+ e-shopping",
    "Hotel search \\+ map verification",
    "Local discovery \\+ review synthesis",
    "Train planning \\+ meeting scheduling",
    "Housing search \\+ commute comparison",
  ]) {
    assert.match(html, new RegExp(demo));
  }
  for (const media of [
    "mobile-gui-shopping",
    "mobile-gui-travel-hotel",
    "mobile-gui-cafe-research",
    "mobile-gui-train-meeting",
    "mobile-gui-housing-commute",
  ]) {
    assert.match(siteContent, new RegExp(`${media}-hd\\.mp4`));
    assert.match(siteContent, new RegExp(`${media}-poster\\.jpg`));
  }
  assert.doesNotMatch(
    siteContent,
    /BV1tE3z6XEPm|BV1tE3z6XEge|BV1D33z6tE1M/,
  );
  assert.match(siteContent, /frameAspectRatio:\s*"2442 \/ 1120"/);
  assert.match(siteContent, /frameAspectRatio:\s*"1920 \/ 880"/);
  assert.match(siteContent, /frameAspectRatio:\s*"1920 \/ 940"/);
  assert.match(siteContent, /containMedia:\s*true/);
  assert.match(html, /Recipe research \+ e-shopping/);
  assert.match(siteContent, /攻略查询 \+ 电商购物/);
  assert.match(html, /passion-fruit sour-soup beef/);
  assert.match(
    siteContent,
    /我今天晚上准备做“百香果酸汤牛肉”/,
  );
  assert.match(siteContent, /下周五去杭州玩/);
  assert.match(siteContent, /我今天约了朋友去天目里喝咖啡/);
  assert.match(siteContent, /出差归来项目同步/);
  assert.match(siteContent, /月租 \+ 通勤时间 × 2 元\/分钟/);
  for (const media of [
    "computer-use-home-office-hd.mp4",
    "computer-use-google-growth-hd.mp4",
  ]) {
    assert.match(siteContent, new RegExp(media.replace(".", "\\.")));
  }
  assert.match(siteContent, /Home-office setup \+ scaled layout/);
  assert.match(siteContent, /Google growth analysis \+ deliverables/);
  assert.match(siteContent, /Build a Google growth analysis report/);
  assert.match(siteContent, /构建 Google 的增长分析报告/);
  assert.equal(
    (
      siteContent.match(
        /Batched actions · Coordinated CLI \+ GUI execution/g,
      ) ?? []
    ).length,
    2,
  );
  assert.equal(
    (
      siteContent.match(
        /Batched actions · CLI 与 GUI 协同执行/g,
      ) ?? []
    ).length,
    2,
  );
  assert.match(siteContent, /120 厘米宽、60 厘米长的书桌/);
  assert.match(siteContent, /名为“Google Growth Analysis”的文件夹/);
  assert.doesNotMatch(
    siteContent,
    /full-resolution source remains outside the site|Local 30s preview/,
  );
  for (const bvid of ["BV1mt3C6AEJm", "BV1Kb3C6YEQo"]) {
    assert.match(
      siteContent,
      new RegExp(
        `player\\.bilibili\\.com/player\\.html\\?bvid=${bvid}[\\s\\S]*?high_quality=1`,
      ),
    );
    assert.match(
      siteContent,
      new RegExp(`bilibili\\.com/video/${bvid}/`),
    );
  }
  assert.match(siteContent, /Weight-loss fact-check → Douyin comment/);
  assert.match(siteContent, /World Cup comeback → RedNote/);
  assert.match(siteContent, /discussing evidence-based weight loss/);
  assert.match(siteContent, /本届世界杯淘汰赛中/);
  for (const bvid of ["BV1cx326wE3H"]) {
    assert.match(
      siteContent,
      new RegExp(
        `player\\.bilibili\\.com/player\\.html\\?bvid=${bvid}[\\s\\S]*?high_quality=1`,
      ),
    );
    assert.match(
      siteContent,
      new RegExp(`bilibili\\.com/video/${bvid}/`),
    );
  }
  assert.doesNotMatch(siteContent, /BV1Z8326tEdi/);
  assert.match(
    siteContent,
    /cross-device-mobile-receipts-pc-hd\.mp4/,
  );
  assert.match(
    siteContent,
    /cross-device-mobile-receipts-pc-poster\.jpg/,
  );
  const reviewExporter = await readFile(
    new URL("../scripts/export-self-contained.mjs", import.meta.url),
    "utf8",
  );
  assert.match(
    reviewExporter,
    /cross-device-mobile-receipts-pc-hd\.mp4/,
  );
  assert.match(reviewExporter, /scale=w=if\(gt\(iw/);
  const receiptsVideo = await stat(
    new URL(
      "../public/demos/source/cross-device-mobile-receipts-pc-hd.mp4",
      import.meta.url,
    ),
  );
  assert.ok(receiptsVideo.size < 60 * 1024 * 1024);
  assert.match(siteContent, /Mobile receipts → PC expense report/);
  assert.match(siteContent, /Mobile restaurant search → PC summary/);
  assert.match(siteContent, /远程桌面上的 receipts 文件夹/);
  assert.match(siteContent, /大众点评、高德地图扫街榜和美团/);
  assert.doesNotMatch(
    siteContent,
    /id:\s*"mobile-deep-research-team-slot"|id:\s*"deep-research"|zm6F0vo2E64/,
  );
  assert.equal(
    (siteContent.match(/instructionSourceLanguage:\s*"(?:en|zh)"/g) ?? [])
      .length,
    13,
  );
  for (const media of [
    "proactive-flight-recovery-hd.mp4",
    "proactive-flight-recovery-poster.jpg",
    "proactive-morning-brief-hd.mp4",
    "proactive-morning-brief-poster.jpg",
  ]) {
    assert.match(siteContent, new RegExp(media.replace(".", "\\.")));
  }
  assert.match(siteContent, /Cancelled flight → alternatives/);
  assert.match(siteContent, /Morning commute brief/);
  assert.match(siteContent, /14:00 CTO presentation/);
  assert.match(siteContent, /勾庄佳苑到阿里巴巴云谷园区/);
  assert.doesNotMatch(siteContent, /id:\s*"browser-team-slot"/);
  assert.doesNotMatch(siteContent, /id:\s*"browser-use"/);
  assert.doesNotMatch(html, /Mobile task format|GUI-only mobile/);
  assert.doesNotMatch(html, /EDIT ONCE|app\/siteContent\.ts → DEMO_VIDEOS/);
  assert.match(html, /class=["']section-title["']>WHAT IT CAN DO</);
  assert.match(html, /class=["']section-title["']>PERFORMANCE</);
});

test("keeps key Chinese interface labels fully localized", async () => {
  const siteContent = await readFile(
    new URL("../app/siteContent.ts", import.meta.url),
    "utf8",
  );
  const reportPage = await readFile(
    new URL("../app/components/ReportPage.tsx", import.meta.url),
    "utf8",
  );
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  for (const label of [
    "电脑操作",
    "电脑 GUI 操作",
    "移动 GUI 操作",
    "深度研究 + GUI 执行",
    "电脑 GUI + CLI 协同",
    "网页浏览器操作",
    "长程电脑操作",
    "手机真机 GUI 操作",
    "跨设备 GUI 操作",
  ]) {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    assert.match(siteContent, new RegExp(`zh:\\s*"${escaped}"`));
  }
  assert.match(siteContent, /zh:\s*"[^"]*深度研究[^"]*"/);
  assert.match(siteContent, /深度研究 \+ GUI 执行/);
  assert.match(siteContent, /主动服务/);
  assert.match(siteContent, /监测设备通知/);
  assert.match(
    siteContent,
    /面向真实图形交互界面，帮你把工作真正搞定/,
  );
  assert.match(
    siteContent,
    /覆盖真实手机、电脑和网页浏览器，并具备深度研究能力/,
  );
  assert.match(siteContent, /demosEyebrow:\s*"演示"/);
  assert.doesNotMatch(siteContent, /demosEyebrow:\s*"交互演示"/);
  for (const caseTitle of [
    "带时间与预算约束的机场用车",
    "在 Excel 中更新销售报告",
    "完成一份出差报销对账",
    "查询 Alphabet 最新增长报告",
    "调研团队晚餐，并准备订位",
    "主动处理航班取消",
  ]) {
    assert.match(siteContent, new RegExp(caseTitle));
  }
  assert.match(reportPage, /任务指令/);
  assert.match(reportPage, /translated from Chinese/);
  assert.match(reportPage, /翻译自英文指令/);
  assert.match(
    reportPage,
    /activeDemo\.instructionSourceLanguage === language/,
  );
  assert.match(reportPage, /查询航空公司实时余票/);
  assert.match(reportPage, /reconcile_trip\.py/);
  assert.match(reportPage, /公司卡账单/);
  assert.match(reportPage, /Trip_Claim\.xlsx/);
  assert.match(reportPage, /尚未提交报销/);
  assert.match(siteContent, /在 Google Maps 中选中/);
  assert.match(siteContent, /打开订位页面/);
  assert.match(reportPage, /电脑 GUI · Google Maps/);
  assert.match(reportPage, /maps\.google\.com/);
  assert.match(reportPage, /预订餐桌/);
  assert.match(reportPage, /等待审核 · 尚未订位/);
  assert.match(reportPage, /language === "zh"/);
  assert.match(reportPage, /defaultPlaybackRate = 1/);
  assert.match(
    reportPage,
    /activeDemo\.group === "real-device-mobile" \? 1\.5 : 1/,
  );
  assert.match(reportPage, /onLoadedMetadata/);
  assert.match(reportPage, /scrollIntoView/);
  assert.match(reportPage, /左右滑动查看全部模型/);
  assert.match(
    siteContent,
    /覆盖工具调用、终端任务、多轮服务、深度检索与编码工作流等智能体能力/,
  );
  for (const [benchmark, base, ours, uiVenus, guiOwl, openCUA] of [
    ["MMMU-Pro", "73.5", "72.4", "32.4", "39.5", "31.0"],
    ["RealWorldQA", "83.1", "83.1", "75.3", "76.7", "66.4"],
    ["CharXiv-RQ", "76.8", "77.7", "44.7", "50.9", "39.6"],
    ["MathVision", "82.0", "82.8", "36.8", "50.6", "26.6"],
    ["AI2D_TEST", "91.9", "91.1", "84.3", "84.8", "78.9"],
    ["MMLU-Pro", "86.0", "86.5", "65.6", "73.9", "58.8"],
    [
      "IFEval (prompt-level strict)",
      "90.4",
      "90.2",
      "81.3",
      "84.5",
      "70.6",
    ],
    ["Tau2-Bench", "89.2", "89.9", "22.7", "6.1", "14.4"],
    ["Terminal-Bench 2.0 · Avg 5", "41.1", "50.1", "3.2", "0.0", "9.0"],
    ["Claw-Eval · Avg 3", "66.9", "73.5", "30.6", "29.6", "26.4"],
    ["Claw-Eval · Pass@3", "41.2", "51.8", "5.5", "5.5", "0.5"],
    ["BFCL-v4", "71.3", "74.2", "19.8", "32.7", "28.3"],
    ["SkillsBench · Avg 5", "24.9", "28.0", "0.5", "0.3", "0.0"],
    ["QwenClawBench · Avg 3", "48.5", "44.2", "6.4", "5.1", "11.4"],
  ]) {
    const escapedBenchmark = benchmark.replace(
      /[.*+?^${}()|[\]\\]/g,
      "\\$&",
    );
    assert.match(
      siteContent,
      new RegExp(
        `benchmark: "${escapedBenchmark}"[\\s\\S]{0,260}base: ${base.replace(".", "\\.")}[\\s\\S]{0,80}ours: ${ours.replace(".", "\\.")}[\\s\\S]{0,180}uiVenus: ${uiVenus.replace(".", "\\.")}[\\s\\S]{0,80}guiOwl: ${guiOwl.replace(".", "\\.")}[\\s\\S]{0,80}openCUA: ${openCUA.replace(".", "\\.")}`,
      ),
    );
  }
  assert.match(
    siteContent,
    /benchmark: "BrowseComp \(BC\)"[\s\S]{0,120}base: 61\.0[\s\S]{0,80}ours: 64\.1[\s\S]{0,80}specialists: \{\}/,
  );
  assert.match(
    siteContent,
    /benchmark: "BrowseComp-ZH \(BC-ZH\)"[\s\S]{0,120}base: 62\.1[\s\S]{0,80}ours: 75\.0[\s\S]{0,80}specialists: \{\}/,
  );
  const benchmarkHeaderIndex = reportPage.indexOf(
    '<th scope="col">{copy.benchmarkColumn}</th>',
  );
  const oursHeaderIndex = reportPage.indexOf(
    '<th className="ours-column" scope="col">',
    benchmarkHeaderIndex,
  );
  const baseHeaderIndex = reportPage.indexOf(
    '<th scope="col">{copy.baseColumn}</th>',
    oursHeaderIndex,
  );
  assert.ok(benchmarkHeaderIndex < oursHeaderIndex);
  assert.ok(oursHeaderIndex < baseHeaderIndex);
  assert.match(
    styles,
    /\.general-ledger-grid\s*\{[\s\S]{0,100}align-items:\s*stretch/,
  );
  assert.match(
    styles,
    /\.capability-table\s*\{[\s\S]{0,100}height:\s*100%/,
  );
  assert.match(styles, /mobile-case-search-phone/);
  assert.match(
    styles,
    /broader-capabilities-intro\s*\{[\s\S]{0,140}font-size:\s*clamp\(18px,\s*1\.35vw,\s*20px\)/,
  );
  assert.match(reportPage, /function getPerformanceScale/);
  assert.match(
    siteContent,
    /id: "osworld-v2"[\s\S]{0,260}axisRange: \{ min: 0, max: 60 \}/,
  );
  for (const [metric, min, max] of [
    ["ssp-native", 60, 80],
    ["ssp-zoom", 65, 85],
    ["ssv2", 90, 100],
    ["mmbench-l2", 80, 100],
    ["osworld-g", 65, 85],
    ["ui-vision", 40, 80],
  ]) {
    assert.match(
      siteContent,
      new RegExp(
        `id: "${metric}"[\\s\\S]{0,180}axisRange: \\{ min: ${min}, max: ${max} \\}`,
      ),
    );
  }
  assert.match(reportPage, /className="performance-axis"/);
  assert.match(reportPage, /className="performance-axis-range"/);
  assert.match(reportPage, /"--plot-score": plotScore/);
  assert.match(reportPage, /function formatChartModelName/);
  assert.match(styles, /calc\(var\(--plot-score\) \* 1%\)/);
  assert.match(
    styles,
    /\.grounding-performance-grid \.performance-columns\s*\{[\s\S]{0,160}--performance-label-space:\s*140px/,
  );
  assert.match(siteContent, /oursColumn:\s*"Qwen-UI-Agent"/);
  assert.match(
    styles,
    /var\(--demo-domain-count,\s*5\)[\s\S]{0,80}minmax\(0,\s*1fr\)/,
  );
  assert.match(
    styles,
    /@media \(max-width:\s*900px\)[\s\S]*?grid-template-columns:\s*repeat\(6,\s*minmax\(0,\s*1fr\)\)/,
  );
  assert.match(
    styles,
    /@media \(max-width:\s*620px\)[\s\S]*?\.demo-category-strip\s*\{[\s\S]*?grid-template-columns:\s*1fr/,
  );
  assert.match(styles, /\.demo-stage\s*\{\s*scroll-margin-top:\s*72px/);
  assert.doesNotMatch(reportPage, /handleCapabilityPointer/);
  assert.doesNotMatch(reportPage, /capabilityDragStart/);
  assert.doesNotMatch(siteContent, /所有图表统一采用 0–100 纵轴/);
  assert.doesNotMatch(
    reportPage,
    /PROTOCOL NOTES|copy\.performanceFootnote/,
  );
  assert.doesNotMatch(
    siteContent,
    /Values follow the active tables|数值来自最新版草稿实际启用的表格/,
  );
  assert.doesNotMatch(
    reportPage,
    /capabilities\/(?:proactive-notifications|proactive-options|research-multiapp)\.webp/,
  );
});

test("renders the bilingual MobileWorld-Real benchmark page", async () => {
  const response = await render("/mobileworld-real/");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>MobileWorld-Real — Qwen-UI-Agent<\/title>/i);
  assert.match(
    html,
    /A real-device benchmark for everyday mobile GUI work/,
  );
  assert.match(html, /Human-written end-to-end tasks/);
  assert.match(html, /Tasks and trajectories excluded from training/);
  assert.match(html, /We develop an agent system named AutoJudge/);
  assert.doesNotMatch(html, /Auto Judge/);
  assert.doesNotMatch(html, /Five independent VLM judges/);
  assert.doesNotMatch(html, /92\.2% success/);
  assert.doesNotMatch(html, /Open full figure/);
  assert.match(html, /report\/mobileworld-real-profile\.webp/);
  assert.match(
    html,
    /mobileworld-real-profile\.webp["'][^>]*width=["']3200["'][^>]*height=["']2469["']/,
  );
  assert.match(html, /Back to home/);
  assert.doesNotMatch(html, /Back to Performance/);
  assert.doesNotMatch(
    html,
    /MobileWorld-Real · Real-device mobile GUI benchmark/,
  );
  assert.match(html, />中文<\/button>/);
});
