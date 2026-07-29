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

console.log(
  `Validated ${htmlFiles.length} exported HTML files for GitHub Pages at ${basePath}.`,
);
