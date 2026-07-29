import type { Metadata } from "next";
import { MobileWorldRealPage } from "../components/MobileWorldRealPage";

export const metadata: Metadata = {
  title: "MobileWorld-Real — Qwen-UI-Agent",
  description:
    "MobileWorld-Real is a real-device benchmark with human-written mobile tasks across live Android apps, accounts, content, and networks.",
  alternates: {
    canonical: "/mobileworld-real/",
  },
  openGraph: {
    title: "MobileWorld-Real — Qwen-UI-Agent",
    description:
      "A real-device benchmark for everyday mobile GUI work across 409 tasks and 104 live Android apps.",
    url: "/mobileworld-real/",
    images: ["/og.png"],
  },
};

export default function MobileWorldRealRoute() {
  return <MobileWorldRealPage />;
}
