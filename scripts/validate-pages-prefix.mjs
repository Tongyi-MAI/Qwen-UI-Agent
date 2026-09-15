import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("out");
const basePath =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH?.replace(/\/+$/, "") ?? "";

if (!basePath || !basePath.startsWith("/")) {
  throw new Error(
    "NEXT_PUBLIC_SITE_BASE_PATH must be an absolute project path, for example /Qwen-UI-Agent.",
  );
}

async function collectHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        return collectHtmlFiles(entryPath);
      }
      return entry.name.endsWith(".html") ? [entryPath] : [];
    }),
  );

  return files.flat();
}

const htmlFiles = await collectHtmlFiles(outputDir);
const rootLocalAttribute = /\b(?:src|href|poster)=["'](\/[^"']*)["']/g;
const invalidReferences = [];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(rootLocalAttribute)) {
    const reference = match[1];
    if (
      reference.startsWith("//") ||
      reference === basePath ||
      reference.startsWith(`${basePath}/`)
    ) {
      continue;
    }

    invalidReferences.push(
      `${path.relative(outputDir, file)}: ${reference}`,
    );
  }
}

if (invalidReferences.length > 0) {
  throw new Error(
    `Found root-relative URLs that bypass ${basePath}:\n${invalidReferences.join("\n")}`,
  );
}

const homeHtml = await readFile(path.join(outputDir, "index.html"), "utf8");
const benchmarkHtml = await readFile(
  path.join(outputDir, "mobileworld-real", "index.html"),
  "utf8",
);

const requiredHomeReferences = [
  `${basePath}/_next/`,
  `${basePath}/tongyi-mark.png`,
  `${basePath}/brand-logos/`,
  `${basePath}/demos/`,
  `${basePath}/Qwen-UI-Agent-Technical-Report.pdf`,
  `${basePath}/weekly-newspaper/`,
];

for (const reference of requiredHomeReferences) {
  if (!homeHtml.includes(reference)) {
    throw new Error(`The exported home page is missing ${reference}.`);
  }
}

const benchmarkFigure = `${basePath}/report/mobileworld-real-profile.webp`;
if (!benchmarkHtml.includes(benchmarkFigure)) {
  throw new Error(
    `The exported MobileWorld-Real page is missing ${benchmarkFigure}.`,
  );
}

const newspaperIssue19Html = await readFile(
  path.join(outputDir, "weekly-newspaper", "issue-19", "index.html"),
  "utf8",
);

const newspaperIssue20Html = await readFile(
  path.join(outputDir, "weekly-newspaper", "issue-20", "index.html"),
  "utf8",
);

const newspaperIssue21Html = await readFile(
  path.join(outputDir, "weekly-newspaper", "issue-21", "index.html"),
  "utf8",
);

const newspaperIssue22Html = await readFile(
  path.join(outputDir, "weekly-newspaper", "issue-22", "index.html"),
  "utf8",
);

const newspaperIssue23Html = await readFile(
  path.join(outputDir, "weekly-newspaper", "issue-23", "index.html"),
  "utf8",
);

const latestNewspaperHtml = await readFile(
  path.join(outputDir, "weekly-newspaper", "issue-24", "index.html"),
  "utf8",
);

const newspaperArchiveHtml = await readFile(
  path.join(outputDir, "weekly-newspaper", "index.html"),
  "utf8",
);

for (const archiveText of [
  "MAI-UI AI Newspaper · Issue Archive",
  "Browse AI Newspaper Issues",
  "individual newspaper issues are published in Chinese",
  'data-en="ISSUE"',
  ">24</span>",
  ">23</span>",
  ">22</span>",
  ">21</span>",
  ">20</span>",
  ">19</span>",
  "LATEST",
  "2026 年 9 月 7 日—9 月 13 日",
  "./issue-24/",
  "This Week in AI",
  "本周AI进展总结",
  "2026 年 8 月 31 日—9 月 6 日",
  "./issue-23/",
  "2026 年 8 月 24 日—8 月 30 日",
  "./issue-22/",
  "2026 年 8 月 17 日—8 月 22 日",
  "./issue-21/",
  "2026 年 8 月 10 日—8 月 16 日",
  "./issue-20/",
  "./issue-19/",
]) {
  if (!newspaperArchiveHtml.includes(archiveText)) {
    throw new Error(
      `The exported AI Newspaper archive is missing ${archiveText}.`,
    );
  }
}

for (const removedArchiveText of [
  "A weekly view of AI progress through the lens of GUI Agents.",
  "Each issue follows one week of AI progress from a GUI-Agent perspective.",
  "Runtime infrastructure, long-horizon agents, verifiable training, memory, and evaluation harnesses.",
]) {
  if (newspaperArchiveHtml.includes(`>${removedArchiveText}<`)) {
    throw new Error(
      `The exported AI Newspaper archive still renders ${removedArchiveText}.`,
    );
  }
}

if (
  newspaperArchiveHtml.includes("http-equiv=\"refresh\"") ||
  newspaperArchiveHtml.includes("window.location.replace")
) {
  throw new Error(
    "The exported AI Newspaper archive still redirects directly to one issue.",
  );
}

if ((newspaperArchiveHtml.match(/>LATEST<\/span>/g) ?? []).length !== 1) {
  throw new Error(
    "The exported AI Newspaper archive must mark exactly one issue as latest.",
  );
}

if (!newspaperIssue19Html.includes("AI Newspaper · GUI | Agent | RL")) {
  throw new Error("The exported Weekly Newspaper Issue 19 is missing its title.");
}

if (
  !newspaperIssue20Html.includes("AI Newspaper · Issue 20") ||
  !newspaperIssue20Html.includes("联合系统成为 Agent 能力的新标尺") ||
  !newspaperIssue20Html.includes("2026.08.10") ||
  !newspaperIssue20Html.includes("08.16")
) {
  throw new Error(
    "The exported Weekly Newspaper Issue 20 is missing its publication metadata.",
  );
}

if (
  !newspaperIssue21Html.includes("AI Newspaper · Issue 21") ||
  !newspaperIssue21Html.includes(
    "DeepSeek 将单图控制在 384 Tokens 内，GUI Agent 开始重算任务成本",
  ) ||
  !newspaperIssue21Html.includes("2026.08.17") ||
  !newspaperIssue21Html.includes("08.22")
) {
  throw new Error(
    "The exported Weekly Newspaper Issue 21 is missing its publication metadata.",
  );
}

if (
  !newspaperIssue22Html.includes("AI Newspaper · Issue 22") ||
  !newspaperIssue22Html.includes(
    "GLM-5.3-Flash 与 Qwen3.8-Flash-Next 同周发布：开放 Agent 模型转向效率竞争",
  ) ||
  !newspaperIssue22Html.includes("2026.08.24") ||
  !newspaperIssue22Html.includes("08.30")
) {
  throw new Error(
    "The exported Weekly Newspaper Issue 22 is missing its publication metadata.",
  );
}

if (
  !newspaperIssue23Html.includes("AI Newspaper · Issue 23") ||
  !newspaperIssue23Html
    .replace(/<[^>]+>/g, "")
    .includes("GPT-6 Astra 发布：电脑操作提速，跨窗口历史开始可检索") ||
  !newspaperIssue23Html.includes("2026.08.31") ||
  !newspaperIssue23Html.includes("09.06")
) {
  throw new Error(
    "The exported Weekly Newspaper Issue 23 is missing its publication metadata.",
  );
}

if (
  !latestNewspaperHtml.includes("AI Newspaper · Issue 24") ||
  !latestNewspaperHtml.replace(/<[^>]+>/g, "").includes("本周AI进展总结") ||
  !latestNewspaperHtml.includes('datetime="2026-09-07"') ||
  !latestNewspaperHtml.includes('datetime="2026-09-13"')
) {
  throw new Error(
    "The exported Weekly Newspaper Issue 24 is missing its publication metadata.",
  );
}

const latestArchiveCard = newspaperArchiveHtml.match(
  /<a\s+class="issue-card"[\s\S]*?<\/a>/,
)?.[0];
if (
  !latestArchiveCard?.includes('href="./issue-24/"') ||
  !latestArchiveCard.includes('class="latest-badge"')
) {
  throw new Error("Issue 24 must appear first and be marked as latest.");
}

console.log(
  `Validated ${htmlFiles.length} exported HTML files for GitHub Pages at ${basePath}.`,
);
