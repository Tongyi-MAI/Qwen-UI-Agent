"use client";

/* eslint-disable @next/next/no-img-element */

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { CopyCitation } from "./CopyCitation";
import { siteAsset } from "../sitePath";
import {
  APPLICATIONS,
  DEMO_CATEGORIES,
  DEMO_VIDEOS,
  GENERAL_CAPABILITY_GROUPS,
  GROUNDING_BENCHMARKS,
  MODEL_ORGANIZATIONS,
  PERFORMANCE_BENCHMARKS,
  SITE_COPY,
  TASK_PERFORMANCE_CATEGORIES,
  localize,
  type Language,
  type PerformanceBenchmark,
  type TaskPerformanceCategory,
} from "../siteContent";

const citation = `@misc{qwenuiagent2026,
  title  = {Qwen-UI-Agent Technical Report:
            Toward Next-Generation Real-World-Centric
            Foundation GUI Agents},
  author = {MAI-UI Team},
  year   = {2026},
  note   = {Alibaba Token Hub}
}`;

const sectionIds = ["applications", "performance", "demos", "citation"];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

type SectionIconKind =
  | "capabilities"
  | "performance"
  | "demos"
  | "citation";

function SectionIcon({ kind }: { kind: SectionIconKind }) {
  if (kind === "performance") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M5 25V16h5v9M14 25V10h5v15M23 25V5h5v20M4 27h25" />
      </svg>
    );
  }

  if (kind === "demos") {
    return (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <rect x="4" y="7" width="24" height="18" rx="2" />
        <path d="m14 12 7 4-7 4Z" />
      </svg>
    );
  }

  if (kind === "citation") {
    return (
      <svg
        className="section-icon-solid"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path d="M4 18c0-6 3-10 9-12l1.5 3.2c-3.2 1.4-4.8 3.4-5.1 6.2H14V25H4v-7Zm14 0c0-6 3-10 9-12l1.5 3.2c-3.2 1.4-4.8 3.4-5.1 6.2H28V25H18v-7Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="5" width="10" height="9" rx="1" />
      <rect x="18" y="5" width="10" height="9" rx="1" />
      <rect x="4" y="18" width="10" height="9" rx="1" />
      <rect x="18" y="18" width="10" height="9" rx="1" />
    </svg>
  );
}

function SectionHeading({
  title,
  icon,
}: {
  title: string;
  icon: SectionIconKind;
}) {
  return (
    <div className="section-heading">
      <span className="section-heading-icon">
        <SectionIcon kind={icon} />
      </span>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function getPerformanceScale(benchmark: PerformanceBenchmark) {
  if (benchmark.axisRange) {
    return {
      min: benchmark.axisRange.min,
      mid: (benchmark.axisRange.min + benchmark.axisRange.max) / 2,
      max: benchmark.axisRange.max,
    };
  }

  const values = benchmark.entries.map((entry) => entry.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);
  const dataSpan = Math.max(0, dataMax - dataMin);
  const targetSpan = Math.max(20, dataSpan * 1.35);
  const padding = Math.max(0, (targetSpan - dataSpan) / 2);
  let min = Math.max(0, Math.floor((dataMin - padding) / 5) * 5);
  let max = Math.min(100, Math.ceil((dataMax + padding) / 5) * 5);

  if (max - min < 20) {
    if (max === 100) {
      min = Math.max(0, max - 20);
    } else {
      max = Math.min(100, min + 20);
    }
  }

  return {
    min,
    mid: (min + max) / 2,
    max,
  };
}

function formatAxisTick(value: number) {
  return Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1);
}

function formatChartModelName(name: string) {
  return name
    .replace(/(?:\s+|-)\d+(?:\.\d+)?B(?:-[A-Za-z0-9.]+)*/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function PerformanceCard({
  benchmark,
  language,
}: {
  benchmark: PerformanceBenchmark;
  language: Language;
}) {
  const copy = SITE_COPY[language];
  const scale = getPerformanceScale(benchmark);
  const scaleSpan = scale.max - scale.min;
  const scaleDescription =
    language === "zh"
      ? `坐标范围 ${formatAxisTick(scale.min)} 至 ${formatAxisTick(scale.max)}`
      : `Scale ${formatAxisTick(scale.min)} to ${formatAxisTick(scale.max)}`;
  const content = (
    <div className="performance-card-inner">
      <div className="performance-card-head">
        <div className="performance-card-topline">
          <span>{localize(benchmark.domain, language)}</span>
          <div className="performance-card-meta">
            <small>{localize(benchmark.metric, language)}</small>
            {benchmark.linkLabel ? (
              <em>
                {localize(benchmark.linkLabel, language)}
                <b aria-hidden="true">↗</b>
              </em>
            ) : null}
          </div>
        </div>
        <h4>{benchmark.benchmark}</h4>
      </div>

      <div
        className="performance-columns"
        style={{
          gridTemplateColumns: `repeat(${benchmark.entries.length}, minmax(0, 1fr))`,
        }}
        role="list"
        aria-label={`${benchmark.benchmark} ${localize(
          benchmark.metric,
          language,
        )}; ${scaleDescription}`}
      >
        <div className="performance-axis" aria-hidden="true">
          <span>{formatAxisTick(scale.max)}</span>
          <span>{formatAxisTick(scale.mid)}</span>
          <span>{formatAxisTick(scale.min)}</span>
        </div>
        <div className="performance-axis-range" aria-hidden="true">
          {language === "zh" ? "范围" : "Scale"}{" "}
          {formatAxisTick(scale.min)}–{formatAxisTick(scale.max)}
        </div>
        {benchmark.entries.map((entry) => {
          const displayedValue = entry.displayValue ?? entry.value.toFixed(1);
          const organization = MODEL_ORGANIZATIONS[entry.name];
          const chartModelName = formatChartModelName(entry.name);
          const plotScore = Math.max(
            0,
            Math.min(100, ((entry.value - scale.min) / scaleSpan) * 100),
          );
          return (
            <div
              className={`performance-column access-${entry.access}`}
              role="listitem"
              aria-label={`${chartModelName}${
                organization ? `, ${organization.name}` : ""
              }: ${displayedValue}`}
              key={entry.name}
              style={
                {
                  "--score": entry.value,
                  "--plot-score": plotScore,
                } as CSSProperties
              }
            >
              <div className="performance-column-plot" aria-hidden="true">
                <div className="performance-column-track">
                  <b>{displayedValue}</b>
                  <i>
                    {organization ? (
                      organization.logo ? (
                        <img src={siteAsset(organization.logo)} alt="" />
                      ) : (
                        <span>{organization.mark}</span>
                      )
                    ) : null}
                  </i>
                </div>
              </div>
              <div
                className="performance-model-label"
                title={chartModelName}
              >
                <strong>{chartModelName}</strong>
                {organization ? <small>{organization.name}</small> : null}
              </div>
            </div>
          );
        })}
      </div>

      <div
        className="performance-card-legend"
        aria-label={copy.comparisonTitle}
      >
        <span className="legend-ours">
          <i aria-hidden="true" />
          {copy.legendOurs}
        </span>
        <span className="legend-closed">
          <i aria-hidden="true" />
          {copy.legendClosed}
        </span>
        <span className="legend-size-listed">
          <i aria-hidden="true" />
          {copy.legendSizeListed}
        </span>
      </div>
    </div>
  );

  return (
    <article
      className={`performance-card${benchmark.href ? " is-linkable" : ""}`}
    >
      {benchmark.href ? (
        <Link
          className="performance-card-link"
          href={benchmark.href}
          aria-label={
            language === "zh"
              ? `了解 ${benchmark.benchmark} 基准`
              : `Learn about the ${benchmark.benchmark} benchmark`
          }
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}

function CapabilityVideo({
  src,
  poster,
  playbackRate = 1,
}: {
  src: string;
  poster: string;
  playbackRate?: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackRate;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPlayback = (isVisible: boolean) => {
      if (isVisible && !reducedMotion.matches) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => syncPlayback(entry.isIntersecting),
      { threshold: 0.35 },
    );
    const handleMotionChange = () => {
      syncPlayback(video.getBoundingClientRect().top < window.innerHeight);
    };

    observer.observe(video);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      video.pause();
    };
  }, [playbackRate]);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster={siteAsset(poster)}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={siteAsset(src)} type="video/mp4" />
    </video>
  );
}

function CapabilityCaseHeader({
  title,
  instruction,
  steps,
  language,
  overlay = false,
}: {
  title: string;
  instruction: string;
  steps: string[];
  language: Language;
  overlay?: boolean;
}) {
  return (
    <div
      className={`capability-case-header${
        steps.length >= 4 ? " has-four-steps" : ""
      }${overlay ? " is-overlay" : ""}`}
      aria-hidden="true"
    >
      <div>
        <small>{language === "zh" ? "任务指令" : "INSTRUCTION"}</small>
        <strong>{title}</strong>
        <p>{instruction}</p>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}

function MobileCaseVisual({
  label,
  alt,
  language,
  caseTitle,
  caseInstruction,
  caseSteps,
}: {
  label: string;
  alt: string;
  language: Language;
  caseTitle: string;
  caseInstruction: string;
  caseSteps: string[];
}) {
  const copy =
    language === "zh"
      ? {
          flight: "航班 MU5103 · 07:30",
          destination: "首都机场 T3",
          pickup: "当前位置",
          schedule: "明天 · 06:30",
          constraint: "预算 ≤ ¥100",
          compare: "可选车型",
          fast: "标准型 · ¥86",
          fastMeta: "8 分钟接驾 · 预算内最快",
          value: "舒适型 · ¥99",
          valueMeta: "12 分钟接驾 · 更宽敞",
          premium: "豪华型 · ¥128",
          premiumMeta: "5 分钟接驾 · 超出预算",
          review: "订单待确认",
          reviewMeta: "明天 06:30 · 首都机场 T3",
          selected: "标准型 · ¥86 · 8 分钟",
          approve: "确认 ¥86 后下单",
          guard: "确认前不会产生订单",
        }
      : {
          flight: "Flight MU5103 · 07:30",
          destination: "Airport Terminal 3",
          pickup: "Current location",
          schedule: "Tomorrow · 06:30",
          constraint: "Budget ≤ CNY 100",
          compare: "Ride options",
          fast: "Standard · CNY 86",
          fastMeta: "8 min pickup · fastest in budget",
          value: "Comfort · CNY 99",
          valueMeta: "12 min pickup · more space",
          premium: "Premium · CNY 128",
          premiumMeta: "5 min pickup · over budget",
          review: "Ready for approval",
          reviewMeta: "Tomorrow 06:30 · Airport T3",
          selected: "Standard · CNY 86 · 8 min",
          approve: "Approve CNY 86",
          guard: "No booking before approval",
        };

  return (
    <figure
      className="application-visual application-visual-mobile application-visual-case"
      aria-label={`${alt}. ${caseInstruction}`}
    >
      <CapabilityCaseHeader
        title={caseTitle}
        instruction={caseInstruction}
        steps={caseSteps}
        language={language}
      />
      <div className="mobile-case-stage" aria-hidden="true">
        <article className="mobile-case-phone mobile-case-phone-search">
          <div className="mobile-case-phone-chrome">
            <span>9:41</span>
            <i />
          </div>
          <small>{caseSteps[0]}</small>
          <strong>{copy.flight}</strong>
          <div className="mobile-case-route">
            <i />
            <span>{copy.pickup}</span>
            <i />
            <span>{copy.destination}</span>
          </div>
          <span className="mobile-case-schedule">
            {copy.schedule}
            <b className="mobile-case-cursor" />
          </span>
        </article>

        <span className="mobile-case-arrow mobile-case-arrow-one">→</span>

        <article className="mobile-case-phone mobile-case-phone-compare">
          <div className="mobile-case-phone-chrome">
            <span>9:41</span>
            <i />
          </div>
          <small>
            {copy.compare} · {copy.constraint}
          </small>
          <div className="mobile-case-option is-selected">
            <i />
            <span>
              <b>{copy.fast}</b>
              <small>{copy.fastMeta}</small>
            </span>
            <em>✓</em>
            <span className="mobile-case-tap" />
          </div>
          <div className="mobile-case-option">
            <i />
            <span>
              <b>{copy.value}</b>
              <small>{copy.valueMeta}</small>
            </span>
          </div>
          <div className="mobile-case-option is-over-budget">
            <i />
            <span>
              <b>{copy.premium}</b>
              <small>{copy.premiumMeta}</small>
            </span>
          </div>
        </article>

        <span className="mobile-case-arrow mobile-case-arrow-two">→</span>

        <article className="mobile-case-phone mobile-case-phone-result">
          <div className="mobile-case-phone-chrome">
            <span>9:41</span>
            <i />
          </div>
          <i className="mobile-case-check">✓</i>
          <strong>{copy.review}</strong>
          <p>{copy.reviewMeta}</p>
          <span className="mobile-case-review-line">{copy.selected}</span>
          <span className="mobile-case-result-button">{copy.approve}</span>
          <em className="mobile-case-guard">{copy.guard}</em>
        </article>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function CapabilityFlowVisual({
  kind,
  language,
  label,
  alt,
  caseTitle,
  caseInstruction,
  caseSteps,
}: {
  kind: "research" | "proactive";
  language: Language;
  label: string;
  alt: string;
  caseTitle: string;
  caseInstruction: string;
  caseSteps: string[];
}) {
  const sceneCopy =
    kind === "research"
      ? language === "zh"
        ? {
            workspace: "深度研究工作台",
            query: "会场附近 · 6 人 · 明晚 19:30 · 人均 ≤ ¥200",
            sources: [
              "兰亭 · 4.7 · ¥168 · 19:30 有位",
              "八号餐桌 · 4.6 · ¥188 · 20:00",
              "花园餐厅 · 4.8 · ¥220 · 超出预算",
            ],
            checked: "正在检索与核验 12 个页面",
            phases: ["检索", "核验", "综合"],
            plan: "最佳匹配 · 兰亭",
            planDetail: "评分、价格、距离与实时余位均符合",
            handoff: "方案 → 电脑 GUI",
            realGui: "电脑 GUI · Google Maps",
            status: "maps.google.com",
            mapsBrand: "Google Maps",
            mapsQuery: "会展中心附近的安静餐厅",
            mapsResult: "研究结果已在地图中定位",
            appLabel: "已选中的餐厅",
            appTitle: "兰亭 · 会展店",
            appMeta: "4.7 ★ · 1.1 km · 人均 ¥168",
            appEvidence: "明晚 19:30 · 6 人有余位",
            appAction: "预订餐桌",
            bookingBrand: "兰亭在线订位",
            bookingTitle: "订位信息",
            bookingMeta: "兰亭 · 会展店",
            dateLabel: "日期",
            dateValue: "明天 · 7 月 29 日",
            timeLabel: "时间",
            timeValue: "19:30",
            guestsLabel: "人数",
            guestsValue: "6 人",
            preferenceLabel: "座位偏好",
            preferenceValue: "安静座位",
            bookingAction: "审核订位信息",
            verified: "等待审核 · 尚未订位",
          }
        : {
            workspace: "RESEARCH WORKSPACE",
            query: "Near venue · 6 guests · tomorrow 19:30 · ≤ CNY 200/person",
            sources: [
              "Lanting · 4.7 · CNY 168 · 19:30 available",
              "Table No. 8 · 4.6 · CNY 188 · 20:00",
              "Garden Room · 4.8 · CNY 220 · over budget",
            ],
            checked: "SEARCHING & VERIFYING 12 PAGES",
            phases: ["SEARCH", "VERIFY", "SYNTHESIZE"],
            plan: "BEST FIT · LANTING",
            planDetail: "Rating, price, distance, and live availability verified",
            handoff: "PLAN → DESKTOP GUI",
            realGui: "DESKTOP GUI · GOOGLE MAPS",
            status: "maps.google.com",
            mapsBrand: "Google Maps",
            mapsQuery: "Quiet restaurants near Convention Center",
            mapsResult: "Researched result located on the map",
            appLabel: "SELECTED RESTAURANT",
            appTitle: "Lanting · Convention Center",
            appMeta: "4.7 ★ · 1.1 km · CNY 168/person",
            appEvidence: "Tomorrow 19:30 · table for 6 available",
            appAction: "Reserve a table",
            bookingBrand: "LANTING RESERVATIONS",
            bookingTitle: "Reservation details",
            bookingMeta: "Lanting · Convention Center",
            dateLabel: "DATE",
            dateValue: "Tomorrow · Jul 29",
            timeLabel: "TIME",
            timeValue: "7:30 PM",
            guestsLabel: "PARTY SIZE",
            guestsValue: "6 guests",
            preferenceLabel: "PREFERENCE",
            preferenceValue: "Quiet seating",
            bookingAction: "Review reservation",
            verified: "READY FOR REVIEW · NOT BOOKED",
          }
      : language === "zh"
        ? {
            notifications: "实时通知",
            agent: "智能体主动服务",
            event: "航班 CA1517 已取消",
            context: "检测到行程异常；正在保护 14:00 会议",
            searches: [
              "查询航空公司实时余票",
              "查询高铁时刻与票价",
              "核对日历中的 14:00 会议",
            ],
            optionOne: "航班 CA1521 · 10:20 → 12:35",
            optionOneMeta: "¥980 · 会议前 85 分钟到达",
            optionTwo: "高铁 G27 · 09:00 → 13:28",
            optionTwoMeta: "¥553 · 会议前 32 分钟到达",
            recommended: "推荐",
            approval: "等待你的选择",
            review: "行程应用 · GUI 选择",
            source: "航空公司通知",
            detail: "原定明日 07:30 起飞",
            otherOne: "天气提醒",
            otherTwo: "日程更新",
            plan: "已找到 2 个可行方案",
            recommendation: "优先建议：航班 CA1521",
            planMeta: "已比较到达时间、价格与会议风险",
            chooseFlight: "选择航班",
            chooseRail: "选择高铁",
            approve: "继续处理所选方案",
            guard: "等待你的选择 · 尚未改签",
          }
        : {
            notifications: "LIVE NOTIFICATIONS",
            agent: "AGENT ACTS PROACTIVELY",
            event: "Flight CA1517 cancelled",
            context: "Travel disruption detected; protecting the 14:00 meeting",
            searches: [
              "Checking live airline inventory",
              "Checking rail schedules and fares",
              "Reading the 14:00 calendar constraint",
            ],
            optionOne: "Flight CA1521 · 10:20 → 12:35",
            optionOneMeta: "CNY 980 · arrives 85 min before meeting",
            optionTwo: "Rail G27 · 09:00 → 13:28",
            optionTwoMeta: "CNY 553 · arrives 32 min before meeting",
            recommended: "RECOMMENDED",
            approval: "AWAITING YOUR CHOICE",
            review: "TRAVEL APP · GUI CHOICE",
            source: "AIRLINE ALERT",
            detail: "Original departure: tomorrow 07:30",
            otherOne: "Weather advisory",
            otherTwo: "Calendar update",
            plan: "2 VIABLE ALTERNATIVES FOUND",
            recommendation: "Preferred: Flight CA1521",
            planMeta: "Arrival time, price, and meeting risk compared",
            chooseFlight: "Choose flight",
            chooseRail: "Choose rail",
            approve: "Continue with selected option",
            guard: "Awaiting your choice · nothing rebooked",
          };

  return (
    <figure
      className={`application-visual application-visual-flow application-visual-${kind}`}
      aria-label={`${alt}. ${caseInstruction}`}
    >
      <CapabilityCaseHeader
        title={caseTitle}
        instruction={caseInstruction}
        steps={caseSteps}
        language={language}
      />
      {kind === "research" ? (
        <div
          className="capability-real-scene capability-real-scene-research"
          aria-hidden="true"
        >
          <div className="research-workbench">
            <div className="research-browser-chrome">
              <i />
              <i />
              <i />
              <span>{sceneCopy.workspace}</span>
            </div>
            <div className="research-query">
              <small>{sceneCopy.checked}</small>
              <strong>{sceneCopy.query}</strong>
            </div>
            <div className="research-phase-strip">
              {sceneCopy.phases?.map((phase, index) => (
                <span key={phase}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {phase}
                </span>
              ))}
            </div>
            <ul>
              {sceneCopy.sources?.map((source) => (
                <li key={source}>
                  <i />
                  <span>{source}</span>
                  <b>✓</b>
                </li>
              ))}
            </ul>
            <div className="research-plan-summary">
              <small>{sceneCopy.plan}</small>
              <strong>{sceneCopy.planDetail}</strong>
              <span>✓</span>
            </div>
          </div>
          <div className="research-handoff">
            <i />
            <span>{sceneCopy.handoff}</span>
          </div>
          <div className="research-real-frame research-desktop-frame">
            <div className="capability-scene-head">
              <span>{sceneCopy.realGui}</span>
              <b>{sceneCopy.status}</b>
            </div>
            <div className="research-real-image research-desktop-browser">
              <div className="research-desktop-chrome">
                <i />
                <i />
                <i />
                <span className="research-browser-tab">
                  {sceneCopy.mapsBrand}
                </span>
                <div className="research-address-bar">
                  <span className="research-address-maps">
                    maps.google.com/search/lanting
                  </span>
                  <span className="research-address-booking">
                    reserve.lanting.example/table
                  </span>
                </div>
              </div>

              <div className="research-maps-state">
                <aside className="research-maps-panel">
                  <strong>{sceneCopy.mapsBrand}</strong>
                  <div className="research-maps-search">
                    <i />
                    <span>{sceneCopy.mapsQuery}</span>
                  </div>
                  <small>{sceneCopy.mapsResult}</small>
                  <article className="research-map-place">
                    <em>{sceneCopy.appLabel}</em>
                    <h4>{sceneCopy.appTitle}</h4>
                    <p>{sceneCopy.appMeta}</p>
                    <span>✓ {sceneCopy.appEvidence}</span>
                    <button type="button">{sceneCopy.appAction}</button>
                  </article>
                </aside>
                <div className="research-map-canvas">
                  <span className="research-map-road research-map-road-one" />
                  <span className="research-map-road research-map-road-two" />
                  <span className="research-map-road research-map-road-three" />
                  <i className="research-map-pin research-map-pin-one" />
                  <i className="research-map-pin research-map-pin-two" />
                  <i className="research-map-pin research-map-pin-selected">
                    <b>★</b>
                  </i>
                  <small>{sceneCopy.appTitle}</small>
                </div>
              </div>

              <div className="research-reservation-state">
                <header>
                  <em>
                    {sceneCopy.mapsBrand} → {sceneCopy.appAction}
                  </em>
                  <small>{sceneCopy.bookingBrand}</small>
                  <strong>{sceneCopy.bookingTitle}</strong>
                  <span>{sceneCopy.bookingMeta}</span>
                </header>
                <div className="research-reservation-form">
                  <label>
                    <small>{sceneCopy.dateLabel}</small>
                    <span>{sceneCopy.dateValue}</span>
                  </label>
                  <label>
                    <small>{sceneCopy.timeLabel}</small>
                    <span>{sceneCopy.timeValue}</span>
                  </label>
                  <label>
                    <small>{sceneCopy.guestsLabel}</small>
                    <span>{sceneCopy.guestsValue}</span>
                  </label>
                  <label>
                    <small>{sceneCopy.preferenceLabel}</small>
                    <span>{sceneCopy.preferenceValue}</span>
                  </label>
                  <button type="button">{sceneCopy.bookingAction}</button>
                  <em>✓ {sceneCopy.verified}</em>
                </div>
              </div>

              <b className="research-gui-cursor" />
              <i className="research-gui-click research-gui-click-place" />
              <i className="research-gui-click research-gui-click-reserve" />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="capability-real-scene capability-real-scene-proactive"
          aria-hidden="true"
        >
          <div className="proactive-device proactive-device-notifications">
            <span>{sceneCopy.notifications}</span>
            <div className="proactive-notification-list">
              <article className="proactive-notification-card">
                <small>{sceneCopy.source}</small>
                <strong>{sceneCopy.event}</strong>
                <span>{sceneCopy.detail}</span>
              </article>
              <article>
                <i />
                <span>{sceneCopy.otherOne}</span>
              </article>
              <article>
                <i />
                <span>{sceneCopy.otherTwo}</span>
              </article>
              <i className="proactive-notification-focus" />
            </div>
          </div>
          <div className="proactive-agent-panel">
            <small>{sceneCopy.agent}</small>
            <strong>{sceneCopy.event}</strong>
            <p>{sceneCopy.context}</p>
            <div className="proactive-search-log">
              {sceneCopy.searches?.map((search) => (
                <span key={search}>
                  <i />
                  {search}
                </span>
              ))}
            </div>
            <ul>
              <li>
                <i />
                <span>
                  <strong>{sceneCopy.optionOne}</strong>
                  <small>{sceneCopy.optionOneMeta}</small>
                </span>
                <b>{sceneCopy.recommended}</b>
              </li>
              <li>
                <i />
                <span>
                  <strong>{sceneCopy.optionTwo}</strong>
                  <small>{sceneCopy.optionTwoMeta}</small>
                </span>
              </li>
            </ul>
            <b>{sceneCopy.approval}</b>
          </div>
          <div className="proactive-device proactive-device-options">
            <span>{sceneCopy.review}</span>
            <div className="proactive-review-card">
              <small>{sceneCopy.plan}</small>
              <strong>{sceneCopy.recommendation}</strong>
              <span>{sceneCopy.planMeta}</span>
              <div className="proactive-choice-list">
                <span className="is-recommended">
                  <b>{sceneCopy.chooseFlight}</b>
                  <small>{sceneCopy.optionOne}</small>
                </span>
                <span>
                  <b>{sceneCopy.chooseRail}</b>
                  <small>{sceneCopy.optionTwo}</small>
                </span>
              </div>
              <b>{sceneCopy.approve}</b>
              <em>{sceneCopy.guard}</em>
            </div>
          </div>
        </div>
      )}
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function CapabilityIndexIcon({
  kind,
}: {
  kind: (typeof APPLICATIONS)[number]["kind"];
}) {
  return (
    <span
      className={`capability-index-icon capability-index-icon-${kind}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

function GuiCliVisual({
  label,
  alt,
  language,
  caseTitle,
  caseInstruction,
  caseSteps,
}: {
  label: string;
  alt: string;
  language: Language;
  caseTitle: string;
  caseInstruction: string;
  caseSteps: string[];
}) {
  const copy =
    language === "zh"
      ? {
          workspace: "Qwen-UI-Agent · 任务工作台",
          filesStage: "GUI · 选择输入",
          cliStage: "CLI · 批量对账",
          excelStage: "GUI · 复核结果",
          filesApp: "文件管理器",
          folder: "财务 / 差旅 / 新加坡客户拜访",
          sourceLabel: "任务输入",
          selected: "已选择 10 项",
          selectedMeta: "8 份票据 · 公司卡账单 · 公司汇率表",
          preserved: "原始文件保持不变",
          files: [
            { name: "Flight_SQ807.pdf", type: "PDF" },
            { name: "Marina_Bay_Hotel.pdf", type: "PDF" },
            { name: "Client_Dinner.pdf", type: "PDF" },
            { name: "Airport_Taxi.pdf", type: "PDF" },
            { name: "Metro_06-18.pdf", type: "PDF" },
            { name: "Lunch_06-18.pdf", type: "PDF" },
            { name: "Coffee_Client.pdf", type: "PDF" },
            { name: "Return_Taxi.pdf", type: "PDF" },
            { name: "corporate_card.csv", type: "CSV" },
            { name: "company_rates.xlsx", type: "XLSX" },
          ],
          terminalApp: "终端 · reconcile_trip.py",
          terminalInput: "输入",
          terminalOutput: "输出",
          terminalInputValue: "票据 / 公司卡账单 / 汇率表",
          terminalOutputValue: "Trip_Claim.xlsx",
          terminalCommand:
            "$ python reconcile_trip.py Receipts/ --card corporate_card.csv --fx company_rates.xlsx",
          terminalScan: "[1/4] 已解析 8/8 份票据 · 读取 9 笔公司卡消费",
          terminalFx: "[2/4] 已按公司汇率换算 SGD → CNY",
          terminalMatch: "[3/4] 已匹配 8/9 笔 · 发现 1 笔缺失票据",
          terminalException: "! Grab · SGD 23.80 · 缺少票据",
          terminalWrite: "[4/4] ✓ 已写入 Trip_Claim.xlsx",
          workbook: "Trip_Claim.xlsx",
          workbookTabs: ["开始", "插入", "数据", "审阅"],
          formula: "=SUMIFS(Amount_CNY, Status, \"<>Excluded\")",
          totalLabel: "报销总额",
          total: "¥6,882.42",
          matchedLabel: "已匹配",
          matched: "8 笔",
          reviewLabel: "待复核",
          review: "1 笔",
          tableHeaders: ["日期", "商户", "类别", "票据", "金额（CNY）", "状态"],
          tableRows: [
            ["06-17", "Singapore Airlines", "机票", "✓", "¥3,840.00", "已匹配"],
            ["06-18", "Marina Bay Hotel", "住宿", "✓", "¥1,932.42", "已匹配"],
            ["06-18", "Client Dinner", "餐饮", "✓", "¥648.00", "已匹配"],
            ["06-19", "Grab", "交通", "—", "¥127.57", "待复核"],
          ],
          moreRows: "另有 5 行已完成对账",
          chartTitle: "按类别汇总",
          chartLabels: ["机票", "住宿", "餐饮", "交通"],
          exceptionFilter: "异常项（1）",
          exception: "Grab · 缺少票据",
          ready: "待财务复核",
          notSubmitted: "尚未提交报销",
        }
      : {
          workspace: "Qwen-UI-Agent · TASK WORKSPACE",
          filesStage: "GUI · SELECT INPUTS",
          cliStage: "CLI · RECONCILE AT SCALE",
          excelStage: "GUI · REVIEW RESULTS",
          filesApp: "FILE MANAGER",
          folder: "Finance / Travel / Singapore Client Trip",
          sourceLabel: "TASK INPUTS",
          selected: "10 ITEMS SELECTED",
          selectedMeta: "8 receipts · card statement · company FX table",
          preserved: "Original files stay unchanged",
          files: [
            { name: "Flight_SQ807.pdf", type: "PDF" },
            { name: "Marina_Bay_Hotel.pdf", type: "PDF" },
            { name: "Client_Dinner.pdf", type: "PDF" },
            { name: "Airport_Taxi.pdf", type: "PDF" },
            { name: "Metro_06-18.pdf", type: "PDF" },
            { name: "Lunch_06-18.pdf", type: "PDF" },
            { name: "Coffee_Client.pdf", type: "PDF" },
            { name: "Return_Taxi.pdf", type: "PDF" },
            { name: "corporate_card.csv", type: "CSV" },
            { name: "company_rates.xlsx", type: "XLSX" },
          ],
          terminalApp: "TERMINAL · reconcile_trip.py",
          terminalInput: "INPUT",
          terminalOutput: "OUTPUT",
          terminalInputValue: "Receipts / card statement / FX table",
          terminalOutputValue: "Trip_Claim.xlsx",
          terminalCommand:
            "$ python reconcile_trip.py Receipts/ --card corporate_card.csv --fx company_rates.xlsx",
          terminalScan: "[1/4] parsed 8/8 receipts · read 9 card charges",
          terminalFx: "[2/4] converted SGD → CNY with company FX table",
          terminalMatch: "[3/4] matched 8/9 charges · 1 receipt missing",
          terminalException: "! Grab · SGD 23.80 · receipt missing",
          terminalWrite: "[4/4] ✓ wrote Trip_Claim.xlsx",
          workbook: "Trip_Claim.xlsx",
          workbookTabs: ["Home", "Insert", "Data", "Review"],
          formula: '=SUMIFS(Amount_CNY, Status, "<>Excluded")',
          totalLabel: "CLAIM TOTAL",
          total: "CNY 6,882.42",
          matchedLabel: "MATCHED",
          matched: "8",
          reviewLabel: "REVIEW",
          review: "1",
          tableHeaders: [
            "Date",
            "Vendor",
            "Category",
            "Receipt",
            "Amount (CNY)",
            "Status",
          ],
          tableRows: [
            ["06-17", "Singapore Airlines", "Flight", "✓", "3,840.00", "MATCHED"],
            ["06-18", "Marina Bay Hotel", "Lodging", "✓", "1,932.42", "MATCHED"],
            ["06-18", "Client Dinner", "Meals", "✓", "648.00", "MATCHED"],
            ["06-19", "Grab", "Transport", "—", "127.57", "REVIEW"],
          ],
          moreRows: "5 more reconciled rows",
          chartTitle: "SPEND BY CATEGORY",
          chartLabels: ["Flight", "Hotel", "Meals", "Transit"],
          exceptionFilter: "EXCEPTIONS (1)",
          exception: "Grab · receipt missing",
          ready: "READY FOR FINANCE REVIEW",
          notSubmitted: "No claim submitted",
        };

  return (
    <figure
      className="application-visual application-visual-gui-cli application-visual-case"
      aria-label={`${alt}. ${caseInstruction}`}
    >
      <CapabilityCaseHeader
        title={caseTitle}
        instruction={caseInstruction}
        steps={caseSteps}
        language={language}
      />
      <div className="gui-cli-stage office-workflow" aria-hidden="true">
        <ol className="office-workflow-rail">
          <li className="office-workflow-step-files">
            <b>01</b>
            <span>{copy.filesStage}</span>
          </li>
          <li className="office-workflow-step-cli">
            <b>02</b>
            <span>{copy.cliStage}</span>
          </li>
          <li className="office-workflow-step-excel">
            <b>03</b>
            <span>{copy.excelStage}</span>
          </li>
        </ol>

        <div className="office-workflow-screen">
          <div className="office-workflow-chrome">
            <span />
            <span />
            <span />
            <small>{copy.workspace}</small>
          </div>

          <section className="office-scene office-files-scene">
            <aside className="office-files-sidebar">
              <strong>{copy.filesApp}</strong>
              <span>Recents</span>
              <span>Finance</span>
              <span className="is-active">Travel</span>
              <span>Shared</span>
            </aside>
            <div className="office-files-main">
              <header>
                <div>
                  <small>{copy.sourceLabel}</small>
                  <strong>{copy.folder}</strong>
                </div>
                <b>{copy.selected}</b>
              </header>
              <div className="office-file-grid">
                {copy.files.map((file, index) => (
                  <span
                    className={`office-file office-file-${file.type.toLowerCase()}`}
                    key={file.name}
                    style={
                      {
                        "--file-delay": `${index * 55}ms`,
                      } as CSSProperties
                    }
                  >
                    <i>{file.type}</i>
                    <strong>{file.name}</strong>
                    <b>✓</b>
                  </span>
                ))}
              </div>
              <footer>
                <strong>{copy.selectedMeta}</strong>
                <span>✓ {copy.preserved}</span>
              </footer>
            </div>
            <b className="office-files-cursor" />
          </section>

          <section className="office-scene office-terminal-scene">
            <aside>
              <span>
                <small>{copy.terminalInput}</small>
                <strong>{copy.terminalInputValue}</strong>
              </span>
              <i>→</i>
              <span>
                <small>{copy.terminalOutput}</small>
                <strong>{copy.terminalOutputValue}</strong>
              </span>
            </aside>
            <div className="office-terminal">
              <header>
                <span />
                <span />
                <span />
                <small>{copy.terminalApp}</small>
              </header>
              <code>
                <strong>{copy.terminalCommand}</strong>
                <span className="office-terminal-line-1">
                  {copy.terminalScan}
                </span>
                <span className="office-terminal-line-2">
                  {copy.terminalFx}
                </span>
                <span className="office-terminal-line-3">
                  {copy.terminalMatch}
                </span>
                <em className="office-terminal-exception">
                  {copy.terminalException}
                </em>
                <span className="office-terminal-line-4">
                  {copy.terminalWrite}
                </span>
              </code>
            </div>
          </section>

          <section className="office-scene office-excel-scene">
            <div className="office-excel-ribbon">
              <strong>{copy.workbook}</strong>
              {copy.workbookTabs.map((tab) => (
                <span key={tab}>{tab}</span>
              ))}
            </div>
            <div className="office-excel-formula">
              <b>fx</b>
              <code>{copy.formula}</code>
            </div>
            <div className="office-excel-body">
              <main>
                <div className="office-excel-metrics">
                  <span>
                    <small>{copy.totalLabel}</small>
                    <strong>{copy.total}</strong>
                  </span>
                  <span>
                    <small>{copy.matchedLabel}</small>
                    <strong>{copy.matched}</strong>
                  </span>
                  <span className="is-review">
                    <small>{copy.reviewLabel}</small>
                    <strong>{copy.review}</strong>
                  </span>
                </div>
                <div className="office-excel-table">
                  <div className="office-excel-row is-header">
                    {copy.tableHeaders.map((header) => (
                      <b key={header}>{header}</b>
                    ))}
                  </div>
                  {copy.tableRows.map((row, rowIndex) => (
                    <div
                      className={`office-excel-row${
                        rowIndex === copy.tableRows.length - 1
                          ? " is-exception"
                          : ""
                      }`}
                      key={row.join("-")}
                    >
                      {row.map((cell) => (
                        <span key={cell}>{cell}</span>
                      ))}
                    </div>
                  ))}
                </div>
                <small className="office-excel-more">{copy.moreRows}</small>
              </main>
              <aside>
                <strong>{copy.chartTitle}</strong>
                <div className="office-excel-chart">
                  {copy.chartLabels.map((chartLabel, index) => (
                    <span key={chartLabel}>
                      <i
                        style={
                          {
                            "--bar-height": `${[86, 62, 45, 32][index]}%`,
                            "--bar-delay": `${index * 75}ms`,
                          } as CSSProperties
                        }
                      />
                      <small>{chartLabel}</small>
                    </span>
                  ))}
                </div>
                <button type="button">{copy.exceptionFilter}</button>
                <p>{copy.exception}</p>
              </aside>
            </div>
            <div className="office-excel-ready">
              <span>✓</span>
              <strong>{copy.ready}</strong>
              <small>{copy.notSubmitted}</small>
            </div>
            <b className="office-excel-cursor" />
          </section>
        </div>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ApplicationVisual({
  application,
  language,
}: {
  application: (typeof APPLICATIONS)[number];
  language: Language;
}) {
  const label = localize(application.label, language);
  const alt = localize(application.imageAlt, language);
  const caseTitle = localize(application.caseTitle, language);
  const caseInstruction = localize(application.caseInstruction, language);
  const caseSteps = application.caseSteps.map((step) =>
    localize(step, language),
  );

  if (application.visual.type === "mobile-ui") {
    return (
      <MobileCaseVisual
        label={label}
        alt={alt}
        language={language}
        caseTitle={caseTitle}
        caseInstruction={caseInstruction}
        caseSteps={caseSteps}
      />
    );
  }

  if (application.visual.type === "video") {
    return (
      <figure
        className={`application-visual application-visual-video application-visual-video-${application.kind}`}
        aria-label={`${alt}. ${caseInstruction}`}
      >
        <CapabilityVideo
          src={application.visual.src}
          poster={application.visual.poster}
          playbackRate={application.visual.playbackRate}
        />
        <CapabilityCaseHeader
          title={caseTitle}
          instruction={caseInstruction}
          steps={caseSteps}
          language={language}
          overlay
        />
        <figcaption>{label}</figcaption>
      </figure>
    );
  }

  if (application.visual.type === "gui-cli") {
    return (
      <GuiCliVisual
        label={label}
        alt={alt}
        language={language}
        caseTitle={caseTitle}
        caseInstruction={caseInstruction}
        caseSteps={caseSteps}
      />
    );
  }

  if (application.visual.type === "browser-capture") {
    return (
      <figure
        className="application-visual application-visual-browser"
        aria-label={alt}
      >
        <div className="browser-capture-stack" aria-hidden="true">
          {application.visual.images.map((frame, index) => (
            <div
              className={`browser-capture-frame browser-capture-frame-${index + 1}`}
              style={{
                "--browser-frame-index": index,
                "--browser-frame-zoom": frame.zoom ?? 1,
                "--browser-marker-x": `${frame.marker?.x ?? 50}%`,
                "--browser-marker-y": `${frame.marker?.y ?? 50}%`,
              } as CSSProperties}
              key={`${frame.src}-${index}`}
            >
              <span
                className="browser-frame-image-shell"
                style={{ aspectRatio: frame.aspectRatio }}
              >
                <img
                  src={siteAsset(frame.src)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                {frame.marker ? (
                  <i className="browser-frame-click" />
                ) : null}
              </span>
              <small className="browser-frame-label">
                {localize(frame.label, language)}
              </small>
            </div>
          ))}
          <span className="browser-sequence-progress" />
        </div>
        <figcaption>{label}</figcaption>
      </figure>
    );
  }

  if (
    application.visual.type === "research-flow" ||
    application.visual.type === "proactive-flow"
  ) {
    return (
      <CapabilityFlowVisual
        kind={
          application.visual.type === "research-flow"
            ? "research"
            : "proactive"
        }
        language={language}
        label={label}
        alt={alt}
        caseTitle={caseTitle}
        caseInstruction={caseInstruction}
        caseSteps={caseSteps}
      />
    );
  }

  return (
    <figure
      className={`application-visual application-visual-${application.kind}`}
    >
      <img
        src={siteAsset(application.visual.src)}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: application.visual.position ?? "center" }}
      />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function DemoMedia({
  video,
  language,
  defaultPlaybackRate = 1,
}: {
  video: (typeof DEMO_VIDEOS)[number];
  language: Language;
  defaultPlaybackRate?: number;
}) {
  const title = localize(video.title, language);

  if (video.mediaType === "embed") {
    return (
      <iframe
        src={siteAsset(video.src)}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  if (video.mediaType === "local") {
    return (
      <video
        controls
        playsInline
        preload="metadata"
        poster={siteAsset(video.poster)}
        title={title}
        onLoadedMetadata={(event) => {
          event.currentTarget.defaultPlaybackRate = defaultPlaybackRate;
          event.currentTarget.playbackRate = defaultPlaybackRate;
        }}
      >
        <source src={siteAsset(video.src)} type="video/mp4" />
      </video>
    );
  }

  return (
    <div className="video-placeholder">
      <img src={siteAsset(video.src)} alt="" loading="lazy" />
      <span>
        <b aria-hidden="true">▶</b>
        {localize(video.status, language)}
      </span>
    </div>
  );
}

export function ReportPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeApplicationIndex, setActiveApplicationIndex] = useState(0);
  const [activeTaskCategory, setActiveTaskCategory] =
    useState<TaskPerformanceCategory>("mobile");
  const [activeDemoId, setActiveDemoId] = useState(
    "mobile-gui-e-shopping",
  );
  const copy = SITE_COPY[language];
  const activeApplication = APPLICATIONS[activeApplicationIndex]!;
  const [authorTeam, authorOrganization] = copy.authors.split(" · ");
  const activeDemo =
    DEMO_VIDEOS.find((video) => video.id === activeDemoId) ?? DEMO_VIDEOS[0]!;
  const activeDemoCategory =
    DEMO_CATEGORIES.find((category) => category.id === activeDemo.group) ??
    DEMO_CATEGORIES[0]!;
  const activeCategoryVideos = DEMO_VIDEOS.filter(
    (video) => video.group === activeDemo.group,
  );
  const activeWorkflowNumber =
    activeCategoryVideos.findIndex((video) => video.id === activeDemo.id) + 1;
  const activeDemoInstructionLabel =
    activeDemo.availability === "team-preview"
      ? copy.demoTaskInstructionLabel
      : copy.demoPlannedInstructionLabel;
  const activeDemoInstructionTranslationNote =
    activeDemo.instructionSourceLanguage === language
      ? ""
      : language === "en"
        ? " (translated from Chinese)"
        : "（翻译自英文指令）";
  const activeDemoInstructionHeading = `${activeDemoInstructionLabel}${activeDemoInstructionTranslationNote}`;

  const selectDemoCategory = (nextIndex: number) => {
    const normalizedIndex =
      (nextIndex + DEMO_CATEGORIES.length) % DEMO_CATEGORIES.length;
    const nextCategory = DEMO_CATEGORIES[normalizedIndex];
    const firstCategoryDemo = DEMO_VIDEOS.find(
      (video) => video.group === nextCategory?.id,
    );
    if (firstCategoryDemo) {
      setActiveDemoId(firstCategoryDemo.id);
    }
    return normalizedIndex;
  };

  const selectDemoWorkflow = (videoId: string) => {
    setActiveDemoId(videoId);

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 620px)").matches
    ) {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.requestAnimationFrame(() => {
        document.getElementById("active-demo-panel")?.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
          block: "start",
        });
      });
    }
  };

  const selectApplication = (nextIndex: number) => {
    const normalizedIndex =
      (nextIndex + APPLICATIONS.length) % APPLICATIONS.length;
    setActiveApplicationIndex(normalizedIndex);
  };

  const handleCapabilityKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const nextIndex = event.key === "ArrowLeft" ? index - 1 : index + 1;
      selectApplication(nextIndex);
      window.requestAnimationFrame(() => {
        document
          .getElementById(
            `capability-tab-${(nextIndex + APPLICATIONS.length) % APPLICATIONS.length}`,
          )
          ?.focus();
      });
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const nextIndex = event.key === "Home" ? 0 : APPLICATIONS.length - 1;
      selectApplication(nextIndex);
      window.requestAnimationFrame(() => {
        document.getElementById(`capability-tab-${nextIndex}`)?.focus();
      });
    }
  };

  const handleTaskCategoryKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      nextIndex =
        (index +
          (event.key === "ArrowLeft" ? -1 : 1) +
          TASK_PERFORMANCE_CATEGORIES.length) %
        TASK_PERFORMANCE_CATEGORIES.length;
    }

    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      nextIndex =
        event.key === "Home"
          ? 0
          : TASK_PERFORMANCE_CATEGORIES.length - 1;
    }

    if (nextIndex === null) return;

    const nextCategory = TASK_PERFORMANCE_CATEGORIES[nextIndex];
    if (!nextCategory) return;

    setActiveTaskCategory(nextCategory.id);
    window.requestAnimationFrame(() => {
      document
        .getElementById(`task-performance-tab-${nextCategory.id}`)
        ?.focus();
    });
  };

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("qwen-ui-agent-language");
      if (stored === "en" || stored === "zh") {
        const frame = window.requestAnimationFrame(() => setLanguage(stored));
        return () => window.cancelAnimationFrame(frame);
      }
    } catch {
      // Some browsers disable storage for pages opened directly from disk.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    try {
      window.localStorage.setItem("qwen-ui-agent-language", language);
    } catch {
      // Language switching still works when file-origin storage is unavailable.
    }
  }, [language]);

  return (
    <>
      <a className="skip-link" href="#main-content">
        {language === "zh" ? "跳转到正文" : "Skip to content"}
      </a>

      <header className="site-header">
        <div className="header-shell">
          <a className="site-brand" href="#top" aria-label="Qwen-UI-Agent home">
            <img
              className="brand-mark"
              src={siteAsset("/tongyi-mark.png")}
              alt=""
              width="34"
              height="34"
              aria-hidden="true"
            />
            <span className="brand-wordmark">Qwen-UI-Agent</span>
          </a>

          <nav
            className="site-nav"
            aria-label={language === "zh" ? "主导航" : "Primary navigation"}
          >
            {copy.nav.map((label, index) => (
              <a href={`#${sectionIds[index]}`} key={sectionIds[index]}>
                {label}
              </a>
            ))}
          </nav>

          <div className="language-switch" aria-label="Language">
            <button
              type="button"
              className={language === "en" ? "is-active" : ""}
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
            <span aria-hidden="true" />
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

      <main id="main-content">
        <section className="hero" id="top">
          <div className="page-shell hero-copy">
            <h1>
              <span className="hero-title-brand">Qwen-UI-Agent</span>
            </h1>
            <p className="hero-subtitle">{copy.subtitle}</p>
            <p className="hero-intro">{copy.hero}</p>
            <p className="hero-authors">
              <span>{authorTeam} ·</span>
              <span className="hero-author-organization">
                <img
                  src={siteAsset("/tongyi-mark.png")}
                  alt=""
                  width="18"
                  height="18"
                  aria-hidden="true"
                />
                <span>{authorOrganization}</span>
              </span>
            </p>

            <div className="hero-actions">
              <span className="report-button report-button-primary is-pending">
                <b>PDF</b>
                {copy.technicalReport}
                <small>{copy.comingSoon}</small>
              </span>
              <a className="report-button report-button-secondary" href="#demos">
                <span className="play-mark" aria-hidden="true">
                  ▶
                </span>
                {copy.watchDemos}
              </a>
            </div>
          </div>
        </section>

        <section
          className="section applications-section"
          id="applications"
        >
          <div className="page-shell">
            <SectionHeading
              title={copy.applicationsEyebrow}
              icon="capabilities"
            />
            <p className="section-statement">{copy.applicationsStatement}</p>

            <div
              className="capability-index"
              role="tablist"
              aria-label={
                language === "zh"
                  ? "Qwen-UI-Agent 能力"
                  : "Qwen-UI-Agent capabilities"
              }
            >
              {APPLICATIONS.map((application, index) => {
                const isActive = index === activeApplicationIndex;
                return (
                  <button
                    className="capability-tab"
                    id={`capability-tab-${index}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="capability-detail"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => selectApplication(index)}
                    onKeyDown={(event) =>
                      handleCapabilityKeyDown(event, index)
                    }
                    key={application.kind}
                  >
                    <span className="capability-tab-visual">
                      <CapabilityIndexIcon kind={application.kind} />
                    </span>
                    <span className="capability-tab-copy">
                      <small>{application.index}</small>
                      <strong>
                        {localize(application.title, language)}
                      </strong>
                    </span>
                  </button>
                );
              })}
            </div>

            <article
              className={`application-card application-detail application-${activeApplication.kind} is-active`}
              id="capability-detail"
              role="tabpanel"
              aria-labelledby={`capability-tab-${activeApplicationIndex}`}
            >
              <ApplicationVisual
                application={activeApplication}
                language={language}
                key={`${activeApplication.kind}-${language}`}
              />

              <div className="application-card-copy application-detail-copy">
                <div className="application-meta">
                  <span>
                    {language === "zh" ? "能力" : "CAPABILITY"}{" "}
                    {activeApplication.index}
                  </span>
                </div>
                <h3>{localize(activeApplication.title, language)}</h3>
                <p>{localize(activeApplication.body, language)}</p>
                <div className="application-detail-controls">
                  <button
                    type="button"
                    onClick={() =>
                      selectApplication(activeApplicationIndex - 1)
                    }
                    aria-label={
                      language === "zh"
                        ? "查看上一个能力"
                        : "Show previous capability"
                    }
                  >
                    ←
                  </button>
                  <span aria-live="polite">
                    {String(activeApplicationIndex + 1).padStart(2, "0")} /{" "}
                    {String(APPLICATIONS.length).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      selectApplication(activeApplicationIndex + 1)
                    }
                    aria-label={
                      language === "zh"
                        ? "查看下一个能力"
                        : "Show next capability"
                    }
                  >
                    →
                  </button>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="section results-section" id="performance">
          <div className="page-shell">
            <SectionHeading
              title={copy.resultsEyebrow}
              icon="performance"
            />

            <div className="benchmark-group-heading task-group-heading">
              <h3>{copy.taskResultsTitle}</h3>
            </div>

            <div
              className="task-performance-tabs"
              role="tablist"
              aria-label={
                language === "zh"
                  ? "按任务类型查看端到端性能"
                  : "End-to-end performance by task type"
              }
            >
              {TASK_PERFORMANCE_CATEGORIES.map((category, index) => {
                const isActive = category.id === activeTaskCategory;

                return (
                  <button
                    id={`task-performance-tab-${category.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`task-performance-panel-${category.id}`}
                    tabIndex={isActive ? 0 : -1}
                    className={isActive ? "is-active" : ""}
                    onClick={() => setActiveTaskCategory(category.id)}
                    onKeyDown={(event) =>
                      handleTaskCategoryKeyDown(event, index)
                    }
                    key={category.id}
                  >
                    <span>{localize(category.label, language)}</span>
                  </button>
                );
              })}
            </div>

            {TASK_PERFORMANCE_CATEGORIES.map((category) => {
              const benchmarks = PERFORMANCE_BENCHMARKS.filter(
                (benchmark) => benchmark.category === category.id,
              );
              const isActive = category.id === activeTaskCategory;

              return (
                <div
                  className={`performance-grid task-performance-grid${
                    isActive ? " is-active" : ""
                  }`}
                  id={`task-performance-panel-${category.id}`}
                  role="tabpanel"
                  aria-labelledby={`task-performance-tab-${category.id}`}
                  data-card-count={benchmarks.length}
                  hidden={!isActive}
                  key={category.id}
                >
                  {benchmarks.map((benchmark) => (
                    <PerformanceCard
                      benchmark={benchmark}
                      language={language}
                      key={benchmark.id}
                    />
                  ))}
                </div>
              );
            })}

            <div className="benchmark-group-heading grounding-group-heading">
              <h3>{copy.groundingTitle}</h3>
            </div>

            <div
              className="performance-grid grounding-performance-grid"
              data-desktop-columns="3"
              aria-describedby="grounding-result-note"
            >
              {GROUNDING_BENCHMARKS.map((benchmark) => (
                <PerformanceCard
                  benchmark={benchmark}
                  language={language}
                  key={benchmark.id}
                />
              ))}
            </div>

            <p
              className="grounding-result-note"
              id="grounding-result-note"
            >
              <strong aria-hidden="true">†</strong>
              <span>{copy.groundingFootnote}</span>
            </p>

            <div className="benchmark-group-heading broader-group-heading">
              <h3>{copy.broaderCapabilitiesTitle}</h3>
              <p className="broader-capabilities-intro">
                {copy.broaderCapabilitiesScope}
              </p>
            </div>

            <div className="general-ledger-grid performance-ledger-grid">
              {GENERAL_CAPABILITY_GROUPS.map((group) => {
                const isGeneral = group.id === "general";

                return (
                  <article className="capability-ledger" key={group.id}>
                    <div className="capability-ledger-head">
                      <span>0{isGeneral ? "1" : "2"}</span>
                      <div>
                        <h3>
                          {isGeneral
                            ? copy.generalReasoningTitle
                            : copy.generalAgenticTitle}
                        </h3>
                        <p>
                          {isGeneral
                            ? copy.generalReasoningLead
                            : copy.generalAgenticLead}
                        </p>
                      </div>
                    </div>

                    <p className="capability-table-mobile-hint">
                      {language === "zh"
                        ? "左右滑动查看全部模型 →"
                        : "Swipe horizontally to compare all models →"}
                    </p>
                    <div className="capability-table-wrap">
                      <table className="capability-table">
                        <thead>
                          <tr>
                            <th scope="col">{copy.benchmarkColumn}</th>
                            <th className="ours-column" scope="col">
                              {copy.oursColumn}
                            </th>
                            <th scope="col">{copy.baseColumn}</th>
                            {group.specialists.map((specialist) => (
                              <th scope="col" key={specialist.key}>
                                {specialist.name}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {group.rows.map((row) => (
                            <tr key={row.benchmark}>
                              <th scope="row">{row.benchmark}</th>
                              <td className="ours-column">
                                {row.ours.toFixed(1)}
                              </td>
                              <td>{row.base.toFixed(1)}</td>
                              {group.specialists.map((specialist) => {
                                const score =
                                  row.specialists[specialist.key];
                                return (
                                  <td key={specialist.key}>
                                    {score === undefined
                                      ? "—"
                                      : score.toFixed(1)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="general-protocol-note">
              <span>{language === "zh" ? "评测说明" : "EVALUATION NOTE"}</span>
              <p>{copy.generalProtocolNote}</p>
            </div>
          </div>
        </section>

        <section className="section demos-section" id="demos">
          <div className="page-shell">
            <SectionHeading
              title={copy.demosEyebrow}
              icon="demos"
            />

            <div className="demo-explorer">
              <div className="demo-selector-heading">
                <strong>{copy.demoSelectorLabel}</strong>
                <span>
                  <b>{String(DEMO_CATEGORIES.length).padStart(2, "0")}</b>{" "}
                  {copy.demoDomainCountLabel}
                </span>
              </div>

              <div
                className="demo-category-strip"
                role="tablist"
                aria-label={copy.demoSelectorLabel}
                style={
                  {
                    "--demo-domain-count": DEMO_CATEGORIES.length,
                  } as CSSProperties
                }
              >
                {DEMO_CATEGORIES.map((category, categoryIndex) => {
                  const isActive = category.id === activeDemo.group;

                  return (
                    <button
                      type="button"
                      className={`demo-category-button${isActive ? " is-active" : ""}`}
                      id={`demo-tab-${category.id}`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls="active-demo-panel"
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => selectDemoCategory(categoryIndex)}
                      onKeyDown={(event) => {
                        let nextIndex: number | null = null;
                        if (event.key === "ArrowLeft") {
                          nextIndex = categoryIndex - 1;
                        } else if (event.key === "ArrowRight") {
                          nextIndex = categoryIndex + 1;
                        } else if (event.key === "Home") {
                          nextIndex = 0;
                        } else if (event.key === "End") {
                          nextIndex = DEMO_CATEGORIES.length - 1;
                        }
                        if (nextIndex !== null) {
                          event.preventDefault();
                          const normalizedIndex =
                            selectDemoCategory(nextIndex);
                          window.requestAnimationFrame(() => {
                            document
                              .getElementById(
                                `demo-tab-${DEMO_CATEGORIES[normalizedIndex]?.id}`,
                              )
                              ?.focus();
                          });
                        }
                      }}
                      key={category.id}
                    >
                      <span className="demo-domain-index">
                        {category.index}
                      </span>
                      <span className="demo-domain-copy">
                        <strong>
                          {localize(category.label, language)}
                        </strong>
                        <small>
                          {localize(category.descriptor, language)}
                        </small>
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                className="demo-workflow-selector"
                role="group"
                aria-label={copy.demoCasesLabel}
              >
                <div className="demo-workflow-selector-heading">
                  <span>
                    <strong>{copy.demoCasesLabel}</strong>
                    <small>
                      {localize(activeDemoCategory.label, language)}
                    </small>
                  </span>
                </div>
                <div
                  className="demo-workflow-grid"
                  style={
                    {
                      "--workflow-count": activeCategoryVideos.length,
                    } as CSSProperties
                  }
                >
                  {activeCategoryVideos.map((video, index) => (
                    <button
                      type="button"
                      className={`availability-${video.availability}${
                        video.id === activeDemo.id ? " is-active" : ""
                      }`}
                      aria-pressed={video.id === activeDemo.id}
                      onClick={() => selectDemoWorkflow(video.id)}
                      key={video.id}
                    >
                      <small>{String(index + 1).padStart(2, "0")}</small>
                      <span className="demo-workflow-copy">
                        <strong>
                          {localize(video.caseLabel ?? video.title, language)}
                        </strong>
                        <em>{localize(video.instruction, language)}</em>
                      </span>
                      <i aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>

              <article
                className="demo-stage"
                id="active-demo-panel"
                role="tabpanel"
                aria-labelledby={`demo-tab-${activeDemo.group}`}
              >
                <div className="demo-stage-media">
                  <div
                    className={`video-frame${
                      activeDemo.containMedia ? " video-frame--contain" : ""
                    }${
                      activeDemo.portraitMedia ? " video-frame--portrait" : ""
                    }`}
                    style={
                      activeDemo.frameAspectRatio
                        ? { aspectRatio: activeDemo.frameAspectRatio }
                        : undefined
                    }
                  >
                    <DemoMedia
                      video={activeDemo}
                      language={language}
                      defaultPlaybackRate={
                        activeDemo.group === "real-device-mobile" ? 1.5 : 1
                      }
                      key={activeDemo.id}
                    />
                  </div>
                </div>

                <div className="demo-stage-copy">
                  <div className="demo-stage-meta">
                    <small aria-live="polite">
                      {copy.demoCaseLabel}{" "}
                      {String(activeWorkflowNumber).padStart(2, "0")} /{" "}
                      {String(activeCategoryVideos.length).padStart(2, "0")}
                    </small>
                  </div>

                  <h3>{localize(activeDemo.title, language)}</h3>
                  {activeDemo.subtitle ? (
                    <p className="demo-workflow-subtitle">
                      {localize(activeDemo.subtitle, language)}
                    </p>
                  ) : null}
                  <div className="demo-task-instruction">
                    <span>
                      {activeDemoInstructionHeading}
                    </span>
                    <blockquote>
                      {localize(activeDemo.instruction, language)}
                    </blockquote>
                  </div>
                  <p className="demo-domain-description">
                    {localize(activeDemoCategory.description, language)}
                  </p>
                  <p className="demo-stage-description">
                    {localize(activeDemo.description, language)}
                  </p>

                  {activeDemo.watchUrl ? (
                    <div className="demo-stage-source">
                      <a
                        href={activeDemo.watchUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {copy.openProvider} {activeDemo.provider} <Arrow />
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="citation-section" id="citation">
          <div className="page-shell citation-grid">
            <SectionHeading
              title={copy.citationEyebrow}
              icon="citation"
            />
            <div className="code-card">
              <div className="code-head">
                <span>BIBTEX · TEMPLATE</span>
                <CopyCitation text={citation} language={language} />
              </div>
              <pre>
                <code>{citation}</code>
              </pre>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="page-shell footer-grid">
          <a className="site-brand" href="#top">
            <img
              className="brand-mark"
              src={siteAsset("/tongyi-mark.png")}
              alt=""
              width="30"
              height="30"
              aria-hidden="true"
            />
            <span className="brand-wordmark">Qwen-UI-Agent</span>
          </a>
          <a href="#top">{language === "zh" ? "返回顶部 ↑" : "Back to top ↑"}</a>
        </div>
      </footer>
    </>
  );
}
