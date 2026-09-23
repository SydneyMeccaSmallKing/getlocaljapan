import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { BuiltPlan, Interest, Pace, Party, PlanInput, Season } from "@/lib/plan";
import { interestLabel, paceLabel, partyLabel, seasonLabel } from "@/lib/plan";
import { CONTACT } from "@/lib/contact";

export type Lang = "en" | "zh";

const copy = {
  en: {
    skip: "Skip to content",
    nav: [
      ["Experiences", "#experiences"],
      ["The way", "#method"],
      ["Fleet", "#fleet"],
      ["Plan", "#plan"],
      ["Contact", "#contact"],
    ],
    menuOpen: "Open menu",
    menuClose: "Close menu",
    tokyo: "Tokyo",
    wa: "WhatsApp",
    waSteve: "WhatsApp Steve",
    waTalk: "Talk to Steve on WhatsApp",
    heroKicker: "Private Japan",
    hero1: "Private Japan,",
    hero2: "planned around you.",
    heroBody:
      "Hotels, restaurants, tickets, a private Alphard and a bilingual local guide — arranged before you arrive.",
    heroBy: "Planned personally by Steve Uryuu",
    heroFacts: "Japanese & English · Private Alphard · No group tours",
    shape: "Plan my Japan trip",
    intro: "Hello Steve, I would like a private Japan journey with getlocaljapan.",
    facts: ["100% private", "Japanese & English", "Private Alphard", "Tokyo-based"],
    ticker: [
      "Mount Fuji",
      "Sakura",
      "Tokyo Tower",
      "Kimono",
      "Kaiseki",
      "Alphard fleet",
      "English and Japanese",
      "Hotels",
      "Tables",
      "Tickets",
    ],
    pillars: [
      {
        title: "Your pace",
        body: "No fixed departure. If the light on Fuji is wrong, we wait.",
      },
      {
        title: "Local access",
        body: "A roof for blue hour. A kimono house that still ties the obi. Eight seats, not eighty.",
      },
      {
        title: "Everything arranged",
        body: "Hotels, tables, tickets and the Alphard are held before you land.",
      },
    ],
    expKicker: "The days",
    expTitle: "Less checklist. More of the morning.",
    exp: {
      fuji: {
        title: "Mount Fuji",
        lede: "Before the coaches.",
        body: "Leave Tokyo before dawn. We choose the viewpoint from that morning’s cloud.",
        holds: [],
      },
      sakura: {
        title: "Sakura",
        lede: "The right week.",
        body: "Under the trees that are actually in bloom. Tea after. No picnic-mat battle.",
        holds: [],
      },
      tower: {
        title: "Tokyo Tower",
        lede: "A photograph, not a stamp.",
        body: "Blue hour, from a roof we use. Booked — not queued on a hope.",
        holds: [],
      },
      kimono: {
        title: "Kimono",
        lede: "Dressed by hand.",
        body: "The obi tied properly. Then the day continues in your own clothes.",
        holds: [],
      },
      kaiseki: {
        title: "Kaiseki",
        lede: "A small room.",
        body: "A counter or a private room. We ask how you eat before we reserve.",
        holds: [],
      },
    },
    wayKicker: "The way",
    wayTitle: "Four steps. Then you fly.",
    steps: [
      { n: "01", title: "Hear", body: "Your dates, your pace, how you eat." },
      { n: "02", title: "Compose", body: "A private itinerary built around you." },
      { n: "03", title: "Reserve", body: "Hotels, tables, tickets and the car." },
      { n: "04", title: "Stay", body: "Your guide stays with you and adjusts as you go." },
    ],
    fleetKicker: "The car",
    fleetTitle: "Toyota Alphard.",
    fleetBody:
      "A private van, door to door. Not a coach, and not a car called that morning.",
    fleetPoints: ["Airport luggage stays with you", "Fuji before the coaches", "Lanes a bus cannot enter", "The same vans, for years"],
    fleetCaption: "Alphard, dusk",
    guideKicker: "Guides",
    guideTitle: "Both languages. One person.",
    guideBody:
      "Your guide is not reading a translation made that morning. A shrine, a dish, a neighborhood rule — answered properly, then left quiet when you want the street to yourself.",
    guideCaption: "Smiling, with the shrine behind them",
    planKicker: "With Steve",
    planTitle: "Shape your Japan.",
    planTitle2: "Steve will take it from here.",
    planBody: "This isn’t a booking. It’s the start of a conversation.",
    kind: "What kind of Japan",
    people: "How many people",
    build: "Build my trip",
    finer: "Adjust the days",
    presets: { weekend: "Long weekend", bloom: "Sakura week", clear: "Fuji and blue hour" },
    days: "Days",
    party: "Party",
    pace: "Pace",
    season: "Season",
    interests: "What the days are for",
    parties: { "1": "Solo", "2": "Two", "4": "3–4", "6": "5–6" },
    paces: { slow: "Slow", even: "Even", full: "Full" },
    seasons: {
      sakura: "Sakura",
      green: "New green",
      summer: "High summer",
      maple: "Maple",
      winter: "Clear winter",
      open: "Dates open",
    },
    interest: {
      fuji: "Mount Fuji",
      sakura: "Sakura",
      tower: "Tokyo Tower",
      kimono: "Kimono",
      kaiseki: "Kaiseki",
      streets: "Back streets",
    },
    name: "Your name",
    namePh: "Your name",
    dates: "When",
    datesPh: "Late March, or 4–9 April",
    note: "Anything he should know",
    notePh: "How you like to eat. What you will not queue for.",
    shapeKicker: "A first shape",
    dropped: "Also on your list if the dates stretch:",
    emailBrief: "Email the brief",
    copied: "Copied",
    copy: "Copy brief",
    faqKicker: "Questions",
    faqTitle: "The practical bits.",
    faqs: [
      {
        q: "How far ahead?",
        a: "A month is comfortable. Shorter can still work if the tables and the van are open. Write anyway.",
      },
      {
        q: "Children?",
        a: "Yes. Tell Steve their ages. The van and the days are planned around that.",
      },
      {
        q: "Luggage?",
        a: "Airport to hotel in the same Alphard. Bags stay with you.",
      },
      {
        q: "How you eat?",
        a: "Tell us before we reserve. Counters and kaiseki are chosen around that.",
      },
      {
        q: "Payment and cancellation?",
        a: "Nothing is charged on this page. Steve sends the terms with the quote, before anything is held.",
      },
    ],
    contactKicker: "Steve Uryuu",
    contactBody: "He plans the days and he answers. Send the month, how many of you, and what you want the days to feel like.",
    email: "Email",
  },
  zh: {
    skip: "跳到正文",
    nav: [
      ["体验", "#experiences"],
      ["做法", "#method"],
      ["车队", "#fleet"],
      ["行程", "#plan"],
      ["联系", "#contact"],
    ],
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    tokyo: "东京",
    wa: "WhatsApp",
    waSteve: "WhatsApp Steve",
    waTalk: "在 WhatsApp 上找 Steve",
    heroKicker: "私人日本",
    hero1: "私人日本，",
    hero2: "按你来排。",
    heroBody: "酒店、餐厅、门票、私人阿尔法，以及一位日英双语的地陪——在你到达之前安排好。",
    heroBy: "由 Steve Uryuu 本人规划",
    heroFacts: "日语与英语 · 私人阿尔法 · 不跟团",
    shape: "规划我的日本行程",
    intro: "Steve 你好，我想安排一次 getlocaljapan 的日本私人行程。",
    facts: ["全程私人", "日语与英语", "私人阿尔法", "以东京为基地"],
    ticker: ["富士山", "樱花", "东京塔", "和服", "怀石", "阿尔法车队", "英日双语", "酒店", "餐厅", "门票"],
    pillars: [
      { title: "你的节奏", body: "没有固定出发时刻。富士山的光线不对，我们就等。" },
      { title: "在地入口", body: "蓝调时分的屋顶，还在手工系带的和服店。八个位子，不是八十个。" },
      { title: "全部办妥", body: "酒店、餐位、门票和阿尔法，在你落地前留好。" },
    ],
    expKicker: "这几天",
    expTitle: "少一点清单，多一点早晨。",
    exp: {
      fuji: {
        title: "富士山",
        lede: "赶在大巴之前。",
        body: "天没亮就离开东京。观景点，按那天早晨的云来选。",
        holds: [],
      },
      sakura: {
        title: "樱花",
        lede: "对的那一周。",
        body: "站在真正开着的树下。之后喝茶。不跟别人抢野餐垫。",
        holds: [],
      },
      tower: {
        title: "东京塔",
        lede: "一张照片，不是一个章。",
        body: "蓝调时分，从我们常用的屋顶拍。订好，不靠碰运气排队。",
        holds: [],
      },
      kimono: {
        title: "和服",
        lede: "手工着装。",
        body: "腰带亲手系好。然后换回自己的衣服，继续走。",
        holds: [],
      },
      kaiseki: {
        title: "怀石",
        lede: "一间小室。",
        body: "柜台或包间。订位之前，先问你怎么吃。",
        holds: [],
      },
    },
    wayKicker: "做法",
    wayTitle: "四步，然后你出发。",
    steps: [
      { n: "01", title: "听", body: "日期、节奏、你怎么吃。" },
      { n: "02", title: "排", body: "一份围着你写的私人行程。" },
      { n: "03", title: "订", body: "酒店、餐位、门票和车。" },
      { n: "04", title: "陪", body: "导游跟着你，当天可以改。" },
    ],
    fleetKicker: "车",
    fleetTitle: "丰田阿尔法。",
    fleetBody: "私人车，送到门口。不是大巴，也不是当天早上临时叫的车。",
    fleetPoints: ["机场行李跟着你", "赶在大巴之前上富士山", "大巴进不去的小巷", "同一批车，很多年"],
    fleetCaption: "黄昏的阿尔法",
    guideKicker: "导游",
    guideTitle: "两种语言。同一个人。",
    guideBody: "你的导游不是在念当天早上做好的翻译。神社、一道菜、街区的规矩——讲清楚，然后在你想自己走走的时候安静下来。",
    guideCaption: "一家三口，神社在身后",
    planKicker: "交给 Steve",
    planTitle: "排好你的日本。",
    planTitle2: "接下来交给 Steve。",
    planBody: "这不是下单。这是一次谈话的开始。",
    kind: "怎样的日本",
    people: "几个人",
    build: "排出我的行程",
    finer: "再调一下",
    presets: { weekend: "周末短途", bloom: "樱花一周", clear: "富士山与蓝调" },
    days: "天数",
    party: "人数",
    pace: "节奏",
    season: "季节",
    interests: "这几天想做什么",
    parties: { "1": "一人", "2": "两人", "4": "3–4 人", "6": "5–6 人" },
    paces: { slow: "慢", even: "适中", full: "充实" },
    seasons: {
      sakura: "樱花",
      green: "新绿",
      summer: "盛夏",
      maple: "红叶",
      winter: "晴朗的冬",
      open: "日期未定",
    },
    interest: {
      fuji: "富士山",
      sakura: "樱花",
      tower: "东京塔",
      kimono: "和服",
      kaiseki: "怀石",
      streets: "小街",
    },
    name: "你的名字",
    namePh: "你的名字",
    dates: "什么时候",
    datesPh: "三月下旬，或 4 月 4–9 日",
    note: "他还该知道的事",
    notePh: "你怎么吃。你不愿意排队的事。",
    shapeKicker: "一个初步轮廓",
    dropped: "日期拉长时还可以加上：",
    emailBrief: "用邮件发送",
    copied: "已复制",
    copy: "复制行程",
    faqKicker: "问题",
    faqTitle: "实际的事。",
    faqs: [
      { q: "要提前多久？", a: "一个月比较从容。再短，只要餐位和车还在，也可以。先写过来。" },
      { q: "可以带孩子吗？", a: "可以。把年龄告诉 Steve。车和每天的安排会按这个来。" },
      { q: "行李呢？", a: "机场到酒店是同一辆阿尔法。箱子跟着你，不上大巴。" },
      { q: "饮食呢？", a: "订位之前告诉我们。柜台和怀石会按这个来选。" },
      {
        q: "付款和取消？",
        a: "这个页面不收费。Steve 会把条款和报价一起发给你，确认之后才开始留位。",
      },
    ],
    contactKicker: "Steve Uryuu",
    contactBody: "他排这些天，也是他本人回复。把月份、人数，以及你希望这些天的感觉发给他。",
    email: "邮箱",
  },
} as const;

export type Copy = (typeof copy)["en"];

const Ctx = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Copy } | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("glj-lang");
    if (saved === "zh" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
    window.localStorage.setItem("glj-lang", lang);
  }, [lang]);
  const value = useMemo(() => ({ lang, setLang, t: copy[lang] as Copy }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const value = useContext(Ctx);
  if (!value) throw new Error("useI18n outside provider");
  return value;
}

const seasonZh: Record<Season, string> = {
  sakura: "樱花季",
  green: "新绿",
  summer: "盛夏",
  maple: "红叶",
  winter: "晴朗的冬天",
  open: "日期未定",
};

const interestZh: Record<Interest, string> = {
  fuji: "富士山",
  sakura: "樱花",
  tower: "东京塔",
  kimono: "和服",
  kaiseki: "怀石",
  streets: "小街",
};

function partyZh(id: Party) {
  if (id === "1") return "一人";
  if (id === "2") return "两人";
  if (id === "4") return "三到四人";
  return "五到六人";
}

function paceZh(id: Pace) {
  if (id === "slow") return "慢";
  if (id === "even") return "适中";
  return "充实";
}

function dayZh(id: string, season: Season) {
  if (id === "fuji") {
    return season === "summer"
      ? { title: "富士山，挑一个能看清的早晨", detail: "夏天云多。我们选成功率最高的早晨出发。山如果封了，湖仍然值得这一天。" }
      : { title: "富士山，挑一个能看清的早晨", detail: "赶在旅游大巴之前。观景点跟着那天早晨的云走。行程有余地，才加箱根过夜。" };
  }
  if (id === "sakura") {
    if (season === "sakura" || season === "open") {
      return { title: "站在对的树下", detail: "树跟着那一周真正的花期，早点到。之后喝茶，路上还安静。" };
    }
    if (season === "green") {
      return { title: "晚樱，或新绿", detail: "花如果还在，我们早点去。如果已经谢了，就去一座真正新绿的庭园，不假装还是樱花季。" };
    }
    return { title: "花，只在它真的开着的时候", detail: "我们不会布置假樱花。梅花、山茶，或一座当时正盛的园子，我们会说清楚是哪一种。" };
  }
  const fixed: Record<string, { title: string; detail: string }> = {
    tower: { title: "蓝调时分的东京塔", detail: "我们用来拍照的屋顶，或者你想要高度就上海拔层。订好。不是正午排队。" },
    kimono: { title: "和服，好好穿上", detail: "手工着装，然后是庭院或一条小街。换回自己的衣服，不用赶大巴。" },
    kaiseki: { title: "已经写着你名字的位子", detail: "柜台或包间。厨房做的是这一周的食材。订位之前先问你怎么吃。" },
    streets: { title: "一个街区，走透", detail: "谷中、神乐坂，或吉祥寺的一个早晨。导游自己会去的店。然后不去别处。" },
    "open-morning": {
      title: "一个什么都没排满的早晨",
      detail:
        season === "summer"
          ? "没有寺庙配额。中午待在室内。热不是用来考验性格的。"
          : "没有寺庙配额。睡觉、钱汤，或一家美术馆。你想有人陪，导游就在。",
    },
    "open-coast": { title: "阿尔法去海边", detail: "镰仓，或一段安静的海湾。晚饭前回来。不是十二小时的大巴。" },
    "open-table": { title: "第二顿正经的饭", detail: "寿司、烧鸟，或一家喫茶店——对着前一晚吃过的来选。" },
    "open-house": { title: "一座房子，慢慢看", detail: "美术馆或宅邸，门票已经留好。剩下的时间是你的。" },
    "open-shift": { title: "留给这一天自己变", detail: "天气、更好的位子，或走累了。这一段存在，就是为了能改。" },
    "open-ward": { title: "另一个区，轻轻走", detail: "比主街区更短。一杯咖啡，一家店，然后走回去。" },
    "open-hakone": { title: "箱根，不按清单", detail: "湖或森林。不是每条索道都要坐。过夜只在你本来就想住的时候。" },
    "open-night": { title: "有形状的一晚", detail: "酒吧的几个位子，或城市还好的时候回到酒店。不是酒吧巡游。" },
    arrival: {
      title: "到达时，已经安排好",
      detail: `酒店已留。导游用英语和日语接你。阿尔法带走行李和第一个晚上。${
        season === "winter"
          ? "晴天留给富士山。"
          : season === "sakura"
            ? "花况会在你到达前发来。"
            : season === "summer"
              ? "热是绕开的，不是排队去晒。"
              : season === "maple"
                ? "变色的报告是计划的一部分。"
                : season === "green"
                  ? "园子更安静，日子就顺着这个来。"
                  : "如果日期该挪，我们会直说。"
      }`,
    },
    departure: { title: "干净地结束", detail: "最后一个不赶的早晨，然后按你的航班接送——不是按别人的。" },
  };
  return fixed[id];
}

const seasonNoteZh: Record<Season, string> = {
  sakura: "樱花时间按你出行的那一周核对，不按海报。",
  green: "新绿，人少一些，园子在花期刚过。",
  summer: "早晨在外面，中午在室内，晚上留给城市。",
  maple: "颜色追的是那一周真正在变的地方。",
  winter: "清透的空气就是奢侈。富士山跟着预报走，备选也值得去。",
  open: "如果你的日期能挪，我们会告诉你哪一周更好。",
};

const partyNoteZh: Record<Party, string> = {
  "1": "一个人也欢迎。这一天仍然是私人的。",
  "2": "两人是我们最常排的节奏。一位导游，一辆车，你们的速度。",
  "4": "三或四人。一辆阿尔法，没有车队。",
  "6": "五或六人坐同一辆阿尔法，行李也在。",
};

const paceNoteZh: Record<Pace, string> = {
  slow: "慢，就是早晨可以空着。我们不会用第二座寺庙去填一段安静。",
  even: "稳的一天：一件主要的事，然后是城市。",
  full: "充实仍然是私人的。一天里的内容更多，同一辆车，没有团队的钟。",
};

export function localizePlan(plan: BuiltPlan, input: PlanInput, lang: Lang): BuiltPlan {
  if (lang === "en") return plan;
  return {
    ...plan,
    seasonNote: seasonNoteZh[input.season],
    partyNote: partyNoteZh[input.party],
    paceNote: paceNoteZh[input.pace],
    days: plan.days.map((day) => {
      const next = dayZh(day.id, input.season);
      return next ? { ...day, ...next } : day;
    }),
  };
}

export function makeBrief(input: PlanInput, plan: BuiltPlan, lang: Lang, full: boolean) {
  const zh = lang === "zh";
  const interests = input.interests.length
    ? input.interests.map((id) => (zh ? interestZh[id] : interestLabel(id))).join(zh ? "、" : ", ")
    : zh
      ? "请你们提议"
      : "Please propose";
  const when = `${zh ? seasonZh[input.season] : seasonLabel(input.season)}${input.dates.trim() ? ` (${input.dates.trim()})` : ""}`;
  const lines = zh
    ? [
        `Steve 你好，我是${input.name.trim() || "一位客人"}。`,
        "我想安排一次 getlocaljapan 的日本私人行程。",
        "",
        `时间：${when}`,
        `天数：${input.days} 天`,
        `人数：${partyZh(input.party)}`,
        `节奏：${paceZh(input.pace)}`,
        `想做的事：${interests}`,
        "",
        "一个初步轮廓：",
      ]
    : [
        `Hello Steve, this is ${input.name.trim() || "a guest"}.`,
        "I would like a private Japan journey with getlocaljapan.",
        "",
        `When: ${when}`,
        `Length: ${input.days} days`,
        `Party: ${partyLabel(input.party)}`,
        `Pace: ${paceLabel(input.pace)}`,
        `Interests: ${interests}`,
        "",
        "A first shape:",
      ];
  lines.push(
    ...plan.days.map((day) => (full ? `${day.n}. ${day.title}${zh ? " — " : " — "}${day.detail}` : `${day.n}. ${day.title}`)),
  );
  if (full && plan.dropped.length) {
    const extra = plan.dropped.map((id) => (zh ? interestZh[id] : interestLabel(id))).join(zh ? "、" : ", ");
    lines.push("", zh ? `如果日期拉长：${extra}。` : `If the dates stretch: ${extra}.`);
  }
  if (input.note.trim()) lines.push("", zh ? `备注：${input.note.trim()}` : `Note: ${input.note.trim()}`);
  lines.push("", zh ? "请告诉我你会改哪里，并发一份报价。" : "Please tell me what you would change, and send a quote.");
  return lines.join("\n");
}

export function mailHref(input: PlanInput, plan: BuiltPlan, lang: Lang) {
  const subject = encodeURIComponent(
    lang === "zh" ? `日本私人行程 — ${input.name.trim() || "咨询"}` : `Private Japan — ${input.name.trim() || "inquiry"}`,
  );
  const body = encodeURIComponent(makeBrief(input, plan, lang, true));
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}
