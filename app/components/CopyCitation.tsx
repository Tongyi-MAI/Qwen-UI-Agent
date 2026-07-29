"use client";

import { useState } from "react";
import type { Language } from "../siteContent";

export function CopyCitation({
  text,
  language,
}: {
  text: string;
  language: Language;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    let succeeded = false;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        succeeded = true;
      }
    } catch {
      // Directly opened file:// pages may not receive Clipboard API access.
    }

    if (!succeeded) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";
      document.body.appendChild(textarea);
      textarea.select();

      try {
        succeeded = document.execCommand("copy");
      } catch {
        succeeded = false;
      } finally {
        textarea.remove();
      }
    }

    setCopied(succeeded);
    if (succeeded) {
      window.setTimeout(() => setCopied(false), 1800);
    }
  }

  return (
    <button className="copy-button" type="button" onClick={copy}>
      <span aria-hidden="true">{copied ? "✓" : "□"}</span>
      {copied
        ? language === "zh"
          ? "已复制"
          : "Copied"
        : language === "zh"
          ? "复制模板"
          : "Copy template"}
    </button>
  );
}
