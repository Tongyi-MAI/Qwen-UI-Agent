import type { Metadata, Viewport } from "next";
import "./globals.css";
import {
  PUBLIC_SITE_URL,
  absoluteSiteUrl,
} from "./sitePath";

export const metadata: Metadata = {
  metadataBase: new URL(PUBLIC_SITE_URL),
  title: "Qwen-UI-Agent — Technical Report",
  description:
    "Qwen-UI-Agent is Alibaba's next-generation real-world-centric GUI agent for mobile, computer use, web browsers, and cross-platform workflows.",
  applicationName: "Qwen-UI-Agent",
  keywords: [
    "Qwen",
    "UI Agent",
    "GUI Agent",
    "Multimodal Agent",
    "Technical Report",
  ],
  authors: [{ name: "MAI-UI Team" }],
  alternates: {
    canonical: PUBLIC_SITE_URL,
  },
  icons: {
    icon: absoluteSiteUrl("favicon.png"),
    shortcut: absoluteSiteUrl("favicon.png"),
    apple: absoluteSiteUrl("apple-touch-icon.png"),
  },
  openGraph: {
    type: "website",
    url: PUBLIC_SITE_URL,
    siteName: "Qwen-UI-Agent",
    title: "Qwen-UI-Agent — Technical Report",
    description:
      "Alibaba's next-generation real-world-centric GUI agent, built for reliable real-phone and computer-use workflows.",
    images: [
      {
        url: absoluteSiteUrl("og.png"),
        width: 1536,
        height: 1024,
        alt: "Qwen-UI-Agent technical report preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qwen-UI-Agent — Technical Report",
    description:
      "Alibaba's next-generation real-world-centric GUI agent, built for reliable real-phone and computer-use workflows.",
    images: [absoluteSiteUrl("og.png")],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
