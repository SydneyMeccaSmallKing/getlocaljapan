import { useMemo, useState } from "react";
import { clsx } from "clsx";
import { Check, Copy } from "lucide-react";
import { whatsappLink } from "@/lib/contact";
import { mailHref, localizePlan, makeBrief, useI18n } from "@/lib/i18n";
import {
  DAY_OPTIONS,
  INTERESTS,
  PACES,
  PARTIES,
  PRESETS,
  SEASONS,
  buildPlan,
  type Days,
  type Interest,
  type Pace,
  type Party,
  type PlanInput,
  type Season,
} from "@/lib/plan";

function Segment<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: ReadonlyArray<{ id: T; label: string }>;
  onChange: (id: T) => void;
}) {
  const index = Math.max(
    0,
    options.findIndex((option) => option.id === value),
  );
  const n = options.length;
  return (
    <div>
      <p className="kicker" id={`seg-${label}`}>
        {label}
      </p>
      <div
        role="radiogroup"
        aria-labelledby={`seg-${label}`}
        className="relative mt-3 border border-ink"
      >
        <div className="grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={option.id === value}
              className={clsx(
                "tap relative z-10 min-h-11 px-1 text-sm",
                option.id === value ? "text-paper" : "text-ink",
              )}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="slide-pill pointer-events-none absolute inset-y-0 left-0 z-0 bg-ink"
          style={{ width: `${100 / n}%`, transform: `translateX(${index * 100}%)` }}
        />
      </div>
    </div>
  );
}

export function Composer() {
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [note, setNote] = useState("");
  const [season, setSeason] = useState<Season>("sakura");
  const [days, setDays] = useState<Days>(5);
  const [party, setParty] = useState<Party>("2");
  const [pace, setPace] = useState<Pace>("even");
  const [interests, setInterests] = useState<Interest[]>(["fuji", "sakura", "kaiseki"]);
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState("");

  const { t, lang } = useI18n();
  const input: PlanInput = { name, dates, note, season, days, party, pace, interests };
  const plan = useMemo(() => localizePlan(buildPlan(input), input, lang), [name, dates, note, season, days, party, pace, interests, lang]);
  const planKey = `${lang}|${season}|${days}|${party}|${pace}|${interests.join(",")}`;
  const shortBrief = makeBrief(input, plan, lang, false);
  const fullBrief = makeBrief(input, plan, lang, true);

  function toggle(id: Interest) {
    setInterests((curr) => {
      const next = curr.includes(id) ? curr.filter((item) => item !== id) : [...curr, id];
      return INTERESTS.map((item) => item.id).filter((item) => next.includes(item));
    });
  }

  function applyPreset(id: string) {
    const preset = PRESETS.find((item) => item.id === id);
    if (!preset) return;
    setDays(preset.days);
    setSeason(preset.season);
    setPace(preset.pace);
    setInterests(INTERESTS.map((item) => item.id).filter((item) => preset.interests.includes(item)));
    setKind(id);
  }

  return (
    <section id="plan" className="bg-paper text-ink">
      <div className="wrap py-14 md:py-28">
        <p className="kicker">{t.planKicker}</p>
        <h2 className="display-2 mt-3 max-w-xl">
          {t.planTitle}
          <span className="mt-3 block italic">{t.planTitle2}</span>
        </h2>
        <p className="mt-4 max-w-2xl text-lg">{t.planBody}</p>
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-12">
          <div className="grid gap-8 lg:col-span-5">
            <div>
              <p className="kicker">{t.kind}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {PRESETS.map((preset) => {
                  const on = kind === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={on}
                      className={clsx(
                        "tap min-h-11 w-full border border-ink px-4 text-sm sm:w-auto",
                        on ? "bg-ink text-paper" : "bg-transparent text-ink",
                      )}
                      onClick={() => applyPreset(preset.id)}
                    >
                      {t.presets[preset.id as keyof typeof t.presets]}
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="grid gap-2">
              <span className="kicker">{t.dates}</span>
              <input className="field" value={dates} placeholder={t.datesPh} onChange={(event) => setDates(event.target.value)} />
            </label>
            <Segment
              label={t.people}
              value={party}
              options={PARTIES.map((item) => ({ id: item.id, label: t.parties[item.id] }))}
              onChange={setParty}
            />
            {open ? (
              <div className="grid gap-8">
                <p className="kicker">{t.finer}</p>
                <Segment
                  label={t.days}
                  value={String(days)}
                  options={DAY_OPTIONS.map((option) => ({ id: String(option), label: String(option) }))}
                  onChange={(id) => setDays(Number(id) as Days)}
                />
                <Segment
                  label={t.pace}
                  value={pace}
                  options={PACES.map((item) => ({ id: item.id, label: t.paces[item.id] }))}
                  onChange={setPace}
                />
            <div>
              <p className="kicker">{t.season}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SEASONS.map((item) => {
                  const on = item.id === season;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      className={clsx(
                        "tap min-h-11 border border-ink px-3 text-sm",
                        on ? "bg-ink text-paper" : "bg-transparent text-ink",
                      )}
                      onClick={() => setSeason(item.id)}
                    >
                      {t.seasons[item.id]}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="kicker">{t.interests}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTERESTS.map((item) => {
                  const on = interests.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      className={clsx(
                        "tap min-h-11 border border-ink px-3 text-sm",
                        on ? "bg-ink text-paper" : "bg-transparent text-ink",
                      )}
                      onClick={() => toggle(item.id)}
                    >
                      {t.interest[item.id]}
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="grid gap-2">
              <span className="kicker">{t.name}</span>
              <input
                className="field"
                value={name}
                autoComplete="name"
                placeholder={t.namePh}
                onChange={(event) => setName(event.target.value)}
              />
            </label>
            <label className="grid gap-2">
              <span className="kicker">{t.note}</span>
              <textarea className="field" value={note} placeholder={t.notePh} onChange={(event) => setNote(event.target.value)} />
            </label>
              </div>
            ) : (
              <button type="button" className="tap min-h-11 w-full bg-ink px-5 text-paper sm:w-auto sm:justify-self-start" onClick={() => setOpen(true)}>
                {t.build}
              </button>
            )}
          </div>
          {open ? (
          <div className="plan-sheet border border-ink bg-bg p-5 md:p-8 lg:col-span-7">
            <p className="kicker">{t.shapeKicker}</p>
            <p className="mt-3">{plan.paceNote}</p>
            <p className="mt-2 text-sm">{plan.seasonNote}</p>
            <p className="mt-2 text-sm">{plan.partyNote}</p>
            <ol key={planKey} className="mt-6">
              {plan.days.map((day, index) => (
                <li
                  key={`${day.n}-${day.id}`}
                  className="day-in grid grid-cols-[3rem_1fr] gap-3 border-t border-ink/20 py-4"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="font-display text-2xl tabular-nums">{String(day.n).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl">{day.title}</h3>
                    <p className="mt-1">{day.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            {plan.dropped.length > 0 ? (
              <p className="mt-4 text-sm">
                {t.dropped} {plan.dropped.map((id) => t.interest[id]).join(lang === "en" ? ", " : "、")}.
              </p>
            ) : null}
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <a
                className="tap inline-flex min-h-11 items-center justify-center bg-ink px-4 text-paper sm:justify-start"
                href={whatsappLink(shortBrief)}
                target="_blank"
                rel="noreferrer"
              >
                {t.waSteve}
              </a>
              <a className="tap inline-flex min-h-11 items-center justify-center border border-ink px-4 sm:justify-start" href={mailHref(input, plan, lang)}>
                {t.emailBrief}
              </a>
              <button
                type="button"
                className="tap inline-flex min-h-11 items-center justify-center gap-2 border border-ink px-4 sm:justify-start"
                onClick={() => {
                  void navigator.clipboard.writeText(fullBrief).then(
                    () => {
                      setCopied(true);
                      window.setTimeout(() => setCopied(false), 1800);
                    },
                    () => setCopied(false),
                  );
                }}
              >
                <span className="relative size-4">
                  <Copy className={clsx("icon-swap absolute inset-0 size-4", copied ? "off" : "on")} aria-hidden="true" />
                  <Check className={clsx("icon-swap absolute inset-0 size-4", copied ? "on" : "off")} aria-hidden="true" />
                </span>
                {copied ? t.copied : t.copy}
              </button>
            </div>
          </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
