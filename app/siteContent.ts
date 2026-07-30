export type Language = "en" | "zh";

export type LocalizedText = {
  en: string;
  zh: string;
};

export const SITE_COPY = {
  en: {
    nav: ["Capabilities", "Performance", "Demos", "Citation"],
    subtitle: "Alibaba's Next-Generation Real-World-Centric GUI Agent",
    hero:
      "One agent for real phones, computers, and web browsers, with Deep Research capabilities—built to carry complex, multi-step work in the real world through to completion.",
    authors: "MAI-UI Team · Alibaba Token Hub",
    technicalReport: "Technical report",
    watchDemos: "Watch demos",
    applicationsEyebrow: "WHAT IT CAN DO",
    applicationsStatement:
      "Built to complete real work across GUI interfaces.",
    demosEyebrow: "DEMOS",
    demoSelectorLabel: "Choose a demo domain",
    demoCasesLabel: "Available workflows",
    demoDomainCountLabel: "domains",
    demoCaseLabel: "Demo case",
    demoTaskInstructionLabel: "Task instruction",
    demoPlannedInstructionLabel: "Planned task instruction",
    sampleVideo: "Preview",
    teamVideoSlot: "Team video slot",
    openProvider: "Open on",
    resultsEyebrow: "PERFORMANCE",
    taskResultsTitle: "End-to-End GUI Tasks",
    taskResultsScope:
      "From real phones to desktop tools and web browsers.",
    groundingTitle: "GUI Grounding",
    groundingScope: "Precise target selection across interface types.",
    groundingFootnote:
      "Author-reproduced result: the baseline was independently evaluated in the authors’ environment rather than copied from the model provider’s report.",
    broaderCapabilitiesTitle: "Broader Capabilities",
    broaderCapabilitiesScope:
      "Real-world tasks demand more than interface interaction—they also require knowledge, multimodal reasoning, instruction following, and tool use. Qwen-UI-Agent gains strong GUI capabilities without becoming a narrow GUI-only model, preserving the base model’s general reasoning and agentic strengths for broader tasks.",
    comparisonTitle: "Closed-source and open-weight model comparisons",
    legendOurs: "Qwen-UI-Agent",
    legendClosed: "Closed-source Model",
    legendSizeListed: "Open-weight Model",
    generalReasoningTitle: "Foundational reasoning",
    generalReasoningLead:
      "Multimodal understanding, knowledge, mathematics, and instruction following.",
    generalAgenticTitle: "Broader agentic work",
    generalAgenticLead:
      "Tool use, terminal tasks, multi-turn service work, coding workflows, and deep-research retrieval on BrowseComp (BC) and BrowseComp-ZH (BC-ZH).",
    generalProtocolNote:
      "All scores were independently reproduced in the authors' evaluation environment. Some harness, judge, simulator, runtime, or task-subset settings differ from official evaluations and are documented in the technical report.",
    benchmarkColumn: "Benchmark",
    baseColumn: "Qwen3.5-27B",
    oursColumn: "Qwen-UI-Agent",
    citationEyebrow: "CITATION",
    sourceNote:
      "Content and metrics are distilled from the current LaTeX draft. Values may change before release.",
  },
  zh: {
    nav: ["智能体能力", "性能指标", "演示", "引用"],
    subtitle: "阿里巴巴集团的新一代真实场景 GUI 智能体",
    hero:
      "一个智能体，覆盖真实手机、电脑和网页浏览器，并具备深度研究能力，能够在真实场景中把复杂的多步骤任务真正做完。",
    authors: "MAI-UI 团队 · Alibaba Token Hub",
    technicalReport: "技术报告",
    watchDemos: "观看演示",
    applicationsEyebrow: "它能做什么",
    applicationsStatement:
      "面向真实图形交互界面，帮你把工作真正搞定。",
    demosEyebrow: "演示",
    demoSelectorLabel: "选择演示领域",
    demoCasesLabel: "可选工作流",
    demoDomainCountLabel: "个领域",
    demoCaseLabel: "演示案例",
    demoTaskInstructionLabel: "任务指令",
    demoPlannedInstructionLabel: "规划中的任务指令",
    sampleVideo: "预览",
    teamVideoSlot: "团队视频槽位",
    openProvider: "前往",
    resultsEyebrow: "性能",
    taskResultsTitle: "端到端 GUI 任务",
    taskResultsScope: "覆盖真实手机、电脑与网页浏览器。",
    groundingTitle: "GUI 元素定位",
    groundingScope: "在不同界面中准确定位目标元素。",
    groundingFootnote:
      "作者复现结果：该基线由作者在自有评测环境中独立复测，而非直接引用模型提供方报告。",
    broaderCapabilitiesTitle: "更广泛的能力",
    broaderCapabilitiesScope:
      "真实世界的任务不止需要操作界面，还依赖知识理解、多模态推理、指令遵循与工具使用；只针对 GUI 进行优化，容易让模型变成狭窄的界面执行器。Qwen-UI-Agent 在获得强大 GUI 能力的同时，保留了基座模型的通用推理与智能体能力，在更广泛的任务上仍保持稳健表现。",
    comparisonTitle: "闭源模型与开放权重模型对比",
    legendOurs: "Qwen-UI-Agent",
    legendClosed: "闭源模型",
    legendSizeListed: "开放权重模型",
    generalReasoningTitle: "基础推理能力",
    generalReasoningLead:
      "覆盖多模态理解、知识、数学与指令遵循。",
    generalAgenticTitle: "增强更广泛的智能体能力",
    generalAgenticLead:
      "覆盖工具调用、终端任务、多轮服务、深度检索与编码工作流等智能体能力。",
    generalProtocolNote:
      "所有分数均由作者在自有评测环境中独立复现。部分 harness、judge、simulator、runtime 或任务子集设置与官方评测不同，具体差异将在技术报告中说明。",
    benchmarkColumn: "基准",
    baseColumn: "Qwen3.5-27B",
    oursColumn: "Qwen-UI-Agent",
    citationEyebrow: "引用",
    sourceNote: "内容与指标来自当前 LaTeX 草稿，正式发布前仍可能调整。",
  },
} as const;

export const APPLICATIONS: Array<{
  index: string;
  kind:
    | "mobile"
    | "computer"
    | "gui-cli"
    | "browser"
    | "research"
    | "proactive";
  label: LocalizedText;
  title: LocalizedText;
  body: LocalizedText;
  imageAlt: LocalizedText;
  caseTitle: LocalizedText;
  caseInstruction: LocalizedText;
  caseSteps: LocalizedText[];
  visual:
    | { type: "mobile-ui" }
    | {
        type: "video";
        src: string;
        poster: string;
        playbackRate?: number;
      }
    | { type: "gui-cli" }
    | {
        type: "browser-capture";
        images: Array<{
          src: string;
          aspectRatio: number;
          zoom?: number;
          marker?: { x: number; y: number };
          label: LocalizedText;
        }>;
      }
    | { type: "research-flow" }
    | { type: "proactive-flow" }
    | { type: "image"; src: string; position?: string };
}> = [
  {
    index: "01",
    kind: "mobile",
    label: {
      en: "MOBILE GUI USE",
      zh: "手机 GUI 操作",
    },
    title: {
      en: "Mobile GUI Use",
      zh: "手机 GUI 操作",
    },
    body: {
      en: "Optimized for everyday tasks in real-device mobile GUI use, the model navigates changing Android apps, accounts, content, and network conditions to search, compare, schedule, shop, and coordinate reliably.",
      zh: "针对真机移动 GUI 中的日常任务进行优化，能够应对不断变化的 Android 应用、账号、内容与网络环境，可靠完成搜索、比较、日程、购物和协同。",
    },
    imageAlt: {
      en: "A bilingual mobile case scheduling an airport ride under time and budget constraints before requesting approval",
      zh: "在时间与预算约束下预约机场用车并在下单前请求确认的双语手机案例",
    },
    caseTitle: {
      en: "Airport ride with time and budget constraints",
      zh: "带时间与预算约束的机场用车",
    },
    caseInstruction: {
      en: "Schedule a ride to Beijing Capital Airport T3 for tomorrow at 06:30. Choose the fastest option under CNY 100 and ask me before booking.",
      zh: "预约明天 06:30 前往首都机场 T3 的用车；选择 100 元以内最快的车型，并在下单前让我确认。",
    },
    caseSteps: [
      { en: "Set route & time", zh: "设置路线与时间" },
      { en: "Apply budget", zh: "应用预算约束" },
      { en: "Compare price & ETA", zh: "比较价格与 ETA" },
      { en: "Request approval", zh: "请求用户确认" },
    ],
    visual: { type: "mobile-ui" },
  },
  {
    index: "02",
    kind: "computer",
    label: { en: "COMPUTER USE", zh: "电脑 GUI 操作" },
    title: {
      en: "Computer Use",
      zh: "电脑 GUI 操作",
    },
    body: {
      en: "Operate desktop apps, files, menus, and system tools through visual interaction across long-horizon workflows.",
      zh: "通过视觉交互操作桌面应用、文件、菜单与系统工具，完成长程工作流。",
    },
    imageAlt: {
      en: "Qwen-UI-Agent editing an Excel workbook in a desktop workflow",
      zh: "Qwen-UI-Agent 在桌面工作流中调整 Excel 表格与图表",
    },
    caseTitle: {
      en: "Update a sales report in Excel",
      zh: "在 Excel 中更新销售报告",
    },
    caseInstruction: {
      en: "Update the monthly sales figures, repair the chart range, verify the totals, and save the reviewed workbook.",
      zh: "更新月度销售数据，修复图表范围，核对汇总数字，并保存审核后的工作簿。",
    },
    caseSteps: [
      { en: "Update data", zh: "更新数据" },
      { en: "Fix the chart", zh: "调整图表" },
      { en: "Save workbook", zh: "保存工作簿" },
    ],
    visual: {
      type: "video",
      src: "/demos/computer-excel-preview.mp4",
      poster: "/demos/computer-excel-poster.jpg",
      playbackRate: 1.3,
    },
  },
  {
    index: "03",
    kind: "gui-cli",
    label: { en: "COMPUTER GUI + CLI", zh: "电脑 GUI + CLI" },
    title: {
      en: "Computer GUI + CLI",
      zh: "电脑 GUI + CLI 协同",
    },
    body: {
      en: "Use GUI controls for file and spreadsheet work while CLI tools handle batch extraction, matching, and validation.",
      zh: "在文件管理器和 Excel 中完成可视化操作，用 CLI 批量提取、匹配与校验数据。",
    },
    imageAlt: {
      en: "A bilingual business-trip expense case that selects receipts in a file manager, reconciles them in a terminal, and reviews exceptions in Excel",
      zh: "在文件管理器中选择票据、通过终端对账，并在 Excel 中复核异常项的双语出差报销案例",
    },
    caseTitle: {
      en: "Reconcile a business-trip expense claim",
      zh: "完成一份出差报销对账",
    },
    caseInstruction: {
      en: "Reconcile my Singapore client trip: extract eight receipt PDFs, match them to the corporate-card statement, convert SGD with the company rate, flag unmatched charges, and update the Excel claim for review.",
      zh: "整理我的新加坡客户拜访报销：提取 8 份票据，与公司卡账单匹配，按公司汇率将新币换算成人民币，标记未匹配费用，并更新 Excel 报销单供审核。",
    },
    caseSteps: [
      { en: "Select receipts & statement", zh: "选择票据与账单" },
      { en: "Extract & reconcile in CLI", zh: "CLI 提取并对账" },
      { en: "Write back to Excel", zh: "写回 Excel" },
      { en: "Review the exception", zh: "审核异常项" },
    ],
    visual: { type: "gui-cli" },
  },
  {
    index: "04",
    kind: "browser",
    label: { en: "BROWSER USE", zh: "网页浏览器操作" },
    title: {
      en: "Browser Use",
      zh: "网页浏览器操作",
    },
    body: {
      en: "Turn a focused information request into reliable web search and source navigation, then locate the evidence the user asked for.",
      zh: "把明确的信息需求转化为可靠的网页检索与来源导航，找到用户需要的证据。",
    },
    imageAlt: {
      en: "Qwen-UI-Agent searching the web for Alphabet's latest growth report and opening a relevant source",
      zh: "Qwen-UI-Agent 在网页中查询 Alphabet 最新增长报告并打开相关来源",
    },
    caseTitle: {
      en: "Look up Alphabet's latest growth report",
      zh: "查询 Alphabet 最新增长报告",
    },
    caseInstruction: {
      en: "Search for Alphabet's latest growth report, open a reliable source, and locate the reported revenue and growth figures.",
      zh: "搜索 Alphabet 最新增长报告，打开可靠来源，并找到其中披露的营收与增长数据。",
    },
    caseSteps: [
      { en: "Search the web", zh: "发起网页搜索" },
      { en: "Open a reliable source", zh: "打开可靠来源" },
      { en: "Locate growth figures", zh: "定位增长数据" },
    ],
    visual: {
      type: "video",
      src: "/demos/cua-google-preview.mp4",
      poster: "/demos/cua-google-poster.jpg",
      playbackRate: 1.45,
    },
  },
  {
    index: "05",
    kind: "research",
    label: { en: "DEEP RESEARCH + GUI", zh: "深度研究 + GUI" },
    title: {
      en: "Deep Research + GUI",
      zh: "深度研究 + GUI 执行",
    },
    body: {
      en: "Research, compare, and verify information across sources—then let the GUI agent open the selected result in a desktop app and continue the real workflow.",
      zh: "先跨来源检索、比较并核验信息，再由 GUI 智能体在电脑应用中打开选定结果，继续完成真实操作流程。",
    },
    imageAlt: {
      en: "A bilingual Deep Research case that selects the researched restaurant in Google Maps and navigates through a desktop GUI to its reservation page",
      zh: "完成餐厅深度调研后，在 Google Maps 中选中目标餐厅，并通过电脑 GUI 导航到订位页面的双语案例",
    },
    caseTitle: {
      en: "Research a team dinner, then prepare the booking",
      zh: "调研团队晚餐，并准备订位",
    },
    caseInstruction: {
      en: "Find a quiet restaurant near the conference venue for six people tomorrow at 19:30, under CNY 200 per person. Cross-check reviews, menu prices, and live availability, open the best option in Google Maps, then navigate to its reservation page.",
      zh: "寻找会场附近适合 6 人明晚 19:30 聚餐的安静餐厅，人均不超过 200 元；交叉核验评价、菜单价格与实时余位，在 Google Maps 中打开最佳餐厅，再导航到对应的订位页面。",
    },
    caseSteps: [
      { en: "Search 12 pages", zh: "检索 12 个页面" },
      { en: "Cross-check evidence", zh: "交叉核验证据" },
      { en: "Select in Google Maps", zh: "在 Google Maps 中选中" },
      { en: "Open reservation page", zh: "打开订位页面" },
    ],
    visual: {
      type: "research-flow",
    },
  },
  {
    index: "06",
    kind: "proactive",
    label: { en: "PROACTIVE SERVICE", zh: "主动服务" },
    title: {
      en: "Proactive Service",
      zh: "主动服务",
    },
    body: {
      en: "Monitor notifications, identify events that need attention, and use context to proactively offer recommendations, alternatives, and next steps; consequential actions still wait for user approval.",
      zh: "监测设备通知，从中识别需要处理的事件，并结合上下文直接给出建议、备选方案与下一步操作；关键动作仍由用户确认。",
    },
    imageAlt: {
      en: "A bilingual proactive-service case detecting a cancelled flight, proactively researching alternatives, and presenting GUI choices for approval",
      zh: "检测航班取消、主动查询备选方案，并通过 GUI 提供待确认选项的双语主动服务案例",
    },
    caseTitle: {
      en: "Proactively recover from a cancelled flight",
      zh: "主动处理航班取消",
    },
    caseInstruction: {
      en: "Standing instruction: if a travel disruption appears in my notifications, preserve my 14:00 meeting, research live alternatives, and ask me before changing the itinerary.",
      zh: "长期指令：如果通知中出现行程异常，优先保证我的 14:00 会议，主动查询实时备选方案，并在更改行程前让我确认。",
    },
    caseSteps: [
      { en: "Monitor notifications", zh: "监测设备通知" },
      { en: "Read trip constraints", zh: "读取行程约束" },
      { en: "Query live alternatives", zh: "查询实时备选" },
      { en: "Present GUI choices", zh: "呈现 GUI 选项" },
    ],
    visual: {
      type: "proactive-flow",
    },
  },
];

export type PerformanceAccess = "ours" | "closed" | "size-listed";

export const MODEL_ORGANIZATIONS: Record<
  string,
  { name: string; mark: string; logo?: string }
> = {
  "Qwen-UI-Agent 27B": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "Seed 2.1 Pro": {
    name: "ByteDance Seed",
    mark: "S",
    logo: "/brand-logos/bytedance.svg",
  },
  "Seed 2.0 Pro": {
    name: "ByteDance Seed",
    mark: "S",
    logo: "/brand-logos/bytedance.svg",
  },
  "Gemini 3.5 Flash": {
    name: "Google",
    mark: "G",
    logo: "/brand-logos/gemini-user.webp",
  },
  "Gemini 3.1 Pro": {
    name: "Google",
    mark: "G",
    logo: "/brand-logos/gemini-user.webp",
  },
  "GPT-5.6 Sol": {
    name: "OpenAI",
    mark: "OAI",
    logo: "/brand-logos/openai.svg",
  },
  "GPT-5.5": {
    name: "OpenAI",
    mark: "OAI",
    logo: "/brand-logos/openai.svg",
  },
  "Claude Opus 4.8": {
    name: "Anthropic",
    mark: "A",
    logo: "/brand-logos/anthropic-user.webp",
  },
  "Claude Opus 4.7": {
    name: "Anthropic",
    mark: "A",
    logo: "/brand-logos/anthropic-user.webp",
  },
  "Claude Opus 4.5": {
    name: "Anthropic",
    mark: "A",
    logo: "/brand-logos/anthropic-user.webp",
  },
  "Qwen 3.7 Plus": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "Qwen3.5 397B-A17B": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "Qwen3.5 27B": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "Kimi K2.6": {
    name: "Moonshot AI",
    mark: "K",
    logo: "/brand-logos/kimi.svg",
  },
  "Kimi K2.5": {
    name: "Kimi Team",
    mark: "K",
    logo: "/brand-logos/kimi.svg",
  },
  "MiniMax M3": {
    name: "MiniMax",
    mark: "M",
    logo: "/brand-logos/minimax.svg",
  },
  "GUI-Owl-1.5 32B-Instruct": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "GUI-Owl-1.5 32B": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "UI-Venus-1.5 30B-A3B": {
    name: "Ant Group",
    mark: "ANT",
    logo: "/brand-logos/antgroup.svg",
  },
  "MAI-UI-32B": {
    name: "Alibaba",
    mark: "Q",
    logo: "/brand-logos/qwen.svg",
  },
  "Apodex-1.0-mini 35B-A3B": {
    name: "Apodex",
    mark: "AP",
    logo: "/brand-logos/apodex.webp",
  },
  "GLM-4.7 358B": {
    name: "Z.ai",
    mark: "Z",
    logo: "/brand-logos/zai.svg",
  },
  "DeepSeek-V3.2 685B": {
    name: "DeepSeek-AI",
    mark: "DS",
    logo: "/brand-logos/deepseek.svg",
  },
  "Tongyi-DR 30B-A3B": {
    name: "Tongyi DeepResearch",
    mark: "T",
    logo: "/brand-logos/alibaba.svg",
  },
  "UI-TARS-2 230B-A23B": {
    name: "ByteDance Seed",
    mark: "S",
    logo: "/brand-logos/bytedance.svg",
  },
  "GELab-Zero 4B": {
    name: "StepFun",
    mark: "SG",
    logo: "/brand-logos/stepfun.svg",
  },
  "CUA-GYM A17B": { name: "CUA-GYM Team", mark: "CG" },
};

export type PerformanceBenchmark = {
  id: string;
  benchmark: string;
  domain: LocalizedText;
  metric: LocalizedText;
  axisRange?: {
    min: number;
    max: number;
  };
  href?: string;
  linkLabel?: LocalizedText;
  entries: Array<{
    name: string;
    value: number;
    displayValue?: string;
    access: PerformanceAccess;
  }>;
};

export type TaskPerformanceCategory =
  | "mobile"
  | "computer"
  | "browser";

export const TASK_PERFORMANCE_CATEGORIES: Array<{
  id: TaskPerformanceCategory;
  label: LocalizedText;
}> = [
  {
    id: "mobile",
    label: { en: "Mobile GUI Use", zh: "移动 GUI 操作" },
  },
  {
    id: "computer",
    label: { en: "Computer Use", zh: "电脑 GUI 操作" },
  },
  {
    id: "browser",
    label: { en: "Browser Use", zh: "网页浏览器操作" },
  },
];

export type TaskPerformanceBenchmark = PerformanceBenchmark & {
  category: TaskPerformanceCategory;
};

export const PERFORMANCE_BENCHMARKS: TaskPerformanceBenchmark[] = [
  {
    id: "mobileworld",
    category: "mobile",
    benchmark: "MobileWorld",
    domain: { en: "MOBILE GUI USE", zh: "移动 GUI 操作" },
    metric: {
      en: "GUI-Only Success rate (%)",
      zh: "GUI-Only 成功率（%）",
    },
    entries: [
      {
        name: "Qwen-UI-Agent 27B",
        value: 82.1,
        access: "ours",
      },
      { name: "Seed 2.1 Pro", value: 73.2, access: "closed" },
      { name: "GPT-5.6 Sol", value: 70.1, access: "closed" },
      { name: "Claude Opus 4.8", value: 67.5, access: "closed" },
      { name: "Qwen 3.7 Plus", value: 62.3, access: "closed" },
      { name: "Gemini 3.1 Pro", value: 58.1, access: "closed" },
    ],
  },
  {
    id: "mobileworld-real",
    category: "mobile",
    benchmark: "MobileWorld-Real",
    domain: {
      en: "REAL-DEVICE MOBILE GUI USE",
      zh: "手机真机 GUI 操作",
    },
    metric: { en: "Success rate (%)", zh: "成功率（%）" },
    href: "/mobileworld-real/",
    linkLabel: {
      en: "Learn about this benchmark",
      zh: "了解此基准",
    },
    entries: [
      {
        name: "Qwen-UI-Agent 27B",
        value: 92.2,
        access: "ours",
      },
      { name: "Seed 2.1 Pro", value: 88.7, access: "closed" },
      { name: "Gemini 3.1 Pro", value: 86.2, access: "closed" },
      { name: "GPT-5.6 Sol", value: 85.4, access: "closed" },
      { name: "Claude Opus 4.8", value: 84.7, access: "closed" },
      { name: "Qwen 3.7 Plus", value: 72.7, access: "closed" },
    ],
  },
  {
    id: "android-daily",
    category: "mobile",
    benchmark: "AndroidDaily",
    domain: {
      en: "REAL-DEVICE MOBILE GUI USE",
      zh: "手机真机 GUI 操作",
    },
    metric: { en: "Success rate (%)", zh: "成功率（%）" },
    entries: [
      {
        name: "Qwen-UI-Agent 27B",
        value: 97.5,
        access: "ours",
      },
      { name: "Seed 2.1 Pro", value: 95.2, access: "closed" },
      { name: "Gemini 3.1 Pro", value: 93.8, access: "closed" },
      { name: "Claude Opus 4.8", value: 93.0, access: "closed" },
      { name: "GPT-5.6 Sol", value: 92.6, access: "closed" },
      { name: "Qwen 3.7 Plus", value: 79.8, access: "closed" },
    ],
  },
  {
    id: "osworld-verified",
    category: "computer",
    benchmark: "OSWorld-Verified",
    domain: { en: "COMPUTER USE", zh: "电脑操作" },
    metric: { en: "Benchmark score (%)", zh: "基准得分（%）" },
    entries: [
      {
        name: "Qwen-UI-Agent 27B",
        value: 79.5,
        access: "ours",
      },
      { name: "Claude Opus 4.8", value: 83.4, access: "closed" },
      { name: "Seed 2.1 Pro", value: 78.8, access: "closed" },
      { name: "GPT-5.5", value: 78.7, access: "closed" },
      { name: "Gemini 3.1 Pro", value: 76.2, access: "closed" },
      { name: "Qwen 3.7 Plus", value: 73.3, access: "closed" },
    ],
  },
  {
    id: "osworld-v2",
    category: "computer",
    benchmark: "OSWorld-v2",
    domain: {
      en: "LONG-HORIZON COMPUTER USE",
      zh: "长程电脑操作",
    },
    metric: { en: "Partial progress (%)", zh: "部分任务进度（%）" },
    axisRange: { min: 0, max: 60 },
    entries: [
      {
        name: "Qwen-UI-Agent 27B",
        value: 40.0,
        access: "ours",
      },
      { name: "Claude Opus 4.8", value: 54.8, access: "closed" },
      { name: "GPT-5.5", value: 49.5, access: "closed" },
      { name: "MiniMax M3", value: 22.3, access: "size-listed" },
      { name: "Kimi K2.6", value: 22.1, access: "size-listed" },
      { name: "Qwen 3.7 Plus", value: 21.5, access: "closed" },
    ],
  },
  {
    id: "webarena",
    category: "browser",
    benchmark: "WebArena",
    domain: { en: "BROWSER USE", zh: "网页浏览器操作" },
    metric: { en: "Success rate (%)", zh: "成功率（%）" },
    entries: [
      {
        name: "Qwen-UI-Agent 27B",
        value: 73.6,
        access: "ours",
      },
      { name: "Claude Opus 4.8", value: 71.9, access: "closed" },
      { name: "GPT-5.5", value: 69.5, access: "closed" },
      { name: "Gemini 3.1 Pro", value: 65.3, access: "closed" },
      { name: "Qwen 3.7 Plus", value: 59.0, access: "closed" },
      {
        name: "GUI-Owl-1.5 32B",
        value: 48.4,
        access: "size-listed",
      },
    ],
  },
];

export type GroundingMetricId =
  | "ssp-native"
  | "ssp-zoom"
  | "ssv2"
  | "mmbench-l2"
  | "osworld-g"
  | "ui-vision";

export const GROUNDING_METRICS: Array<{
  id: GroundingMetricId;
  benchmark: string;
  setting: LocalizedText;
  axisRange: {
    min: number;
    max: number;
  };
}> = [
  {
    id: "ssp-native",
    benchmark: "ScreenSpot-Pro",
    setting: { en: "No zoom", zh: "无缩放" },
    axisRange: { min: 60, max: 80 },
  },
  {
    id: "ssp-zoom",
    benchmark: "ScreenSpot-Pro",
    setting: { en: "Zoom-in", zh: "局部放大" },
    axisRange: { min: 65, max: 85 },
  },
  {
    id: "ssv2",
    benchmark: "SS-V2",
    setting: { en: "Grounding score", zh: "定位得分" },
    axisRange: { min: 90, max: 100 },
  },
  {
    id: "mmbench-l2",
    benchmark: "MM-GUI-L2",
    setting: { en: "Grounding score", zh: "定位得分" },
    axisRange: { min: 80, max: 100 },
  },
  {
    id: "osworld-g",
    benchmark: "OSW-G-R",
    setting: { en: "Desktop grounding", zh: "桌面定位" },
    axisRange: { min: 65, max: 85 },
  },
  {
    id: "ui-vision",
    benchmark: "UI-Vision",
    setting: { en: "Grounding score", zh: "定位得分" },
    axisRange: { min: 40, max: 80 },
  },
];

export const GROUNDING_MODELS: Array<{
  name: string;
  access: PerformanceAccess;
  authorEvaluated?: boolean;
  scores: Record<GroundingMetricId, number | null>;
}> = [
  {
    name: "Qwen-UI-Agent 27B",
    access: "ours",
    scores: {
      "ssp-native": 76.6,
      "ssp-zoom": 81.5,
      ssv2: 97.5,
      "mmbench-l2": 92.6,
      "osworld-g": 78.5,
      "ui-vision": 70.0,
    },
  },
  {
    name: "Seed 2.1 Pro",
    access: "closed",
    authorEvaluated: true,
    scores: {
      "ssp-native": 65.3,
      "ssp-zoom": 80.7,
      ssv2: 96.6,
      "mmbench-l2": 90.9,
      "osworld-g": 78.0,
      "ui-vision": 62.0,
    },
  },
  {
    name: "Qwen 3.7 Plus",
    access: "closed",
    authorEvaluated: true,
    scores: {
      "ssp-native": 68.9,
      "ssp-zoom": 79.0,
      ssv2: 96.6,
      "mmbench-l2": 90.5,
      "osworld-g": 78.2,
      "ui-vision": 68.0,
    },
  },
  {
    name: "GUI-Owl-1.5 32B",
    access: "size-listed",
    scores: {
      "ssp-native": 72.9,
      "ssp-zoom": 80.3,
      ssv2: 95.3,
      "mmbench-l2": 86.8,
      "osworld-g": 69.7,
      "ui-vision": null,
    },
  },
  {
    name: "UI-Venus-1.5 30B-A3B",
    access: "size-listed",
    scores: {
      "ssp-native": 69.6,
      "ssp-zoom": 74.8,
      ssv2: 96.2,
      "mmbench-l2": 88.6,
      "osworld-g": 70.6,
      "ui-vision": 54.7,
    },
  },
  {
    name: "MAI-UI-32B",
    access: "size-listed",
    scores: {
      "ssp-native": 67.9,
      "ssp-zoom": 73.5,
      ssv2: 96.5,
      "mmbench-l2": 91.3,
      "osworld-g": 75.0,
      "ui-vision": 47.1,
    },
  },
];

export const GROUNDING_BENCHMARKS: PerformanceBenchmark[] =
  GROUNDING_METRICS.map((metric) => ({
    id: `grounding-${metric.id}`,
    benchmark:
      metric.id === "ssp-native"
        ? "ScreenSpot-Pro · No zoom"
        : metric.id === "ssp-zoom"
          ? "ScreenSpot-Pro · Zoom-in"
          : metric.benchmark,
    domain: { en: "GUI GROUNDING", zh: "GUI 元素定位" },
    metric: {
      en: "Grounding score (%)",
      zh: "定位得分（%）",
    },
    axisRange: metric.axisRange,
    entries: GROUNDING_MODELS.flatMap((model) => {
      const value = model.scores[metric.id];

      return value === null
        ? []
        : [
            {
              name: model.name,
              value,
              displayValue: `${value.toFixed(1)}${
                model.authorEvaluated ? "†" : ""
              }`,
              access: model.access,
            },
          ];
    }).sort((left, right) => right.value - left.value),
  }));

export type SpecialistKey = "guiOwl" | "uiVenus" | "openCUA";

export const GENERAL_CAPABILITY_GROUPS: Array<{
  id: "general" | "agentic";
  specialists: Array<{ key: SpecialistKey; name: string }>;
  rows: Array<{
    benchmark: string;
    base: number;
    ours: number;
    specialists: Partial<Record<SpecialistKey, number>>;
  }>;
}> = [
  {
    id: "general",
    specialists: [
      { key: "uiVenus", name: "UI-Venus 30B-A3B" },
      { key: "guiOwl", name: "GUI-Owl 32B" },
      { key: "openCUA", name: "OpenCUA-72B" },
    ],
    rows: [
      {
        benchmark: "MMMU-Pro",
        base: 73.5,
        ours: 72.4,
        specialists: { uiVenus: 32.4, guiOwl: 39.5, openCUA: 31.0 },
      },
      {
        benchmark: "RealWorldQA",
        base: 83.1,
        ours: 83.1,
        specialists: { uiVenus: 75.3, guiOwl: 76.7, openCUA: 66.4 },
      },
      {
        benchmark: "CharXiv-RQ",
        base: 76.8,
        ours: 77.7,
        specialists: { uiVenus: 44.7, guiOwl: 50.9, openCUA: 39.6 },
      },
      {
        benchmark: "MathVision",
        base: 82.0,
        ours: 82.8,
        specialists: { uiVenus: 36.8, guiOwl: 50.6, openCUA: 26.6 },
      },
      {
        benchmark: "AI2D_TEST",
        base: 91.9,
        ours: 91.1,
        specialists: { uiVenus: 84.3, guiOwl: 84.8, openCUA: 78.9 },
      },
      {
        benchmark: "MMLU-Pro",
        base: 86.0,
        ours: 86.5,
        specialists: { uiVenus: 65.6, guiOwl: 73.9, openCUA: 58.8 },
      },
      {
        benchmark: "IFEval (prompt-level strict)",
        base: 90.4,
        ours: 90.2,
        specialists: { uiVenus: 81.3, guiOwl: 84.5, openCUA: 70.6 },
      },
    ],
  },
  {
    id: "agentic",
    specialists: [
      { key: "uiVenus", name: "UI-Venus 30B-A3B" },
      { key: "guiOwl", name: "GUI-Owl 32B" },
      { key: "openCUA", name: "OpenCUA-72B" },
    ],
    rows: [
      {
        benchmark: "Tau2-Bench",
        base: 89.2,
        ours: 89.9,
        specialists: { uiVenus: 22.7, guiOwl: 6.1, openCUA: 14.4 },
      },
      {
        benchmark: "Terminal-Bench 2.0 · Avg 5",
        base: 41.1,
        ours: 50.1,
        specialists: { uiVenus: 3.2, guiOwl: 0.0, openCUA: 9.0 },
      },
      {
        benchmark: "Claw-Eval · Avg 3",
        base: 66.9,
        ours: 73.5,
        specialists: { uiVenus: 30.6, guiOwl: 29.6, openCUA: 26.4 },
      },
      {
        benchmark: "Claw-Eval · Pass@3",
        base: 41.2,
        ours: 51.8,
        specialists: { uiVenus: 5.5, guiOwl: 5.5, openCUA: 0.5 },
      },
      {
        benchmark: "BFCL-v4",
        base: 71.3,
        ours: 74.2,
        specialists: { uiVenus: 19.8, guiOwl: 32.7, openCUA: 28.3 },
      },
      {
        benchmark: "SkillsBench · Avg 5",
        base: 24.9,
        ours: 28.0,
        specialists: { uiVenus: 0.5, guiOwl: 0.3, openCUA: 0.0 },
      },
      {
        benchmark: "QwenClawBench · Avg 3",
        base: 48.5,
        ours: 44.2,
        specialists: { uiVenus: 6.4, guiOwl: 5.1, openCUA: 11.4 },
      },
      {
        benchmark: "BrowseComp (BC)",
        base: 61.0,
        ours: 64.1,
        specialists: {},
      },
      {
        benchmark: "BrowseComp-ZH (BC-ZH)",
        base: 62.1,
        ours: 75.0,
        specialists: {},
      },
    ],
  },
];

export const METHOD_STEPS: Array<{
  index: string;
  title: LocalizedText;
  body: LocalizedText;
  stat: string;
}> = [
  {
    index: "01",
    title: { en: "Environment infrastructure", zh: "环境基础设施" },
    body: {
      en: "Sandboxes across mobile, computer, web, and DeepSearch, plus a governed real-device runtime.",
      zh: "覆盖手机、电脑、网页与 DeepSearch 的沙箱，以及可治理的真实设备运行时。",
    },
    stat: "≈10K concurrent",
  },
  {
    index: "02",
    title: { en: "Agent-driven data flywheel", zh: "Agent 驱动的数据飞轮" },
    body: {
      en: "Agents build tasks, environments, verifiers, diagnoses, and the next iteration plan.",
      zh: "由 Agent 构造任务、环境、verifier、失败诊断与下一轮迭代计划。",
    },
    stat: "≈10K task-verifier pairs",
  },
  {
    index: "03",
    title: { en: "SFT + ActionRL + Online RL", zh: "SFT + ActionRL + 在线 RL" },
    body: {
      en: "Domain experts are merged, recurring action errors are corrected, and long-horizon outcomes are optimized.",
      zh: "合并领域专家，纠正常见动作错误，并对长程任务结果进行优化。",
    },
    stat: "100+ step trajectories",
  },
  {
    index: "04",
    title: { en: "Proactive harness", zh: "主动式 Harness" },
    body: {
      en: "Notification-driven service initiation, shared state, cross-platform planning, and explicit user approval.",
      zh: "基于通知主动发起服务，维护共享状态，跨平台规划，并保留用户确认边界。",
    },
    stat: "Mobile + Desktop + Search",
  },
];

export const EVIDENCE_FIGURES: Array<{
  id: string;
  src: string;
  width: number;
  height: number;
  featured?: boolean;
  label: LocalizedText;
  title: LocalizedText;
  caption: LocalizedText;
}> = [
  {
    id: "trajectory",
    src: "/report/demo-trajectory.webp",
    width: 2200,
    height: 986,
    featured: true,
    label: { en: "APPLICATION TRAJECTORY", zh: "应用轨迹" },
    title: {
      en: "From a flight cancellation to a cross-platform recovery plan",
      zh: "从航班取消到跨平台行程恢复方案",
    },
    caption: {
      en: "Search, user approval, mobile rebooking, and desktop schedule recovery stay within one continuous task.",
      zh: "信息检索、用户确认、手机端改签与电脑端日程恢复，共同构成一条连续任务。",
    },
  },
  {
    id: "mobileworld-real",
    src: "/report/mobileworld-real-profile.webp",
    width: 2400,
    height: 1852,
    label: { en: "REAL MOBILE BENCHMARK", zh: "真实手机评测" },
    title: {
      en: "409 tasks across 104 live Android apps",
      zh: "409 个任务，覆盖 104 款在线 Android 应用",
    },
    caption: {
      en: "MobileWorld-Real covers seven domains and 35 task intents on changing, real-world interfaces.",
      zh: "MobileWorld-Real 覆盖七大领域与 35 类任务意图，并运行在持续变化的真实界面中。",
    },
  },
  {
    id: "harness",
    src: "/report/harness.webp",
    width: 2200,
    height: 990,
    label: { en: "CROSS-PLATFORM HARNESS", zh: "跨平台 HARNESS" },
    title: {
      en: "One task across phone, computer, search, and user approval",
      zh: "一个任务跨越手机、电脑、检索与用户确认",
    },
    caption: {
      en: "Shared context and execution state connect proactive service to cross-platform completion.",
      zh: "共享上下文与执行状态，把主动服务连接到跨平台任务完成。",
    },
  },
  {
    id: "real-device",
    src: "/report/real-device.webp",
    width: 1900,
    height: 983,
    label: { en: "REAL-DEVICE RUNTIME", zh: "真实设备运行时" },
    title: {
      en: "Governed execution on physical devices",
      zh: "可治理的真实设备执行",
    },
    caption: {
      en: "Health-aware scheduling, evidence review, and failure handling keep real-device experience usable.",
      zh: "健康感知调度、轨迹证据审阅与故障处理，让真实设备经验可持续使用。",
    },
  },
  {
    id: "flywheel",
    src: "/report/data-flywheel.webp",
    width: 1900,
    height: 965,
    label: { en: "DATA FLYWHEEL", zh: "数据飞轮" },
    title: {
      en: "Agents build tasks and learn from failures",
      zh: "由 Agent 构造任务并从失败中学习",
    },
    caption: {
      en: "Evaluation, diagnosis, targeted task generation, and training form a continuous capability loop.",
      zh: "评测、诊断、针对性任务生成与训练，共同形成持续迭代的能力闭环。",
    },
  },
];

export type DemoCategory =
  | "real-device-mobile"
  | "computer"
  | "cross-device"
  | "mobile-deep-research"
  | "proactive-service";

export const DEMO_CATEGORIES: Array<{
  id: DemoCategory;
  index: string;
  label: LocalizedText;
  descriptor: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: "real-device-mobile",
    index: "01",
    label: { en: "Real-device Mobile Use", zh: "真实手机操作" },
    descriptor: { en: "Live apps & GUI", zh: "真实应用与 GUI" },
    description: {
      en: "Complete everyday workflows across changing apps on physical mobile devices.",
      zh: "在真实手机与持续变化的应用界面中完成日常工作流。",
    },
  },
  {
    id: "computer",
    index: "02",
    label: { en: "Computer Use", zh: "电脑操作" },
    descriptor: { en: "Desktop workflows", zh: "桌面工作流" },
    description: {
      en: "Carry long-horizon work across desktop apps, files, and system tools.",
      zh: "跨桌面应用、文件与系统工具完成长程工作流。",
    },
  },
  {
    id: "cross-device",
    index: "03",
    label: {
      en: "Cross-device GUI Use",
      zh: "跨设备 GUI 操作",
    },
    descriptor: {
      en: "Phone ↔ computer",
      zh: "手机 ↔ 电脑",
    },
    description: {
      en: "Move information and artifacts between mobile apps and desktop tools to complete one continuous workflow.",
      zh: "在手机应用与电脑工具之间传递信息和文件，连续完成同一个工作流。",
    },
  },
  {
    id: "mobile-deep-research",
    index: "04",
    label: {
      en: "Mobile Use + Deep Research",
      zh: "手机操作 + 深度研究",
    },
    descriptor: { en: "Search, verify & act", zh: "检索、核验与执行" },
    description: {
      en: "Research across sources, verify the evidence, then continue the task through a mobile GUI.",
      zh: "跨来源开展研究并核验证据，再通过手机 GUI 继续执行任务。",
    },
  },
  {
    id: "proactive-service",
    index: "05",
    label: {
      en: "Proactive Service",
      zh: "主动服务",
    },
    descriptor: {
      en: "Monitor, recommend & act",
      zh: "监测、推荐与执行",
    },
    description: {
      en: "Monitor notifications and context, research the next step, and surface recommendations for the user to approve.",
      zh: "主动监测通知与上下文，查询下一步所需信息，并把建议方案交给用户确认。",
    },
  },
];

export const DEMO_VIDEOS: Array<{
  id: string;
  group: DemoCategory;
  availability: "team-preview" | "external-reference" | "team-slot";
  mediaType: "embed" | "local" | "placeholder";
  instructionSourceLanguage: Language;
  provider: string;
  src: string;
  poster?: string;
  frameAspectRatio?: string;
  containMedia?: boolean;
  portraitMedia?: boolean;
  watchUrl?: string;
  title: LocalizedText;
  subtitle?: LocalizedText;
  caseLabel?: LocalizedText;
  instruction: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  status: LocalizedText;
}> = [
  {
    id: "mobile-gui-e-shopping",
    group: "real-device-mobile",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/mobile-gui-shopping-hd.mp4",
    poster: "/demos/source/mobile-gui-shopping-poster.jpg",
    frameAspectRatio: "2442 / 1120",
    containMedia: true,
    title: {
      en: "Mobile GUI Use",
      zh: "手机 GUI 操作",
    },
    subtitle: {
      en: "Recipe research + e-shopping",
      zh: "攻略查询 + 电商购物",
    },
    caseLabel: {
      en: "Recipe research + e-shopping",
      zh: "攻略查询 + 电商购物",
    },
    instruction: {
      en: "I’m planning to make “passion-fruit sour-soup beef” tonight. Search Douyin for the most-saved photo-and-text post, save it, and remember the ingredients I need to prepare. Then, in the Hema app, purchase all the ingredients mentioned in the post—excluding seasonings—select delivery for 18:45 today, and place the order.",
      zh: "我今天晚上准备做“百香果酸汤牛肉”，在抖音搜索找到最多收藏的图文笔记，帮我收藏并记住要准备的食材，然后在盒马 app 里帮我购买笔记中提到的所有食材，不需要买调料，选择今日 18:45 送达并下单。",
    },
    description: {
      en: "The agent first extracts a recipe and its ingredients from Douyin, then carries that information into Hema to complete a time-constrained grocery order.",
      zh: "智能体先在抖音查询攻略并提取食材，再把信息带到盒马，在指定送达时间约束下完成采购。",
    },
    category: {
      en: "MOBILE GUI USE",
      zh: "手机 GUI 操作",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "mobile-gui-travel-hotel",
    group: "real-device-mobile",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/mobile-gui-travel-hotel-hd.mp4",
    poster: "/demos/source/mobile-gui-travel-hotel-poster.jpg",
    frameAspectRatio: "1920 / 880",
    containMedia: true,
    title: {
      en: "Mobile GUI Use",
      zh: "手机 GUI 操作",
    },
    subtitle: {
      en: "Hotel search + map verification",
      zh: "酒店查询 + 地图核验",
    },
    caseLabel: {
      en: "Hotel search + map verification",
      zh: "酒店查询 + 地图核验",
    },
    instruction: {
      en: "I’m visiting Hangzhou next Friday. On Trip.com, find hotels near West Lake, sort by guest rating, exclude homestays, and review the top three. Then use Amap to compare the walking time from each hotel to Broken Bridge. Book the hotel with the shortest walk, and tell me its location, price, and walking time to Broken Bridge.",
      zh: "下周五去杭州玩，在携程帮我找一下西湖附近的酒店，选择好评优先，不要民宿，看一下前三家酒店，然后去高德查这几家酒店到断桥步行要多久，帮我预定离断桥步行最近的一家酒店，告诉我地点和价格，以及去断桥的步行时间。",
    },
    description: {
      en: "The agent combines hotel filtering in Trip.com with route verification in Amap, then returns to the selected property to complete the booking.",
      zh: "智能体在携程筛选酒店，再到高德核验步行时间，最后回到符合条件的酒店完成预订。",
    },
    category: { en: "MOBILE GUI USE", zh: "手机 GUI 操作" },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "mobile-gui-cafe-research",
    group: "real-device-mobile",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/mobile-gui-cafe-research-hd.mp4",
    poster: "/demos/source/mobile-gui-cafe-research-poster.jpg",
    frameAspectRatio: "1920 / 940",
    containMedia: true,
    title: {
      en: "Mobile GUI Use",
      zh: "手机 GUI 操作",
    },
    subtitle: {
      en: "Local discovery + review synthesis",
      zh: "周边探索 + 口碑总结",
    },
    caseLabel: {
      en: "Local discovery + review synthesis",
      zh: "周边探索 + 口碑总结",
    },
    instruction: {
      en: "I’m meeting a friend for coffee at Tianmuli today. Use Amap to find its full address. Open Dianping and find the most popular café within 1 km, and note its name. Then use Xiaohongshu to summarize the first five posts and tell me which coffee people recommend at that café.",
      zh: "我今天约了朋友去天目里喝咖啡，帮我在高德搜索查看详细地址，打开大众点评，找附近 1 公里内的咖啡馆，找人气最高的那家记下店名，再去小红书总结前五条笔记，看看大家推荐这家店的哪款咖啡。",
    },
    description: {
      en: "The agent connects location lookup, nearby-store ranking, and social-review synthesis across Amap, Dianping, and Xiaohongshu.",
      zh: "智能体跨高德、大众点评与小红书完成地点确认、附近门店比较和口碑总结。",
    },
    category: { en: "MOBILE GUI USE", zh: "手机 GUI 操作" },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "mobile-gui-train-meeting",
    group: "real-device-mobile",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/mobile-gui-train-meeting-hd.mp4",
    poster: "/demos/source/mobile-gui-train-meeting-poster.jpg",
    frameAspectRatio: "1920 / 940",
    containMedia: true,
    title: {
      en: "Mobile GUI Use",
      zh: "手机 GUI 操作",
    },
    subtitle: {
      en: "Train planning + meeting scheduling",
      zh: "高铁行程 + 会议安排",
    },
    caseLabel: {
      en: "Train planning + meeting scheduling",
      zh: "高铁行程 + 会议安排",
    },
    instruction: {
      en: "Next Wednesday I’m returning from Beijing. Check 12306 for the arrival time of the earliest high-speed train to Hangzhou West. Then find how long the metro trip from Hangzhou West to Alibaba Xixi Campus takes and calculate when I can reach the office. Finally, schedule a one-hour DingTalk meeting at the next full hour after arrival, titled “Post-Trip Project Sync,” with Zhang San and me, and set a five-minute reminder.",
      zh: "下周三我从北京回来，帮我看一下 12306 最早到杭州西的那班高铁几点到。然后查一下杭州西坐地铁到阿里巴巴西溪园区要多久，算一下我几点能到公司。最后在钉钉安排一个到达后整点的会议。主题写“出差归来项目同步”，参会人选我和张三。开一个小时，设置提前 5 分钟提醒。",
    },
    description: {
      en: "The agent combines rail and metro timing, calculates an arrival-dependent schedule, and creates the resulting meeting in DingTalk.",
      zh: "智能体综合高铁与地铁时间，推算到达公司时刻，并根据结果在钉钉中创建会议。",
    },
    category: { en: "MOBILE GUI USE", zh: "手机 GUI 操作" },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "mobile-gui-housing-commute",
    group: "real-device-mobile",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/mobile-gui-housing-commute-hd.mp4",
    poster: "/demos/source/mobile-gui-housing-commute-poster.jpg",
    frameAspectRatio: "1920 / 880",
    containMedia: true,
    title: {
      en: "Mobile GUI Use",
      zh: "手机 GUI 操作",
    },
    subtitle: {
      en: "Housing search + commute comparison",
      zh: "租房搜索 + 通勤比较",
    },
    caseLabel: {
      en: "Housing search + commute comparison",
      zh: "租房搜索 + 通勤比较",
    },
    instruction: {
      en: "Next month I’m moving near Future Sci-Tech City in Hangzhou. On Beike, search Yuhang Future Sci-Tech City for one-bedroom apartments around CNY 3,000, sort by distance, and note the community name and monthly rent of the top three. Then use Amap to check the metro commute time from each community to Alibaba Xixi Campus. Report each community, rent, commute time, and which has the lowest combined cost: monthly rent + commute time × CNY 2 per minute.",
      zh: "我下个月要搬到杭州未来科技城附近，在贝壳找房找一下余杭未来科技城 3000 元左右的一室一厅，按距离排序看前三套，记下各自的小区名和月租。然后去高德分别查这三个小区到“阿里巴巴西溪园区”的地铁通勤时间。告诉我：三套房各自的小区名、月租、通勤时间，以及“月租 + 通勤时间 × 2 元/分钟”的综合成本最低的是哪套。",
    },
    description: {
      en: "The agent searches housing inventory in Beike, verifies three commute routes in Amap, and compares the options with the user’s combined-cost formula.",
      zh: "智能体在贝壳筛选房源，到高德核验三条通勤路线，并按用户给出的综合成本公式比较方案。",
    },
    category: { en: "MOBILE GUI USE", zh: "手机 GUI 操作" },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "computer-use-home-office",
    group: "computer",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/computer-use-home-office-hd.mp4",
    poster: "/demos/cua-taobao-poster.jpg",
    frameAspectRatio: "16 / 9",
    containMedia: true,
    title: {
      en: "Plan a home-office setup",
      zh: "规划居家办公桌面方案",
    },
    subtitle: {
      en: "Product research · Batched actions · Coordinated CLI + GUI execution",
      zh: "产品调研 · Batched actions · CLI 与 GUI 协同执行",
    },
    caseLabel: {
      en: "Home-office setup + scaled layout",
      zh: "居家办公方案 + 等比例布局",
    },
    instruction: {
      en: "I have a 120 × 60 cm desk and want a home-office setup with a total budget no more than CNY 4,000. Using public websites, compare several monitors, monitor arms, keyboards, and desk lamps in each category, and add other useful items if space allows. Ensure every monitor is within its arm’s weight capacity and that all equipment fits reasonably on the desk. Prepare three value-focused plans at approximately CNY 1,000, CNY 2,000, and CNY 4,000, with recommendation rationales, product reviews, and corresponding links. Draw each desktop layout to scale so I can see how it fits. Do not purchase anything. Present the final result as an HTML file.",
      zh: "我有一张 120 厘米宽、60 厘米长的书桌，想配一套适合居家办公的设备，总预算不超过 4000 元。帮我从公开网站上挑选显示器、显示器支架、键盘和台灯，每类比较几款；如果桌面空间允许，也可以补充其他实用设备。注意显示器重量要在支架承重范围内，所有设备要能合理放在桌面上。整理约 1000 元、2000 元和 4000 元三套不同价位、注重性价比的方案，附上推荐理由、产品评价和对应链接，并按实际比例绘制桌面布局图，让我能直观看到每套方案放在桌上的效果。不要购买，最后用一个 HTML 文件展示结果。",
    },
    description: {
      en: "The agent researches products across public websites, checks price, compatibility, and physical dimensions, then produces three source-linked plans and a to-scale HTML desk layout.",
      zh: "智能体跨公开网站调研商品，核对价格、兼容性与物理尺寸，再生成三档带来源链接的方案和等比例 HTML 桌面布局。",
    },
    category: {
      en: "COMPUTER USE · RESEARCH & REPORT",
      zh: "电脑操作 · 调研与报告",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "computer-use-google-growth",
    group: "computer",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "en",
    provider: "GitHub Pages",
    src: "/demos/source/computer-use-google-growth-hd.mp4",
    poster: "/demos/cua-google-poster.jpg",
    frameAspectRatio: "16 / 9",
    containMedia: true,
    title: {
      en: "Build a Google growth analysis report",
      zh: "构建 Google 的增长分析报告",
    },
    subtitle: {
      en: "Research and reporting · Batched actions · Coordinated CLI + GUI execution",
      zh: "调研与报告生成 · Batched actions · CLI 与 GUI 协同执行",
    },
    caseLabel: {
      en: "Google growth analysis + deliverables",
      zh: "Google 增长分析 + 多格式交付",
    },
    instruction: {
      en: "Analyze Google’s growth trajectory from 2019 to the present. Cover revenue, profit, R&D, capital expenditures, headcount, business segments, and major strategic changes. Be sure to cite all data sources, use consistent definitions, calculate growth rates and profit margins, identify key turning points, and avoid fabricating or missing data. Data must be authoritative and verified by multiple parties. Save the source files, reproducible analysis scripts, Excel workbooks, a carefully crafted six-page PowerPoint presentation, and a brief Word document summary in a folder named “Google Growth Analysis” on your desktop. Finally, open the key source files, Excel charts, and PowerPoint presentation, and correct any visible layout issues.",
      zh: "分析 Google 从 2019 年至今的增长轨迹，覆盖营收、利润、研发投入、资本开支、员工数量、业务板块和重大战略变化。必须引用所有数据来源，采用一致的统计定义，计算增长率和利润率，识别关键转折点，并避免虚构或遗漏数据。数据必须来自权威来源并经多方核验。将源文件、可复现分析脚本、Excel 工作簿、一份精心制作的六页 PowerPoint 演示文稿和一份简短 Word 文档摘要，保存到桌面上名为“Google Growth Analysis”的文件夹中。最后打开关键源文件、Excel 图表和 PowerPoint 演示文稿，并修正任何可见的版式问题。",
    },
    description: {
      en: "The agent gathers and cross-checks source data, runs reproducible analysis, builds Excel, PowerPoint, and Word deliverables, then reopens them to inspect and repair visible layout issues.",
      zh: "智能体采集并交叉核验数据，运行可复现分析，生成 Excel、PowerPoint 和 Word 交付物，再重新打开检查并修正可见的版式问题。",
    },
    category: {
      en: "COMPUTER USE · ANALYSIS & DELIVERABLES",
      zh: "电脑操作 · 分析与多格式交付",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "cross-device-receipts",
    group: "cross-device",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/cross-device-mobile-receipts-pc-hd.mp4",
    poster: "/demos/source/cross-device-mobile-receipts-pc-poster.jpg",
    frameAspectRatio: "1100 / 693",
    containMedia: true,
    title: {
      en: "Process mobile receipts on a PC",
      zh: "把手机收据整理到电脑并生成报表",
    },
    subtitle: {
      en: "Phone gallery → PC files → Excel report",
      zh: "手机相册 → 电脑文件 → Excel 报表",
    },
    caseLabel: {
      en: "Mobile receipts → PC expense report",
      zh: "手机收据 → 电脑费用报表",
    },
    instruction: {
      en: "Locate and organize receipt images in the photo gallery, transfer them to the designated PC directory, and generate a consolidated expense report from the receipt details.",
      zh: "在手机相册中找到所有收据，将它们移动到远程桌面上的 receipts 文件夹，按日期重命名，并在该文件夹中创建一个 Excel 文件汇总账单。",
    },
    description: {
      en: "The agent finds receipt images on the phone, transfers and renames them in the designated PC folder, then extracts the details into a consolidated Excel expense report.",
      zh: "智能体先在手机相册中定位收据，再将文件传到电脑端指定目录并按日期重命名，最后提取信息生成汇总 Excel 费用报表。",
    },
    category: {
      en: "CROSS-DEVICE GUI USE",
      zh: "跨设备 GUI 操作",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "cross-device-restaurant-report",
    group: "cross-device",
    availability: "team-preview",
    mediaType: "embed",
    instructionSourceLanguage: "zh",
    provider: "Bilibili",
    src: "https://player.bilibili.com/player.html?bvid=BV1cx326wE3H&page=1&high_quality=1&danmaku=0&autoplay=0",
    watchUrl: "https://www.bilibili.com/video/BV1cx326wE3H/",
    title: {
      en: "Search on mobile, summarize on a PC",
      zh: "在手机端并行搜索，在电脑端生成总结",
    },
    subtitle: {
      en: "Multi-app mobile search → desktop Markdown report",
      zh: "多应用手机搜索 → 电脑端 Markdown 报告",
    },
    caseLabel: {
      en: "Mobile restaurant search → PC summary",
      zh: "手机餐厅搜索 → 电脑端总结",
    },
    instruction: {
      en: "Search for sushi restaurants across multiple platforms, compare their ratings, and create a local report summarizing the top three options.",
      zh: "在手机上的大众点评、高德地图扫街榜和美团中并行搜索寿司餐厅，然后生成一个 Markdown 文件，总结评分最高的 3 家（包含距离、评分、价格），并在本地桌面打开。",
    },
    description: {
      en: "The agent searches three mobile services in parallel, compares distance, rating, and price, then creates and opens a local Markdown report on the computer.",
      zh: "智能体在三个手机服务中并行搜索，比较距离、评分与价格，再在电脑端创建并打开本地 Markdown 总结。",
    },
    category: {
      en: "CROSS-DEVICE GUI USE",
      zh: "跨设备 GUI 操作",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "mobile-deep-research-weight-loss",
    group: "mobile-deep-research",
    availability: "team-preview",
    mediaType: "embed",
    instructionSourceLanguage: "en",
    provider: "Bilibili",
    src: "https://player.bilibili.com/player.html?bvid=BV1mt3C6AEJm&page=1&high_quality=1&danmaku=0&autoplay=0",
    watchUrl: "https://www.bilibili.com/video/BV1mt3C6AEJm/",
    title: {
      en: "Verify weight-loss claims, then respond",
      zh: "核验减重观点，再返回抖音评论",
    },
    subtitle: {
      en: "Deep Research verification + mobile GUI action",
      zh: "深度研究核验 + 手机 GUI 执行",
    },
    caseLabel: {
      en: "Weight-loss fact-check → Douyin comment",
      zh: "减重事实核验 → 抖音评论",
    },
    instruction: {
      en: "First, open Douyin and find a video discussing evidence-based weight loss, then identify its main claims. Search for relevant research papers, official sources, and authoritative health information to determine whether the video contains any false or misleading statements or omits important conditions and caveats. After completing the verification, return to Douyin. If the video contains false or misleading information, write a comment that identifies the specific issue and briefly explains the supporting evidence. If the content is largely accurate, write a comment that acknowledges its main points while adding any necessary conditions or caveats.",
      zh: "首先打开抖音，找到一条讨论循证减重的视频，并梳理其中的主要观点。搜索相关研究论文、官方来源和权威健康信息，判断该视频是否包含错误或误导性表述，或是否遗漏了重要的适用条件与注意事项。完成核验后返回抖音。如果视频包含错误或误导性信息，撰写一条评论，指出具体问题并简要说明支持证据；如果内容总体准确，则在认可其主要观点的同时，补充必要的条件或注意事项。",
    },
    description: {
      en: "The agent extracts claims from a live social video, verifies them against papers and authoritative health sources, then returns to the mobile app to write an evidence-aware response.",
      zh: "智能体从真实社交视频中提取观点，使用论文与权威健康来源完成核验，再返回手机应用撰写有证据依据的评论。",
    },
    category: {
      en: "MOBILE USE + DEEP RESEARCH",
      zh: "手机操作 + 深度研究",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "mobile-deep-research-soccer",
    group: "mobile-deep-research",
    availability: "team-preview",
    mediaType: "embed",
    instructionSourceLanguage: "zh",
    provider: "Bilibili",
    src: "https://player.bilibili.com/player.html?bvid=BV1Kb3C6YEQo&page=1&high_quality=1&danmaku=0&autoplay=0",
    watchUrl: "https://www.bilibili.com/video/BV1Kb3C6YEQo/",
    title: {
      en: "Research the comeback, then open RedNote",
      zh: "检索世界杯逆转比赛，再打开小红书",
    },
    subtitle: {
      en: "Deep Research retrieval + mobile GUI action",
      zh: "深度研究检索 + 手机 GUI 执行",
    },
    caseLabel: {
      en: "World Cup comeback → RedNote",
      zh: "世界杯逆转 → 小红书",
    },
    instruction: {
      en: "Find the match in this World Cup’s knockout stage in which a team came from behind to win, with the largest maximum goal deficit before taking the lead. Then open RedNote and open the most-discussed related post from the past week.",
      zh: "帮我找出本届世界杯淘汰赛中，在落后的情况下最终完成反超、且反超前最大落后球数最多的一场比赛，然后打开小红书，查看过去一周内讨论度最高的相关帖子并点开。",
    },
    description: {
      en: "The agent resolves an open-ended sports question through Deep Research, then carries the result into RedNote and opens the most-discussed recent post.",
      zh: "智能体先通过深度研究解决开放式体育问题，再把结果带入小红书，打开近期讨论度最高的相关帖子。",
    },
    category: {
      en: "MOBILE USE + DEEP RESEARCH",
      zh: "手机操作 + 深度研究",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "proactive-flight-recovery",
    group: "proactive-service",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/proactive-flight-recovery-hd.mp4",
    poster: "/demos/source/proactive-flight-recovery-poster.jpg",
    frameAspectRatio: "608 / 1080",
    containMedia: true,
    portraitMedia: true,
    title: {
      en: "Recover from a cancelled flight",
      zh: "航班取消后的主动替代方案",
    },
    subtitle: {
      en: "Notification monitoring + alternative transport",
      zh: "通知监测 + 替代交通方案",
    },
    caseLabel: {
      en: "Cancelled flight → alternatives",
      zh: "航班取消 → 替代方案",
    },
    instruction: {
      en: "When a notification says that CA1517 from Beijing Capital T3 to Shanghai Hongqiao T2 on July 26 has been cancelled, proactively find alternative flights and high-speed trains from Beijing to Shanghai. Compare departure and arrival times, fares, seat availability, and reliability; recommend options that still arrive before the user’s 14:00 CTO presentation, and leave the final booking choice to the user.",
      zh: "监测到通知：7 月 26 日北京首都 T3 飞往上海虹桥 T2 的 CA1517 已取消。主动查询北京到上海的替代航班和高铁，对比出发与到达时间、票价、余票和可靠性，推荐仍能在用户 14:00 CTO 演示前抵达的方案，并把最终预订选择交给用户。",
    },
    description: {
      en: "The agent detects the cancellation in the notification stream, opens live travel services, compares air and rail inventory, and returns ranked alternatives without booking on the user’s behalf.",
      zh: "智能体从通知流中发现航班取消，打开实时出行服务，比较航班与高铁余票，并给出排序后的替代方案，不替用户直接预订。",
    },
    category: {
      en: "PROACTIVE SERVICE · TRAVEL DISRUPTION",
      zh: "主动服务 · 行程中断",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
  {
    id: "proactive-morning-brief",
    group: "proactive-service",
    availability: "team-preview",
    mediaType: "local",
    instructionSourceLanguage: "zh",
    provider: "GitHub Pages",
    src: "/demos/source/proactive-morning-brief-hd.mp4",
    poster: "/demos/source/proactive-morning-brief-poster.jpg",
    frameAspectRatio: "608 / 1080",
    containMedia: true,
    portraitMedia: true,
    title: {
      en: "Prepare a proactive morning brief",
      zh: "主动生成出门前晨间简报",
    },
    subtitle: {
      en: "Weather + commute + calendar",
      zh: "天气 + 通勤 + 日程",
    },
    caseLabel: {
      en: "Morning commute brief",
      zh: "晨间通勤简报",
    },
    instruction: {
      en: "Using the morning notifications and schedule, proactively prepare a pre-departure brief: check Hangzhou weather, live traffic and ride-hailing options from Gouzhuang Jiayuan to Alibaba Cloud Computing Park, and the user’s morning meetings; recommend when to leave and surface reminders before the 09:30 meeting.",
      zh: "结合晨间通知与日程，主动生成一份出门前简报：查询杭州天气、勾庄佳苑到阿里巴巴云谷园区的实时路况和打车方案，并核对上午会议；给出建议出发时间，并在 09:30 会议前提醒用户。",
    },
    description: {
      en: "The agent combines weather, map traffic, ride-hailing estimates, and calendar context into one actionable brief with a recommended departure time and meeting reminders.",
      zh: "智能体综合天气、地图路况、打车预估与日历信息，生成一份可直接行动的简报，给出建议出发时间和会议提醒。",
    },
    category: {
      en: "PROACTIVE SERVICE · MORNING BRIEF",
      zh: "主动服务 · 晨间简报",
    },
    status: {
      en: "Official Qwen-UI-Agent demo",
      zh: "Qwen-UI-Agent 正式演示",
    },
  },
];

export function localize(text: LocalizedText, language: Language) {
  return text[language];
}
