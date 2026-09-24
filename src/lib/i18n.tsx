import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { BuiltPlan, Interest, Pace, Party, PlanInput, Season } from "@/lib/plan";
import { interestLabel, paceLabel, partyLabel, seasonLabel } from "@/lib/plan";
import { CONTACT } from "@/lib/contact";

export type Lang = "en" | "zh" | "zhHant";

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
      ["旅行体验", "#experiences"],
      ["我们的方式", "#method"],
      ["专属用车", "#fleet"],
      ["定制行程", "#plan"],
      ["联系我们", "#contact"],
    ],
    menuOpen: "打开菜单",
    menuClose: "关闭菜单",
    tokyo: "东京",
    wa: "WhatsApp",
    waSteve: "WhatsApp Steve",
    waTalk: "WhatsApp 联系 Steve",
    heroKicker: "东京 · 日本",
    hero1: "日本私人旅行，",
    hero2: "自由一点，也讲究一点。",
    heroBody: "出发前，我们替你安排好酒店、餐厅、门票和用车。落地之后，我们陪你真正去感受日本。",
    heroBy: "日英双语向导，全程私人陪同。",
    heroFacts: "长期合作的 Alphard 商务车队，让每一天都从容一点。",
    shape: "定制我的日本行程",
    intro: "你好 Steve，我想定制一趟 getlocaljapan 的日本私人旅行。",
    facts: ["不赶行程", "日英双语向导", "Alphard 车队", "出发前安排好"],
    ticker: ["富士山", "樱花", "东京塔", "和服", "怀石料理", "专属用车", "日英双语", "酒店", "餐厅", "门票"],
    pillars: [
      {
        title: "不赶行程",
        body: "没有固定发团时间，也没有必须完成的景点清单。富士山今天云太多，就晚一点出发。喜欢一家小店，就多坐一会儿。旅行不应该一直看时间。",
      },
      {
        title: "去值得去的地方",
        body: "我们不会为了“打卡”塞满你的行程。可能是蓝调时刻看东京塔的一处屋顶，一家仍然坚持手工系腰带的和服店，或者只有八个座位的小料理店。地方不一定有名，但值得你专程去。",
      },
      {
        title: "该安排的，都提前安排好",
        body: "酒店、餐厅、门票、用车，在你出发前就确认妥当。落地以后，不需要临时找车、排队订位，也不用在陌生城市里反复确认下一站去哪里。你只需要享受旅程。",
      },
    ],
    expKicker: "精选体验",
    expTitle: "五种方式，重新认识日本。",
    exp: {
      fuji: {
        title: "富士山",
        lede: "在旅行团到达之前，看见富士山。",
        body: "我们不会中午才把你送到挤满旅游巴士的停车场。天还没亮的时候，从东京出发。当天去哪里看富士山，会根据天气、云层和能见度调整。如果你愿意，也可以慢一点回来，顺路去箱根，甚至在那里住上一晚。",
        holds: ["避开旅行团高峰", "当天决定最佳观景点", "是否留宿箱根，由你决定"],
      },
      sakura: {
        title: "樱花",
        lede: "在开得最好的那片樱花下。",
        body: "东京的樱花，并不是所有地方同时开放。我们会根据你旅行那一周的花期，选择真正值得去的地方。早点出发，在人群到来之前赏花，然后找个地方喝茶。",
        holds: [],
      },
      tower: {
        title: "东京塔",
        lede: "蓝调时刻，看一次东京塔。",
        body: "不是为了盖章，是为了一张真正想留的照片。我们会安排一处适合拍摄的屋顶，或者你想要的观景层。订好再去，不用在正午排队碰运气。",
        holds: [],
      },
      kimono: {
        title: "和服",
        lede: "一家仍然坚持手工系腰带的店。",
        body: "腰带亲手系好，然后在庭院或小街上慢慢走。想换回自己的衣服，就换。不用穿着和服赶下一站。",
        holds: [],
      },
      kaiseki: {
        title: "怀石料理",
        lede: "餐桌已经为你留好。",
        body: "寿司吧台，或者安静的私人包间。订哪一家之前，我们会先了解你真正喜欢怎样吃。不是因为它很有名，而是因为它适合你。",
        holds: [],
      },
    },
    wayKicker: "我们如何为你安排行程",
    wayTitle: "从第一次聊天，到旅程最后一个晚上。",
    steps: [
      {
        n: "01",
        title: "先认识你",
        body: "你有几天时间、和谁一起旅行、喜欢怎样吃饭、喜欢快一点还是慢一点。还有最重要的：什么事情，是你旅行时绝对不想做的。比如排两个小时的队。",
      },
      {
        n: "02",
        title: "设计行程",
        body: "我们不会丢给你几十个链接，让你自己研究。而是根据你的时间和喜好，整理出每天真正适合你的安排。行程有方向，但不会被写死。",
      },
      {
        n: "03",
        title: "提前预订",
        body: "酒店、餐厅、限定席位、预约制体验、车辆。能提前确认的事情，我们会在你起飞之前确认好。",
      },
      {
        n: "04",
        title: "日本当地陪同",
        body: "落地之后，我们继续陪着你。临时想换餐厅、天气变了、想多留一个小时，都可以随时调整。不用半夜在旅行群里等待回复。有事情，直接和身边的人说。",
      },
    ],
    fleetKicker: "专属用车",
    fleetTitle: "熟悉的车，也熟悉日本的路。",
    fleetBody: "不是出发当天随机叫来的一辆车。我们长期合作的 Alphard 车队，负责机场接送、富士山一日行程，以及东京市内移动。",
    fleetPoints: ["很多巴士进不去的小路，恰恰藏着东京最好玩的地方", "安静、舒服、可靠", "这也是私人旅行该有的样子"],
    fleetCaption: "黄昏的 Alphard",
    guideKicker: "私人向导",
    guideTitle: "日语和英语，不需要两个人。",
    guideBody:
      "你的向导不是拿着当天刚翻译好的资料照着念。神社里的规矩、菜单上的一道料理、某个街区为什么会变成今天这样——想知道的时候，我们会认真告诉你。不想听讲解的时候，也可以安静地逛自己的东京。",
    guideCaption: "一家三口，神社在身后",
    planKicker: "定制你的行程",
    planTitle: "先选一个大概，",
    planTitle2: "剩下的交给我们。",
    planBody: "这里不是正式预订。你可以先告诉我们，你想要怎样的一趟日本旅行。Steve 会根据你的选择，进一步确认酒店、餐厅、门票和车辆安排。",
    kind: "快速灵感",
    people: "同行人数",
    build: "看看行程草稿",
    finer: "再调整",
    presets: { weekend: "周末小旅行", bloom: "樱花季", clear: "富士山与东京夜景" },
    days: "旅行天数",
    party: "同行人数",
    pace: "旅行节奏",
    season: "季节",
    interests: "这次最想体验",
    parties: { "1": "一个人", "2": "两个人", "4": "3–4 人", "6": "5–6 人" },
    paces: { slow: "慢慢来", even: "刚刚好", full: "尽量多看看" },
    seasons: {
      sakura: "樱花季",
      green: "初夏新绿",
      summer: "盛夏",
      maple: "红叶季",
      winter: "冬季晴空",
      open: "时间还没确定",
    },
    interest: {
      fuji: "富士山",
      sakura: "樱花",
      tower: "东京塔",
      kimono: "和服",
      kaiseki: "怀石料理",
      streets: "东京街巷",
    },
    name: "你的名字",
    namePh: "你的名字",
    dates: "预计旅行时间",
    datesPh: "例如：3 月底 / 4 月 4–9 日",
    note: "还有什么想提前告诉我们？",
    notePh: "饮食、不想排队的事，或者其他。",
    shapeKicker: "一份旅程草稿",
    dropped: "如果时间再长一些，还可以加上：",
    emailBrief: "用邮件发送",
    copied: "已复制",
    copy: "复制行程",
    faqKicker: "常见问题",
    faqTitle: "出发前，你可能还想知道。",
    faqs: [
      {
        q: "这是旅行团吗？",
        a: "不是。只有你和你的同行人。没有固定发团时间，没有陌生人拼车，也没有必须跟着走的统一行程。",
      },
      {
        q: "可以去哪些地方？",
        a: "东京是我们的主场。富士山、箱根和东京周边海岸，都可以当天乘车前往。京都、金泽以及更远的城市也可以安排。新干线、酒店和当地向导，我们会一起帮你衔接好。",
      },
      {
        q: "向导会说什么语言？",
        a: "日语和英语。同一位向导就可以完成沟通和陪同。不是一个人在前面走，另一个翻译跟在后面。",
      },
      {
        q: "用什么车？",
        a: "以 Toyota Alphard 为主。我们与车队已经长期合作。机场接送、富士山行程，以及东京那些大型巴士进不去的街区，都更适合这种方式。",
      },
      {
        q: "怎么开始？",
        a: "很简单。告诉 Steve 你的月份、人数，以及你希望这趟旅行是什么感觉。他会亲自回复，并一起确认后面的安排。",
      },
    ],
    contactKicker: "Steve Uryuu",
    contactBody: "把月份、人数，以及你希望这趟旅行是什么感觉发给他。他排这些天，也是他本人回复。",
    email: "邮箱",
  },
  zhHant: {
    skip: "跳到正文",
    nav: [
      ["旅行體驗", "#experiences"],
      ["我們的方式", "#method"],
      ["專屬用車", "#fleet"],
      ["定製行程", "#plan"],
      ["聯繫我們", "#contact"],
    ],
    menuOpen: "開啟選單",
    menuClose: "關閉選單",
    tokyo: "東京",
    wa: "WhatsApp",
    waSteve: "WhatsApp Steve",
    waTalk: "WhatsApp 聯繫 Steve",
    heroKicker: "東京 · 日本",
    hero1: "日本私人旅行，",
    hero2: "自由一點，也講究一點。",
    heroBody: "出發前，我們替你安排好飯店、餐廳、門票和用車。落地之後，我們陪你真正去感受日本。",
    heroBy: "日英雙語嚮導，全程私人陪同。",
    heroFacts: "長期合作的 Alphard 商務車隊，讓每一天都從容一點。",
    shape: "定製我的日本行程",
    intro: "你好 Steve，我想定製一趟 getlocaljapan 的日本私人旅行。",
    facts: ["不趕行程", "日英雙語嚮導", "Alphard 車隊", "出發前安排好"],
    ticker: ["富士山", "櫻花", "東京塔", "和服", "懷石料理", "專屬用車", "日英雙語", "飯店", "餐廳", "門票"],
    pillars: [
      {
        title: "不趕行程",
        body: "沒有固定發團時間，也沒有必須完成的景點清單。富士山今天雲太多，就晚一點出發。喜歡一家小店，就多坐一會兒。旅行不應該一直看時間。",
      },
      {
        title: "去值得去的地方",
        body: "我們不會為了「打卡」塞滿你的行程。可能是藍調時刻看東京塔的一處屋頂，一家仍然堅持手工繫腰帶的和服店，或者只有八個座位的小料理店。地方不一定有名，但值得你專程去。",
      },
      {
        title: "該安排的，都提前安排好",
        body: "飯店、餐廳、門票、用車，在你出發前就確認妥當。落地以後，不需要臨時找車、排隊訂位，也不用在陌生城市裡反覆確認下一站去哪裡。你只需要享受旅程。",
      },
    ],
    expKicker: "精選體驗",
    expTitle: "五種方式，重新認識日本。",
    exp: {
      fuji: {
        title: "富士山",
        lede: "在旅行團到達之前，看見富士山。",
        body: "我們不會中午才把你送到擠滿旅遊巴士的停車場。天還沒亮的時候，從東京出發。當天去哪裡看富士山，會根據天氣、雲層和能見度調整。如果你願意，也可以慢一點回來，順路去箱根，甚至在那裡住上一晚。",
        holds: ["避開旅行團高峰", "當天決定最佳觀景點", "是否留宿箱根，由你決定"],
      },
      sakura: {
        title: "櫻花",
        lede: "在開得最好的那片櫻花下。",
        body: "東京的櫻花，並不是所有地方同時開放。我們會根據你旅行那一週的花期，選擇真正值得去的地方。早點出發，在人群到來之前賞花，然後找個地方喝茶。",
        holds: [],
      },
      tower: {
        title: "東京塔",
        lede: "藍調時刻，看一次東京塔。",
        body: "不是為了蓋章，是為了一張真正想留的照片。我們會安排一處適合拍攝的屋頂，或者你想要的觀景層。訂好再去，不用在正午排隊碰運氣。",
        holds: [],
      },
      kimono: {
        title: "和服",
        lede: "一家仍然堅持手工繫腰帶的店。",
        body: "腰帶親手繫好，然後在庭院或小街上慢慢走。想換回自己的衣服，就換。不用穿著和服趕下一站。",
        holds: [],
      },
      kaiseki: {
        title: "懷石料理",
        lede: "餐桌已經為你留好。",
        body: "壽司吧台，或者安靜的私人包間。訂哪一家之前，我們會先了解你真正喜歡怎樣吃。不是因為它很有名，而是因為它適合你。",
        holds: [],
      },
    },
    wayKicker: "我們如何為你安排行程",
    wayTitle: "從第一次聊天，到旅程最後一個晚上。",
    steps: [
      {
        n: "01",
        title: "先認識你",
        body: "你有幾天時間、和誰一起旅行、喜歡怎樣吃飯、喜歡快一點還是慢一點。還有最重要的：什麼事情，是你旅行時絕對不想做的。比如排兩個小時的隊。",
      },
      {
        n: "02",
        title: "設計行程",
        body: "我們不會丟給你幾十個連結，讓你自己研究。而是根據你的時間和喜好，整理出每天真正適合你的安排。行程有方向，但不會被寫死。",
      },
      {
        n: "03",
        title: "提前預訂",
        body: "飯店、餐廳、限定席位、預約制體驗、車輛。能提前確認的事情，我們會在你起飛之前確認好。",
      },
      {
        n: "04",
        title: "日本當地陪同",
        body: "落地之後，我們繼續陪著你。臨時想換餐廳、天氣變了、想多留一個小時，都可以隨時調整。不用半夜在旅行群裡等待回覆。有事情，直接和身邊的人說。",
      },
    ],
    fleetKicker: "專屬用車",
    fleetTitle: "熟悉的車，也熟悉日本的路。",
    fleetBody: "不是出發當天隨機叫來的一輛車。我們長期合作的 Alphard 車隊，負責機場接送、富士山一日行程，以及東京市內移動。",
    fleetPoints: ["很多巴士進不去的小路，恰恰藏著東京最好玩的地方", "安靜、舒服、可靠", "這也是私人旅行該有的樣子"],
    fleetCaption: "黃昏的 Alphard",
    guideKicker: "私人嚮導",
    guideTitle: "日語和英語，不需要兩個人。",
    guideBody:
      "你的嚮導不是拿著當天剛翻譯好的資料照著念。神社裡的規矩、菜單上的一道料理、某個街區為什麼會變成今天這樣——想知道的時候，我們會認真告訴你。不想聽講解的時候，也可以安靜地逛自己的東京。",
    guideCaption: "一家三口，神社在身後",
    planKicker: "定製你的行程",
    planTitle: "先選一個大概，",
    planTitle2: "剩下的交給我們。",
    planBody: "這裡不是正式預訂。你可以先告訴我們，你想要怎樣的一趟日本旅行。Steve 會根據你的選擇，進一步確認飯店、餐廳、門票和車輛安排。",
    kind: "快速靈感",
    people: "同行人數",
    build: "看看行程草稿",
    finer: "再調整",
    presets: { weekend: "週末小旅行", bloom: "櫻花季", clear: "富士山與東京夜景" },
    days: "旅行天數",
    party: "同行人數",
    pace: "旅行節奏",
    season: "季節",
    interests: "這次最想體驗",
    parties: { "1": "一個人", "2": "兩個人", "4": "3–4 人", "6": "5–6 人" },
    paces: { slow: "慢慢來", even: "剛剛好", full: "盡量多看看" },
    seasons: {
      sakura: "櫻花季",
      green: "初夏新綠",
      summer: "盛夏",
      maple: "紅葉季",
      winter: "冬季晴空",
      open: "時間還沒確定",
    },
    interest: {
      fuji: "富士山",
      sakura: "櫻花",
      tower: "東京塔",
      kimono: "和服",
      kaiseki: "懷石料理",
      streets: "東京街巷",
    },
    name: "你的名字",
    namePh: "你的名字",
    dates: "預計旅行時間",
    datesPh: "例如：3 月底 / 4 月 4–9 日",
    note: "還有什麼想提前告訴我們？",
    notePh: "飲食、不想排隊的事，或者其他。",
    shapeKicker: "一份旅程草稿",
    dropped: "如果時間再長一些，還可以加上：",
    emailBrief: "用郵件發送",
    copied: "已複製",
    copy: "複製行程",
    faqKicker: "常見問題",
    faqTitle: "出發前，你可能還想知道。",
    faqs: [
      {
        q: "這是旅行團嗎？",
        a: "不是。只有你和你的同行人。沒有固定發團時間，沒有陌生人拼車，也沒有必須跟著走的統一行程。",
      },
      {
        q: "可以去哪些地方？",
        a: "東京是我們的主場。富士山、箱根和東京周邊海岸，都可以當天乘車前往。京都、金澤以及更遠的城市也可以安排。新幹線、飯店和當地嚮導，我們會一起幫你銜接好。",
      },
      {
        q: "嚮導會說什麼語言？",
        a: "日語和英語。同一位嚮導就可以完成溝通和陪同。不是一個人在前面走，另一個翻譯跟在後面。",
      },
      {
        q: "用什麼車？",
        a: "以 Toyota Alphard 為主。我們與車隊已經長期合作。機場接送、富士山行程，以及東京那些大型巴士進不去的街區，都更適合這種方式。",
      },
      {
        q: "怎麼開始？",
        a: "很簡單。告訴 Steve 你的月份、人數，以及你希望這趟旅行是什麼感覺。他會親自回覆，並一起確認後面的安排。",
      },
    ],
    contactKicker: "Steve Uryuu",
    contactBody: "把月份、人數，以及你希望這趟旅行是什麼感覺發給他。他排這些天，也是他本人回覆。",
    email: "電郵",
  },
} as const;

export type Copy = (typeof copy)["en"];

const Ctx = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Copy } | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = window.localStorage.getItem("glj-lang");
    if (saved === "zh" || saved === "zhHant" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang === "zhHant" ? "zh-Hant" : "en";
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
  green: "初夏新绿",
  summer: "盛夏",
  maple: "红叶季",
  winter: "冬季晴空",
  open: "时间还没确定",
};

const interestZh: Record<Interest, string> = {
  fuji: "富士山",
  sakura: "樱花",
  tower: "东京塔",
  kimono: "和服",
  kaiseki: "怀石料理",
  streets: "东京街巷",
};

function partyZh(id: Party) {
  if (id === "1") return "一个人";
  if (id === "2") return "两个人";
  if (id === "4") return "3–4 人";
  return "5–6 人";
}

function paceZh(id: Pace) {
  if (id === "slow") return "慢慢来";
  if (id === "even") return "刚刚好";
  return "尽量多看看";
}

function dayZh(id: string, season: Season) {
  if (id === "fuji") {
    return season === "summer"
      ? {
          title: "趁天气好，去看富士山",
          detail: "夏天云比较多。我们会挑最有机会看清的早晨出发。当天根据云层和天气选择观景地点。山如果暂时看不清，湖边这一天也值得。",
        }
      : {
          title: "趁天气好，去看富士山",
          detail: "在旅行团出发之前离开东京。当天根据云层和天气选择观景地点。如果整个行程足够从容，也可以把这一晚留给箱根。",
        };
  }
  if (id === "sakura") {
    if (season === "sakura" || season === "open") {
      return {
        title: "在开得最好的那片樱花下",
        detail: "东京的樱花，并不是所有地方同时开放。我们会根据你旅行那一周的花期，选择真正值得去的地方。早点出发。在人群到来之前赏花，然后找个地方喝茶。",
      };
    }
    if (season === "green") {
      return {
        title: "晚樱，或者初夏的新绿",
        detail: "花如果还在，我们就早点去。如果已经谢了，就去一座真正新绿的庭园，不假装还是樱花季。",
      };
    }
    return {
      title: "花，只在它真的开着的时候",
      detail: "我们不会安排假樱花。梅花、山茶，或一座当时正盛的园子，我们会说清楚是哪一种。",
    };
  }
  const fixed: Record<string, { title: string; detail: string }> = {
    tower: {
      title: "蓝调时刻的东京塔",
      detail: "不是为了盖章，是为了一张真正想留的照片。我们会安排一处适合拍摄的屋顶，或者你想要的观景层。订好再去，不用在正午排队。",
    },
    kimono: {
      title: "和服，好好穿上",
      detail: "腰带亲手系好，然后在庭院或小街上慢慢走。想换回自己的衣服，就换。不用穿着和服赶下一站。",
    },
    kaiseki: {
      title: "餐桌已经为你留好",
      detail: "寿司吧台，或者安静的私人包间。订哪一家之前，我们会先了解你真正喜欢怎样吃。不是因为它很有名，而是因为它适合你。",
    },
    streets: {
      title: "一条东京的街巷，慢慢走",
      detail: "谷中、神乐坂，或吉祥寺的一个早晨。去向导自己会去的店。然后不去别处。",
    },
    "open-morning": {
      title: "一个不用赶的早晨",
      detail: season === "summer" ? "中午待在室内。热不是用来考验人的。" : "睡到舒服的时间，泡一次钱汤，或去一家美术馆。想有人陪，向导就在。",
    },
    "open-coast": { title: "Alphard 去海边", detail: "镰仓，或一段安静的海岸。晚饭前回来。不是坐十二个小时的大巴。" },
    "open-table": { title: "再留一顿适合你的饭", detail: "寿司、烧鸟，或一家喫茶店。对着前一晚吃过的来选。" },
    "open-house": { title: "一座房子，慢慢看", detail: "美术馆或宅邸，门票已经留好。剩下的时间是你的。" },
    "open-shift": { title: "这一天，可以改", detail: "天气变了、发现更好的位子，或者走累了。这一段留下来，就是为了能调整。" },
    "open-ward": { title: "换一个街区，轻轻走", detail: "比主街区更短。一杯咖啡，一家店，然后走回去。" },
    "open-hakone": { title: "箱根，不按清单", detail: "湖或森林。不是每条索道都要坐。过夜，只在你本来就想住的时候。" },
    "open-night": { title: "有形状的一晚", detail: "酒吧留几个位子，或者城市还好的时候回到酒店。不是酒吧巡游。" },
    arrival: {
      title: "抵达之前，一切已经准备好",
      detail: `酒店已经确认。日英双语向导在机场等你，Alphard 接上你和行李。不用研究机场交通，也不用拖着箱子找酒店。你的日本旅行，从落地那一刻就已经开始。${
        season === "winter"
          ? "晴天会优先留给富士山。"
          : season === "sakura"
            ? "当周花期，会在你出发前再确认一次。"
            : season === "summer"
              ? "热的时候绕开，而不是排队去晒。"
              : season === "maple"
                ? "哪一带正在变色，出发前会告诉你。"
                : season === "green"
                  ? "园子更安静的时候，日子就顺着这个来。"
                  : "如果换一周会更好，我们会直接说。"
      }`,
    },
    departure: {
      title: "最后一天，也不用赶",
      detail: "睡到舒服的时间。再吃一顿早餐，逛最后一条街。然后按照你的航班时间送你去机场。不是按照其他人的时间。",
    },
  };
  return fixed[id];
}

const seasonNoteZh: Record<Season, string> = {
  sakura: "樱花什么时候最好，不看宣传海报决定。我们会在你出发前，根据当周花期重新确认。",
  green: "初夏新绿，人少一些。花如果已经谢了，我们就去真正新绿的庭园。",
  summer: "早晨在外面，中午在室内，晚上留给城市。",
  maple: "红叶追的是那一周真正在变色的地方，不按去年的照片。",
  winter: "晴朗的空气本身就值得出门。富士山跟着预报走，备选的地方也值得去。",
  open: "时间如果还能挪，我们会告诉你哪一周更合适。",
};

const partyNoteZh: Record<Party, string> = {
  "1": "一个人也欢迎。这一天仍然只属于你。",
  "2": "两个人，是我们最常安排的旅行方式之一：一位向导，一辆车，完全按照你们自己的节奏。",
  "4": "三或四个人。一辆 Alphard，没有车队。",
  "6": "五或六个人坐同一辆 Alphard，行李也在。",
};

const paceNoteZh: Record<Pace, string> = {
  slow: "慢慢来，就是早晨可以空着。不会用第二个景点去填一段安静。",
  even: "一天不需要塞满。每天有一个真正值得期待的重点，剩下的时间，留给城市。",
  full: "尽量多看看，也还是私人的。一天里的内容更多，同一辆车，没有旅行团的时间表。",
};

const seasonHant: Record<Season, string> = {
  sakura: "櫻花季",
  green: "初夏新綠",
  summer: "盛夏",
  maple: "紅葉季",
  winter: "冬季晴空",
  open: "時間還沒確定",
};

const interestHant: Record<Interest, string> = {
  fuji: "富士山",
  sakura: "櫻花",
  tower: "東京塔",
  kimono: "和服",
  kaiseki: "懷石料理",
  streets: "東京街巷",
};

function partyHant(id: Party) {
  if (id === "1") return "一個人";
  if (id === "2") return "兩個人";
  if (id === "4") return "3–4 人";
  return "5–6 人";
}

function paceHant(id: Pace) {
  if (id === "slow") return "慢慢來";
  if (id === "even") return "剛剛好";
  return "盡量多看看";
}

function dayHant(id: string, season: Season) {
  if (id === "fuji") {
    return season === "summer"
      ? {
          title: "趁天氣好，去看富士山",
          detail: "夏天雲比較多。我們會挑最有機會看清的早晨出發。當天根據雲層和天氣選擇觀景地點。山如果暫時看不清，湖邊這一天也值得。",
        }
      : {
          title: "趁天氣好，去看富士山",
          detail: "在旅行團出發之前離開東京。當天根據雲層和天氣選擇觀景地點。如果整個行程足夠從容，也可以把這一晚留給箱根。",
        };
  }
  if (id === "sakura") {
    if (season === "sakura" || season === "open") {
      return {
        title: "在開得最好的那片櫻花下",
        detail: "東京的櫻花，並不是所有地方同時開放。我們會根據你旅行那一週的花期，選擇真正值得去的地方。早點出發。在人群到來之前賞花，然後找個地方喝茶。",
      };
    }
    if (season === "green") {
      return {
        title: "晚櫻，或者初夏的新綠",
        detail: "花如果還在，我們就早點去。如果已經謝了，就去一座真正新綠的庭園，不假裝還是櫻花季。",
      };
    }
    return {
      title: "花，只在它真的開著的時候",
      detail: "我們不會安排假櫻花。梅花、山茶，或一座當時正盛的園子，我們會說清楚是哪一種。",
    };
  }
  const fixed: Record<string, { title: string; detail: string }> = {
    tower: {
      title: "藍調時刻的東京塔",
      detail: "不是為了蓋章，是為了一張真正想留的照片。我們會安排一處適合拍攝的屋頂，或者你想要的觀景層。訂好再去，不用在正午排隊。",
    },
    kimono: {
      title: "和服，好好穿上",
      detail: "腰帶親手繫好，然後在庭院或小街上慢慢走。想換回自己的衣服，就換。不用穿著和服趕下一站。",
    },
    kaiseki: {
      title: "餐桌已經為你留好",
      detail: "壽司吧台，或者安靜的私人包間。訂哪一家之前，我們會先了解你真正喜歡怎樣吃。不是因為它很有名，而是因為它適合你。",
    },
    streets: {
      title: "一條東京的街巷，慢慢走",
      detail: "谷中、神樂坂，或吉祥寺的一個早晨。去嚮導自己會去的店。然後不去別處。",
    },
    "open-morning": {
      title: "一個不用趕的早晨",
      detail: season === "summer" ? "中午待在室內。熱不是用來考驗人的。" : "睡到舒服的時間，泡一次錢湯，或去一家美術館。想有人陪，嚮導就在。",
    },
    "open-coast": { title: "Alphard 去海邊", detail: "鐮倉，或一段安靜的海岸。晚飯前回來。不是坐十二個小時的大巴。" },
    "open-table": { title: "再留一頓適合你的飯", detail: "壽司、燒鳥，或一家喫茶店。對著前一晚吃過的來選。" },
    "open-house": { title: "一座房子，慢慢看", detail: "美術館或宅邸，門票已經留好。剩下的時間是你的。" },
    "open-shift": { title: "這一天，可以改", detail: "天氣變了、發現更好的位子，或者走累了。這一段留下來，就是為了能調整。" },
    "open-ward": { title: "換一個街區，輕輕走", detail: "比主街區更短。一杯咖啡，一家店，然後走回去。" },
    "open-hakone": { title: "箱根，不按清單", detail: "湖或森林。不是每條索道都要坐。過夜，只在你本來就想住的時候。" },
    "open-night": { title: "有形狀的一晚", detail: "酒吧留幾個位子，或者城市還好的時候回到飯店。不是酒吧巡遊。" },
    arrival: {
      title: "抵達之前，一切已經準備好",
      detail: `飯店已經確認。日英雙語嚮導在機場等你，Alphard 接上你和行李。不用研究機場交通，也不用拖著箱子找飯店。你的日本旅行，從落地那一刻就已經開始。${
        season === "winter"
          ? "晴天會優先留給富士山。"
          : season === "sakura"
            ? "當週花期，會在你出發前再確認一次。"
            : season === "summer"
              ? "熱的時候繞開，而不是排隊去曬。"
              : season === "maple"
                ? "哪一帶正在變色，出發前會告訴你。"
                : season === "green"
                  ? "園子更安靜的時候，日子就順著這個來。"
                  : "如果換一週會更好，我們會直接說。"
      }`,
    },
    departure: {
      title: "最後一天，也不用趕",
      detail: "睡到舒服的時間。再吃一頓早餐，逛最後一條街。然後按照你的航班時間送你去機場。不是按照其他人的時間。",
    },
  };
  return fixed[id];
}

const seasonNoteHant: Record<Season, string> = {
  sakura: "櫻花什麼時候最好，不看宣傳海報決定。我們會在你出發前，根據當週花期重新確認。",
  green: "初夏新綠，人少一些。花如果已經謝了，我們就去真正新綠的庭園。",
  summer: "早晨在外面，中午在室內，晚上留給城市。",
  maple: "紅葉追的是那一週真正在變色的地方，不按去年的照片。",
  winter: "晴朗的空氣本身就值得出門。富士山跟著預報走，備選的地方也值得去。",
  open: "時間如果還能挪，我們會告訴你哪一週更合適。",
};

const partyNoteHant: Record<Party, string> = {
  "1": "一個人也歡迎。這一天仍然只屬於你。",
  "2": "兩個人，是我們最常安排的旅行方式之一：一位嚮導，一輛車，完全按照你們自己的節奏。",
  "4": "三或四個人。一輛 Alphard，沒有車隊。",
  "6": "五或六個人坐同一輛 Alphard，行李也在。",
};

const paceNoteHant: Record<Pace, string> = {
  slow: "慢慢來，就是早晨可以空著。不會用第二個景點去填一段安靜。",
  even: "一天不需要塞滿。每天有一個真正值得期待的重點，剩下的時間，留給城市。",
  full: "盡量多看看，也還是私人的。一天裡的內容更多，同一輛車，沒有旅行團的時間表。",
};

export function localizePlan(plan: BuiltPlan, input: PlanInput, lang: Lang): BuiltPlan {
  if (lang === "en") return plan;
  const hant = lang === "zhHant";
  return {
    ...plan,
    seasonNote: (hant ? seasonNoteHant : seasonNoteZh)[input.season],
    partyNote: (hant ? partyNoteHant : partyNoteZh)[input.party],
    paceNote: (hant ? paceNoteHant : paceNoteZh)[input.pace],
    days: plan.days.map((day) => {
      const next = (hant ? dayHant : dayZh)(day.id, input.season);
      return next ? { ...day, ...next } : day;
    }),
  };
}

export function makeBrief(input: PlanInput, plan: BuiltPlan, lang: Lang, full: boolean) {
  const hant = lang === "zhHant";
  const zh = lang !== "en";
  const interests = input.interests.length
    ? input.interests.map((id) => (hant ? interestHant[id] : zh ? interestZh[id] : interestLabel(id))).join(zh ? "、" : ", ")
    : hant
      ? "請你們提議"
      : zh
        ? "请你们提议"
        : "Please propose";
  const when = `${hant ? seasonHant[input.season] : zh ? seasonZh[input.season] : seasonLabel(input.season)}${input.dates.trim() ? ` (${input.dates.trim()})` : ""}`;
  const lines = hant
    ? [
        `Steve 你好，我是${input.name.trim() || "一位客人"}。`,
        "我想定製一趟 getlocaljapan 的日本私人旅行。",
        "",
        `時間：${when}`,
        `旅行天數：${input.days} 天`,
        `同行人數：${partyHant(input.party)}`,
        `旅行節奏：${paceHant(input.pace)}`,
        `這次最想體驗：${interests}`,
        "",
        "一份旅程草稿：",
      ]
    : zh
      ? [
          `Steve 你好，我是${input.name.trim() || "一位客人"}。`,
          "我想定制一趟 getlocaljapan 的日本私人旅行。",
          "",
          `时间：${when}`,
          `旅行天数：${input.days} 天`,
          `同行人数：${partyZh(input.party)}`,
          `旅行节奏：${paceZh(input.pace)}`,
          `这次最想体验：${interests}`,
          "",
          "一份旅程草稿：",
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
  lines.push(...plan.days.map((day) => (full ? `${day.n}. ${day.title} — ${day.detail}` : `${day.n}. ${day.title}`)));
  if (full && plan.dropped.length) {
    const extra = plan.dropped.map((id) => (hant ? interestHant[id] : zh ? interestZh[id] : interestLabel(id))).join(zh ? "、" : ", ");
    lines.push("", hant ? `如果時間再長一些：${extra}。` : zh ? `如果时间再长一些：${extra}。` : `If the dates stretch: ${extra}.`);
  }
  if (input.note.trim()) lines.push("", hant ? `備註：${input.note.trim()}` : zh ? `备注：${input.note.trim()}` : `Note: ${input.note.trim()}`);
  lines.push("", hant ? "請告訴我會調整哪裡，並發一份報價。" : zh ? "请告诉我会调整哪里，并发一份报价。" : "Please tell me what you would change, and send a quote.");
  return lines.join("\n");
}

export function mailHref(input: PlanInput, plan: BuiltPlan, lang: Lang) {
  const subject = encodeURIComponent(
    lang === "zhHant"
      ? `日本私人行程 — ${input.name.trim() || "諮詢"}`
      : lang === "zh"
        ? `日本私人行程 — ${input.name.trim() || "咨询"}`
        : `Private Japan — ${input.name.trim() || "inquiry"}`,
  );
  const body = encodeURIComponent(makeBrief(input, plan, lang, true));
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}
