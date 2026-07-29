import { execFile } from "node:child_process";
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { build } from "vite";

const run = promisify(execFile);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const publicDirectory = path.join(projectDirectory, "public");
const reviewDirectory = path.join(projectDirectory, "review");
const outputHtmlPath = path.join(
  reviewDirectory,
  "Qwen-UI-Agent-style-review.html",
);
const reportPagePath = path.join(
  projectDirectory,
  "app",
  "components",
  "ReportPage.tsx",
);
const siteContentPath = path.join(projectDirectory, "app", "siteContent.ts");
const globalCssPath = path.join(projectDirectory, "app", "globals.css");
const virtualLinkId = "\0qwen-review-link";
const videoPreviewPaths = new Set([
  "/demos/computer-excel-preview.mp4",
  "/demos/cua-google-preview.mp4",
  "/demos/cua-taobao-preview.mp4",
  "/demos/source/computer-use-home-office-hd.mp4",
  "/demos/source/computer-use-google-growth-hd.mp4",
  "/demos/source/proactive-flight-recovery-hd.mp4",
  "/demos/source/proactive-morning-brief-hd.mp4",
  "/demos/source/mobile-gui-shopping-hd.mp4",
  "/demos/source/mobile-gui-travel-hotel-hd.mp4",
  "/demos/source/mobile-gui-cafe-research-hd.mp4",
  "/demos/source/mobile-gui-train-meeting-hd.mp4",
  "/demos/source/mobile-gui-housing-commute-hd.mp4",
  "/demos/source/cross-device-mobile-receipts-pc-hd.mp4",
]);

const MIME_TYPES = new Map([
  [".avif", "image/avif"],
  [".gif", "image/gif"],
  [".ico", "image/x-icon"],
  [".jpeg", "image/jpeg"],
  [".jpg", "image/jpeg"],
  [".m4v", "video/mp4"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".webm", "video/webm"],
  [".webp", "image/webp"],
]);

function escapeInlineScript(source) {
  return source.replace(/<\/script/gi, "<\\/script");
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mimeTypeFor(filePath) {
  const mimeType = MIME_TYPES.get(path.extname(filePath).toLowerCase());
  if (!mimeType) {
    throw new Error(`No MIME type is configured for ${filePath}`);
  }
  return mimeType;
}

async function listPublicAssets(directory = publicDirectory, webPrefix = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const assets = [];

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);
    const webPath = `${webPrefix}/${entry.name}`;

    if (entry.isDirectory()) {
      assets.push(...(await listPublicAssets(filePath, webPath)));
    } else if (MIME_TYPES.has(path.extname(entry.name).toLowerCase())) {
      assets.push({ filePath, webPath });
    }
  }

  return assets;
}

async function encodeDataUri(filePath, mimeType = mimeTypeFor(filePath)) {
  const contents = await readFile(filePath);
  return `data:${mimeType};base64,${contents.toString("base64")}`;
}

async function createCompressedVideo(sourcePath, temporaryDirectory) {
  const outputPath = path.join(
    temporaryDirectory,
    `${path.basename(sourcePath, path.extname(sourcePath))}.mp4`,
  );

  try {
    await run(
      "ffmpeg",
      [
        "-y",
        "-i",
        sourcePath,
        "-vf",
        "scale=w=if(gt(iw\\,ih)\\,960\\,-2):h=if(gt(iw\\,ih)\\,-2\\,960),fps=24",
        "-c:v",
        "libx264",
        "-preset",
        "veryfast",
        "-crf",
        "28",
        "-maxrate",
        "1100k",
        "-bufsize",
        "2200k",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        "-an",
        outputPath,
      ],
      { maxBuffer: 10 * 1024 * 1024 },
    );
    return outputPath;
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    console.warn(
      `Could not make a compact preview for ${path.basename(sourcePath)}; embedding the original (${reason}).`,
    );
    return sourcePath;
  }
}

function standalonePlugin() {
  return {
    name: "qwen-review-standalone",
    enforce: "pre",
    resolveId(source) {
      if (source === "next/link") return virtualLinkId;
      return null;
    },
    load(id) {
      if (id === virtualLinkId) {
        return `
          import React from "react";

          export default function StandaloneLink({ href, children, ...props }) {
            const originalHref = typeof href === "string" ? href : "#";
            const resolvedHref =
              originalHref === "/mobileworld-real/" ||
              originalHref === "/mobileworld-real"
                ? "#performance"
                : originalHref;
            return React.createElement("a", { ...props, href: resolvedHref }, children);
          }
        `;
      }

      return null;
    },
  };
}

async function bundleReviewApplication(temporaryDirectory) {
  const entryPath = path.join(temporaryDirectory, "review-entry.jsx");
  await writeFile(
    entryPath,
    `
      import React from "react";
      import { createRoot } from "react-dom/client";
      import { ReportPage } from ${JSON.stringify(reportPagePath)};
      import * as content from ${JSON.stringify(siteContentPath)};
      import ${JSON.stringify(globalCssPath)};

      const assetMap = globalThis.__QWEN_REVIEW_ASSETS__ || {};
      const visited = new WeakSet();

      function rewriteAssets(value) {
        if (!value || typeof value !== "object" || visited.has(value)) return;
        visited.add(value);

        if (Array.isArray(value)) {
          for (let index = 0; index < value.length; index += 1) {
            const child = value[index];
            if (typeof child === "string" && assetMap[child]) {
              value[index] = assetMap[child];
            } else {
              rewriteAssets(child);
            }
          }
          return;
        }

        for (const key of Object.keys(value)) {
          const child = value[key];
          if (typeof child === "string" && assetMap[child]) {
            value[key] = assetMap[child];
          } else {
            rewriteAssets(child);
          }
        }
      }

      for (const value of Object.values(content)) {
        rewriteAssets(value);
      }

      createRoot(document.getElementById("root")).render(
        React.createElement(ReportPage),
      );
    `,
  );

  const result = await build({
    configFile: false,
    root: projectDirectory,
    logLevel: "warn",
    plugins: [standalonePlugin(), react()],
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.NEXT_PUBLIC_SITE_BASE_PATH": JSON.stringify(""),
    },
    build: {
      target: "es2020",
      minify: "esbuild",
      cssCodeSplit: false,
      write: false,
      lib: {
        entry: entryPath,
        formats: ["iife"],
        name: "QwenUiAgentReview",
      },
    },
  });

  const outputs = Array.isArray(result) ? result.flatMap((item) => item.output) : result.output;
  const javascript = outputs.find(
    (item) => item.type === "chunk" && item.isEntry,
  );
  const stylesheet = outputs.find(
    (item) =>
      item.type === "asset" &&
      typeof item.fileName === "string" &&
      item.fileName.endsWith(".css"),
  );

  if (!javascript || javascript.type !== "chunk") {
    throw new Error("Vite did not produce a standalone JavaScript entry.");
  }
  if (!stylesheet || stylesheet.type !== "asset") {
    throw new Error("Vite did not produce the website stylesheet.");
  }

  return {
    javascript: javascript.code,
    css:
      typeof stylesheet.source === "string"
        ? stylesheet.source
        : Buffer.from(stylesheet.source).toString("utf8"),
  };
}

async function buildAssetMap(javascript, temporaryDirectory) {
  const publicAssets = await listPublicAssets();
  const referencedAssets = publicAssets.filter(({ webPath }) =>
    javascript.includes(webPath),
  );
  const assetMap = {};

  for (const asset of referencedAssets) {
    const sourcePath = videoPreviewPaths.has(asset.webPath)
      ? await createCompressedVideo(asset.filePath, temporaryDirectory)
      : asset.filePath;
    assetMap[asset.webPath] = await encodeDataUri(
      sourcePath,
      videoPreviewPaths.has(asset.webPath)
        ? "video/mp4"
        : mimeTypeFor(asset.filePath),
    );
  }

  return assetMap;
}

async function main() {
  const temporaryDirectory = await mkdtemp(
    path.join(projectDirectory, ".qwen-ui-agent-review-"),
  );

  try {
    const bundle = await bundleReviewApplication(temporaryDirectory);
    const assetMap = await buildAssetMap(
      bundle.javascript,
      temporaryDirectory,
    );
    const brandMark = assetMap["/tongyi-mark.png"];
    const favicon =
      assetMap["/favicon.png"] ??
      assetMap["/tongyi-mark.png"] ??
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E";
    const javascript = brandMark
      ? bundle.javascript.replaceAll("/tongyi-mark.png", brandMark)
      : bundle.javascript;
    const serializedAssets = escapeInlineScript(JSON.stringify(assetMap));
    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Qwen-UI-Agent — Alibaba's next-generation real-world-centric GUI agent."
    />
    <meta name="color-scheme" content="light" />
    <title>Qwen-UI-Agent</title>
    <link rel="icon" href="${escapeHtml(favicon)}" />
    <style>${bundle.css}</style>
  </head>
  <body>
    <div id="root"></div>
    <noscript>This Qwen-UI-Agent review requires JavaScript for language switching and interactive demos.</noscript>
    <script id="qwen-review-assets" type="application/json">${serializedAssets}</script>
    <script>
      globalThis.__QWEN_REVIEW_ASSETS__ = JSON.parse(
        document.getElementById("qwen-review-assets").textContent,
      );
    </script>
    <script>${escapeInlineScript(javascript)}</script>
  </body>
</html>
`;

    if (!html.includes("Built to complete real work across GUI interfaces.")) {
      throw new Error("The updated GUI-interface subtitle is missing.");
    }
    if (!html.includes("阿里巴巴集团的新一代真实场景 GUI 智能体")) {
      throw new Error("The Chinese version is missing from the review bundle.");
    }
    if (html.includes('src="/') || html.includes('poster="/')) {
      throw new Error("The export still contains a local media reference.");
    }
    if (html.includes("/_next/")) {
      throw new Error("The export unexpectedly depends on Next.js output.");
    }

    await mkdir(reviewDirectory, { recursive: true });
    await writeFile(outputHtmlPath, html);

    const outputSize = Buffer.byteLength(html);
    console.log(
      `Created ${path.relative(projectDirectory, outputHtmlPath)} (${(
        outputSize /
        1024 /
        1024
      ).toFixed(1)} MiB).`,
    );
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

await main();
