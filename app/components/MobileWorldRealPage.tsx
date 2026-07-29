"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Language, LocalizedText } from "../siteContent";
import { localize } from "../siteContent";
import { siteAsset } from "../sitePath";

const MOBILEWORLD_REAL_COPY = {
  en: {
    back: "Back to home",
    title: "MobileWorld-Real",
    subtitle: "A real-device benchmark for everyday mobile GUI work.",
    lead:
      "MobileWorld-Real evaluates whether a mobile GUI agent can complete real-life tasks on live Android devices. Human-written requests run across real apps, accounts, content, and networks—where interfaces change, pop-ups interrupt workflows, and information may be missing.",
    figureEyebrow: "BENCHMARK PROFILE",
    figureTitle: "Everyday tasks, evaluated where people actually use them.",
    figureCaption:
      "MobileWorld-Real spans 409 tasks, 104 apps, and seven areas of everyday mobile use. The figure shows representative tasks, difficulty coverage, and the long-tailed app distribution.",
    scrollHint: "Scroll horizontally to inspect the full figure.",
  },
  zh: {
    back: "返回主页",
    title: "MobileWorld-Real",
    subtitle: "面向日常移动 GUI 任务的真机评测基准。",
    lead:
      "MobileWorld-Real 用来检验移动 GUI 智能体能否在真实 Android 设备上完成日常任务。人类编写的请求运行在真实应用、账号、内容和网络中，智能体需要应对界面变化、弹窗打断以及信息缺失等真实情况。",
    figureEyebrow: "基准概览",
    figureTitle: "在用户真正使用手机的环境中评测日常任务。",
    figureCaption:
      "MobileWorld-Real 覆盖 409 个任务、104 个应用和七类日常移动场景。图中展示了代表性任务、难度覆盖和长尾应用分布。",
    scrollHint: "可横向滚动查看完整图片。",
  },
} as const;

const MOBILEWORLD_REAL_STATS: Array<{
  value: string;
  label: LocalizedText;
}> = [
  {
    value: "409",
    label: {
      en: "Human-written end-to-end tasks",
      zh: "人类编写的端到端任务",
    },
  },
  {
    value: "104",
    label: { en: "Live Android apps", zh: "真实 Android 应用" },
  },
  {
    value: "7",
    label: { en: "Everyday-use domains", zh: "日常使用领域" },
  },
  {
    value: "HELD OUT",
    label: {
      en: "Tasks and trajectories excluded from training",
      zh: "任务与轨迹均未用于训练",
    },
  },
];

const MOBILEWORLD_REAL_POINTS: Array<{
  index: string;
  title: LocalizedText;
  body: LocalizedText;
}> = [
  {
    index: "01",
    title: {
      en: "Real apps, real uncertainty.",
      zh: "真实应用，也包含真实的不确定性。",
    },
    body: {
      en: "Live accounts, changing content, permissions, CAPTCHAs, and network conditions are part of the evaluation.",
      zh: "真实账号、动态内容、权限、验证码和网络状态都属于评测环境的一部分。",
    },
  },
  {
    index: "02",
    title: {
      en: "Multi-step everyday work.",
      zh: "多步骤的日常任务。",
    },
    body: {
      en: "Tasks include long-horizon execution, comparison and ranking, deep app entry points, pop-up recovery, and cross-app coordination.",
      zh: "任务覆盖长程执行、比较与排序、深层功能入口、弹窗恢复和跨应用协同。",
    },
  },
  {
    index: "03",
    title: { en: "Auditable outcomes.", zh: "结果可审计。" },
    body: {
      en: "We develop an agent system named AutoJudge to review real-device execution at the trajectory level. AutoJudge examines the task instruction and complete action–screenshot trace, assigns pass, failed, or environment error with a concise rationale, and returns an auditable final outcome.",
      zh: "我们开发了名为 AutoJudge 的智能体系统，在轨迹层面对真机执行进行审核。AutoJudge 会检查任务指令与完整的动作—截图轨迹，给出通过、模型失败或环境错误的判断及简要理由，并形成可审计的最终结果。",
    },
  },
];

export function MobileWorldRealPage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = MOBILEWORLD_REAL_COPY[language];

  useEffect(() => {
    const stored = window.localStorage.getItem("qwen-ui-agent-language");
    if (stored === "en" || stored === "zh") {
      const frame = window.requestAnimationFrame(() => setLanguage(stored));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("qwen-ui-agent-language", language);
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#mobileworld-real-main">
        {language === "zh" ? "跳转到正文" : "Skip to content"}
      </a>

      <header className="site-header">
        <div className="detail-header-shell">
          <Link className="site-brand" href="/" aria-label="Qwen-UI-Agent home">
            <img
              className="brand-mark"
              src={siteAsset("/tongyi-mark.png")}
              alt=""
              width="34"
              height="34"
              aria-hidden="true"
            />
            <span className="brand-wordmark">Qwen-UI-Agent</span>
          </Link>

          <Link className="detail-back" href="/">
            <span aria-hidden="true">←</span>
            {copy.back}
          </Link>

          <div className="language-switch" aria-label="Language">
            <button
              type="button"
              className={language === "en" ? "is-active" : ""}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={language === "zh" ? "is-active" : ""}
              aria-pressed={language === "zh"}
              onClick={() => setLanguage("zh")}
            >
              中文
            </button>
          </div>
        </div>
      </header>

      <main id="mobileworld-real-main" className="mobileworld-real-page">
        <section className="mobileworld-real-hero">
          <div className="page-shell">
            <div className="mobileworld-real-hero-grid">
              <div>
                <h1>{copy.title}</h1>
                <p className="mobileworld-real-subtitle">{copy.subtitle}</p>
              </div>
              <p className="mobileworld-real-lead">{copy.lead}</p>
            </div>

            <div className="mobileworld-real-stats">
              {MOBILEWORLD_REAL_STATS.map((stat) => (
                <div key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{localize(stat.label, language)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mobileworld-real-figure-section">
          <div className="page-shell">
            <div className="mobileworld-real-figure-head">
              <div>
                <h2 className="mobileworld-real-figure-title">
                  {copy.figureEyebrow}
                </h2>
                <p className="mobileworld-real-figure-subtitle">
                  {copy.figureTitle}
                </p>
              </div>
            </div>

            <p className="mobileworld-real-figure-mobile-hint">
              {copy.scrollHint}
            </p>
            <figure className="mobileworld-real-profile-figure">
              <div className="mobileworld-real-figure-scroll">
                <img
                  src={siteAsset("/report/mobileworld-real-profile.webp")}
                  alt={copy.figureCaption}
                  width="3200"
                  height="2469"
                  fetchPriority="high"
                />
              </div>
              <figcaption>
                <p>{copy.figureCaption}</p>
                <span>{copy.scrollHint}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="mobileworld-real-details">
          <div className="page-shell">
            <div className="mobileworld-real-point-grid">
              {MOBILEWORLD_REAL_POINTS.map((point) => (
                <article key={point.index}>
                  <span>{point.index}</span>
                  <h3>{localize(point.title, language)}</h3>
                  <p>{localize(point.body, language)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-shell footer-grid mobileworld-real-footer">
          <Link className="site-brand" href="/">
            <img
              className="brand-mark"
              src={siteAsset("/tongyi-mark.png")}
              alt=""
              width="30"
              height="30"
              aria-hidden="true"
            />
            <span className="brand-wordmark">Qwen-UI-Agent</span>
          </Link>
          <Link className="mobileworld-real-footer-home" href="/">
            <span aria-hidden="true">←</span>
            {copy.back}
          </Link>
        </div>
      </footer>
    </>
  );
}
