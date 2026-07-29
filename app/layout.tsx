import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://qwen-ui-agent.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    canonical: "/",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Qwen-UI-Agent",
    title: "Qwen-UI-Agent — Technical Report",
    description:
      "Alibaba's next-generation real-world-centric GUI agent, built for reliable real-phone and computer-use workflows.",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
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
