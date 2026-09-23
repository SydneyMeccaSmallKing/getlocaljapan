import { CONTACT } from "@/lib/contact";

export const SEASONS = [
  { id: "sakura", label: "Sakura", hint: "Late Mar – Apr" },
  { id: "green", label: "New green", hint: "May" },
  { id: "summer", label: "High summer", hint: "Jun – Aug" },
  { id: "maple", label: "Maple", hint: "Nov" },
  { id: "winter", label: "Clear winter", hint: "Dec – Feb" },
  { id: "open", label: "Dates open", hint: "We will advise" },
] as const;

export const INTERESTS = [
  { id: "fuji", label: "Mount Fuji" },
  { id: "sakura", label: "Sakura" },
  { id: "tower", label: "Tokyo Tower" },
  { id: "kimono", label: "Kimono" },
  { id: "kaiseki", label: "Kaiseki" },
  { id: "streets", label: "Back streets" },
] as const;

export const DAY_OPTIONS = [3, 5, 7, 10] as const;
export const PARTIES = [
  { id: "1", label: "Solo" },
  { id: "2", label: "Two" },
  { id: "4", label: "3–4" },
  { id: "6", label: "5–6" },
] as const;
export const PACES = [
  { id: "slow", label: "Slow" },
  { id: "even", label: "Even" },
  { id: "full", label: "Full" },
] as const;

export type Season = (typeof SEASONS)[number]["id"];
export type Interest = (typeof INTERESTS)[number]["id"];
export type Days = (typeof DAY_OPTIONS)[number];
export type Party = (typeof PARTIES)[number]["id"];
export type Pace = (typeof PACES)[number]["id"];

export type PlanInput = {
  name: string;
  dates: string;
  note: string;
  season: Season;
  days: Days;
  party: Party;
  pace: Pace;
  interests: Interest[];
};

export type DayPlan = {
  n: number;
  id: string;
  title: string;
  detail: string;
};

export type BuiltPlan = {
  days: DayPlan[];
  seasonNote: string;
  partyNote: string;
  paceNote: string;
  dropped: Interest[];
};

type DayDraft = {
  id: string;
  kind: "edge" | "feature" | "open";
  title: string;
  detail: string;
};

export const PRESETS: Array<{
  id: string;
  label: string;
  days: Days;
  season: Season;
  pace: Pace;
  party: Party;
  interests: Interest[];
}> = [
  {
    id: "weekend",
    label: "Long weekend",
    days: 3,
    season: "open",
    pace: "full",
    party: "2",
    interests: ["tower", "kaiseki", "streets"],
  },
  {
    id: "bloom",
    label: "Sakura week",
    days: 7,
    season: "sakura",
    pace: "slow",
    party: "2",
    interests: ["sakura", "kimono", "kaiseki", "fuji"],
  },
  {
    id: "clear",
    label: "Fuji and blue hour",
    days: 5,
    season: "winter",
    pace: "even",
    party: "2",
    interests: ["fuji", "tower", "kaiseki"],
  },
];

export function seasonLabel(id: Season) {
  return SEASONS.find((s) => s.id === id)?.label ?? id;
}

export function interestLabel(id: Interest) {
  return INTERESTS.find((s) => s.id === id)?.label ?? id;
}

export function partyLabel(id: Party) {
  switch (id) {
    case "1":
      return "Solo";
    case "2":
      return "Two";
    case "4":
      return "Three or four";
    case "6":
      return "Five or six";
  }
}

export function paceLabel(id: Pace) {
  switch (id) {
    case "slow":
      return "Slow";
    case "even":
      return "Even";
    case "full":
      return "Full";
  }
}

function featureDay(id: Interest, season: Season): DayDraft {
  switch (id) {
    case "fuji":
      return {
        id,
        kind: "feature",
        title: "Mount Fuji, on a clear try",
        detail:
          season === "summer"
            ? "Summer cloud is common. We take the morning with the best chance. If the peak is closed, the lakes still make the day."
            : "Out before the coaches. The viewpoint follows that morning’s cloud. A Hakone night only if the trip has room.",
      };
    case "sakura":
      if (season === "sakura" || season === "open") {
        return {
          id,
          kind: "feature",
          title: "Under the right trees",
          detail: "A grove matched to that week’s bloom, early. Tea after, while the paths are still quiet.",
        };
      }
      if (season === "green") {
        return {
          id,
          kind: "feature",
          title: "Late bloom, or new green",
          detail: "If blossom is still on, we go early. If it has passed, a garden in new green — not a pretend sakura day.",
        };
      }
      return {
        id,
        kind: "feature",
        title: "Blossom, only if it is real",
        detail: "We will not stage fake sakura. Plum, camellia, or a garden that is actually on, and we will say which.",
      };
    case "tower":
      return {
        id,
        kind: "feature",
        title: "Tokyo Tower at blue hour",
        detail: "A roof we use for photographs, or the deck if you want the height. Booked. Not a noon queue.",
      };
    case "kimono":
      return {
        id,
        kind: "feature",
        title: "Kimono, tied properly",
        detail: "Dressed by hand, then a garden or a back street. You change back without sprinting to a bus.",
      };
    case "kaiseki":
      return {
        id,
        kind: "feature",
        title: "A table already in your name",
        detail: "Counter or a private room. The kitchen is cooking the week. We ask how you eat before we reserve.",
      };
    case "streets":
      return {
        id,
        kind: "feature",
        title: "One neighborhood, properly",
        detail: "Yanaka, Kagurazaka, or a Kichijoji morning. Shops the guide actually uses. Then nowhere else.",
      };
  }
}

function fillerDays(season: Season, interests: Interest[]): DayDraft[] {
  const morning =
    season === "summer"
      ? "No temple quota. Midday stays indoors. The heat is not a test of character."
      : "No temple quota. Sleep, a sento, or a gallery. The guide is on hand if you want them.";
  const days: DayDraft[] = [
    { id: "open-morning", kind: "open", title: "A morning with nothing sold", detail: morning },
    {
      id: "open-coast",
      kind: "open",
      title: "The coast by Alphard",
      detail: "Kamakura, or a quiet stretch of bay. Back before dinner. Not a twelve-hour coach.",
    },
    {
      id: "open-table",
      kind: "open",
      title: "A second table",
      detail: "Sushi, yakitori, or a kissaten — chosen against what you ate the night before.",
    },
    {
      id: "open-house",
      kind: "open",
      title: "A house, slowly",
      detail: "A museum or a residence, entry already held. Then the rest of the day is yours.",
    },
    {
      id: "open-shift",
      kind: "open",
      title: "Room for the day to move",
      detail: "Weather, a better table, or tired feet. This block exists so the plan can change.",
    },
    {
      id: "open-ward",
      kind: "open",
      title: "Another ward, lightly",
      detail: "A shorter neighborhood than the main one. Coffee, one shop, the walk back.",
    },
    {
      id: "open-hakone",
      kind: "open",
      title: "Hakone, without the checklist",
      detail: "The lake or the forest. Not every ropeway. An overnight only if you already wanted it.",
    },
    {
      id: "open-night",
      kind: "open",
      title: "An evening with a shape",
      detail: "A few seats at a bar, or the hotel while the city is still good. Not a pub crawl.",
    },
  ];
  return days.filter((d) => !(d.id === "open-hakone" && interests.includes("fuji")));
}

function arrival(season: Season): DayDraft {
  const extra =
    season === "winter"
      ? " Clear days are kept for Fuji."
      : season === "sakura"
        ? " Bloom notes land before you do."
        : season === "summer"
          ? " The heat is planned around, not queued in."
          : season === "maple"
            ? " Color reports are part of the plan."
            : season === "green"
              ? " Gardens are quieter, and the days use that."
              : " If your dates should shift, we will say so.";
  return {
    id: "arrival",
    kind: "edge",
    title: "Arrival, already arranged",
    detail: `Your hotel is held. A guide meets you in English and Japanese. The Alphard takes the bags and the first evening.${extra}`,
  };
}

function departure(): DayDraft {
  return {
    id: "departure",
    kind: "edge",
    title: "A clean ending",
    detail: "A last unhurried morning, then a transfer timed to your flight — not to anyone else’s.",
  };
}

function buildMiddle(days: Days, interests: Interest[], pace: Pace, season: Season): DayDraft[] {
  const slots = Math.max(1, days - 2);
  const picks = interests.length ? interests : (["streets", "kaiseki", "tower"] as Interest[]);
  const feats = picks.map((id) => featureDay(id, season));
  const fillers = fillerDays(season, picks);
  const seq: DayDraft[] = [];

  if (pace === "slow") {
    let fi = 0;
    let oi = 0;
    while (seq.length < slots) {
      if (fi < feats.length) seq.push(feats[fi++]);
      if (seq.length >= slots) break;
      seq.push(fillers[oi % fillers.length]);
      oi += 1;
      if (fi >= feats.length && oi > slots + fillers.length) break;
    }
    while (fi < feats.length) {
      let swapped = false;
      for (let i = seq.length - 1; i >= 0; i -= 1) {
        if (seq[i]?.kind === "open") {
          seq[i] = feats[fi++];
          swapped = true;
          break;
        }
      }
      if (!swapped) break;
    }
    if (fi < feats.length) return feats.slice(0, slots);
    return seq.slice(0, slots);
  }

  let fi = 0;
  let oi = 0;
  while (seq.length < slots) {
    if (pace === "even" && fi < feats.length) {
      seq.push(feats[fi++]);
    } else if (pace === "full" && fi < feats.length && seq.length < feats.length) {
      seq.push(feats[fi++]);
    } else if (fi < feats.length && pace === "full" && oi > 0 && seq.length < slots) {
      seq.push(feats[fi++]);
    } else {
      seq.push(fillers[oi % fillers.length]);
      oi += 1;
      if (pace === "full" && fi < feats.length) {
        /* features already placed first */
      }
    }
    if (oi > slots + fillers.length) break;
  }
  return seq.slice(0, slots);
}

function seasonNote(season: Season) {
  switch (season) {
    case "sakura":
      return "Sakura timing is checked the week you travel, not from a poster.";
    case "green":
      return "New green, fewer crowds, gardens just after the bloom.";
    case "summer":
      return "Mornings outside, midday indoors, evenings for the city.";
    case "maple":
      return "Color is chased where it is actually turning that week.";
    case "winter":
      return "Clear air is the luxury. Fuji follows the forecast, with a backup that is still worth taking.";
    case "open":
      return "If your dates can move, we will tell you which week is better.";
  }
}

function partyNote(party: Party) {
  switch (party) {
    case "1":
      return "Solo is welcome. The day is still private.";
    case "2":
      return "Two is the rhythm we plan most often. One guide, one car, your pace.";
    case "4":
      return "Three or four. One Alphard, no convoy.";
    case "6":
      return "Five or six travel in one Alphard, with luggage.";
  }
}

function paceNote(pace: Pace) {
  switch (pace) {
    case "slow":
      return "Slow means open mornings. We do not fill a silence with a second temple.";
    case "even":
      return "A steady day: one main purpose, then the city.";
    case "full":
      return "Full still means private. More of the day, same car, no group clock.";
  }
}

export function buildPlan(input: PlanInput): BuiltPlan {
  const picks = input.interests.length ? input.interests : [];
  const middle = buildMiddle(input.days, input.interests, input.pace, input.season);
  const drafts = [arrival(input.season), ...middle, departure()];
  const days = drafts.map((d, i) => ({
    n: i + 1,
    id: d.id,
    title: d.title,
    detail: d.detail,
  }));
  const dropped = picks.filter((id) => !middle.some((d) => d.id === id));
  return {
    days,
    seasonNote: seasonNote(input.season),
    partyNote: partyNote(input.party),
    paceNote: paceNote(input.pace),
    dropped,
  };
}

function header(input: PlanInput) {
  const interests = input.interests.length
    ? input.interests.map(interestLabel).join(", ")
    : "Please propose";
  return [
    `Hello Steve, this is ${input.name.trim() || "a guest"}.`,
    "I would like a private Japan journey with getlocaljapan.",
    "",
    `When: ${seasonLabel(input.season)}${input.dates.trim() ? ` (${input.dates.trim()})` : ""}`,
    `Length: ${input.days} days`,
    `Party: ${partyLabel(input.party)}`,
    `Pace: ${paceLabel(input.pace)}`,
    `Interests: ${interests}`,
    "",
    "A first shape:",
  ];
}

export function buildShortBrief(input: PlanInput, plan: BuiltPlan) {
  const lines = [...header(input), ...plan.days.map((d) => `${d.n}. ${d.title}`)];
  if (input.note.trim()) lines.push("", `Note: ${input.note.trim()}`);
  lines.push("", "Please tell me what you would change, and send a quote.");
  return lines.join("\n");
}

export function buildFullBrief(input: PlanInput, plan: BuiltPlan) {
  const lines = [
    ...header(input),
    ...plan.days.map((d) => `${d.n}. ${d.title} — ${d.detail}`),
  ];
  if (plan.dropped.length) {
    lines.push("", `If the dates stretch: ${plan.dropped.map(interestLabel).join(", ")}.`);
  }
  if (input.note.trim()) lines.push("", `Note: ${input.note.trim()}`);
  lines.push("", "Please tell me what you would change, and send a quote.");
  return lines.join("\n");
}

export function mailtoHref(input: PlanInput, plan: BuiltPlan) {
  const subject = encodeURIComponent(`Private Japan — ${input.name.trim() || "inquiry"}`);
  const body = encodeURIComponent(buildFullBrief(input, plan));
  return `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
}
