export const SITE_BASE_PATH =
  process.env.NEXT_PUBLIC_SITE_BASE_PATH?.replace(/\/+$/, "") ?? "";

export const PUBLIC_SITE_URL =
  "https://tongyi-mai.github.io/Qwen-UI-Agent/";

export function siteAsset(path: string): string;
export function siteAsset(path: undefined): undefined;
export function siteAsset(path: string | undefined): string | undefined;
export function siteAsset(path: string | undefined): string | undefined {
  if (
    !path ||
    !path.startsWith("/") ||
    path.startsWith("//") ||
    !SITE_BASE_PATH ||
    path === SITE_BASE_PATH ||
    path.startsWith(`${SITE_BASE_PATH}/`)
  ) {
    return path;
  }

  return `${SITE_BASE_PATH}${path}`;
}

export function absoluteSiteUrl(path = "") {
  return new URL(path.replace(/^\/+/, ""), PUBLIC_SITE_URL).toString();
}
