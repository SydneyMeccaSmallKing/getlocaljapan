import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import { Menu, X } from "lucide-react";
import { Composer } from "@/components/site/composer";
import { Experiences } from "@/components/site/experiences";
import { Film, Reveal, ScrollProgress, TokyoClock } from "@/components/site/motion";
import { whatsappLink } from "@/lib/contact";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { media } from "@/lib/media";
import { CONTACT } from "@/lib/contact";

function TickerRow({ id, items }: { id: string; items: readonly string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={`${id}-${item}`} className="kicker inline-flex items-center px-4">
          {item}
          <span className="px-4">/</span>
        </span>
      ))}
    </div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();

  return (
    <header className="sticky top-0 z-50 border-b border-ink/20 bg-bg">
      <div className="wrap flex min-h-16 items-center justify-between gap-4">
        <a href="#top" className="text-lg font-medium tracking-tight">
          getlocaljapan
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {t.nav.map(([label, href]) => (
            <a key={href} href={href} className="link-draw text-sm">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <p className="hidden text-sm sm:block">
            <TokyoClock /> <span className="kicker">{t.tokyo}</span>
          </p>
          <button
            type="button"
            className="tap min-h-11 border border-ink px-3 text-sm"
            onClick={() => setLang(lang === "en" ? "zh" : "en")}
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <a
            className="tap hidden min-h-11 items-center bg-ink px-4 text-sm text-paper md:inline-flex"
            href={whatsappLink(t.intro)}
            target="_blank"
            rel="noreferrer"
          >
            {t.wa}
          </a>
          <button
            type="button"
            className="tap grid size-11 place-items-center border border-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative size-5">
              <Menu className={clsx("icon-swap absolute inset-0 size-5", open ? "off" : "on")} aria-hidden="true" />
              <X className={clsx("icon-swap absolute inset-0 size-5", open ? "on" : "off")} aria-hidden="true" />
            </span>
            <span className="sr-only">{open ? t.menuClose : t.menuOpen}</span>
          </button>
        </div>
      </div>
      <div id="mobile-nav" className={clsx("menu-panel md:hidden", open && "open")}>
        <div className="overflow-hidden">
          <nav className="wrap grid gap-1 pb-4" aria-label="Mobile">
            {t.nav.map(([label, href]) => (
              <a key={href} href={href} className="min-h-11 py-2 text-lg" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
            <p className="pt-2 text-sm sm:hidden">
              <TokyoClock /> {t.tokyo}
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  const { t } = useI18n();
  return (
    <section id="questions" className="wrap py-20 md:py-28">
      <p className="kicker">{t.faqKicker}</p>
      <h2 className="display-2 mt-3">{t.faqTitle}</h2>
      <div className="mt-8 border-t border-ink/25">
        {t.faqs.map((item, index) => {
          const on = open === index;
          return (
            <div key={item.q} className="border-b border-ink/25">
              <button
                type="button"
                className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={on}
                onClick={() => setOpen(on ? -1 : index)}
              >
                <span className="font-display text-2xl">{item.q}</span>
                <span className="font-display text-2xl tabular-nums" aria-hidden="true">
                  {on ? "–" : "+"}
                </span>
              </button>
              <div className={clsx("faq-a", on && "open")}>
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-5">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function HeroFilm() {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) void el.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      className="hero-still"
      poster="/media/hero-bg.jpg"
      muted
      playsInline
      loop
      autoPlay
      preload="auto"
      aria-hidden="true"
    >
      <source src="/media/hero-bg.mp4" type="video/mp4" />
    </video>
  );
}

function Page() {
  const { t } = useI18n();
  return (
    <div id="top" className="min-h-screen">
      <a href="#content" className="skip">
        {t.skip}
      </a>
      <ScrollProgress />
      <Nav />
      <main id="content">
        <section className="hero-stage">
          <HeroFilm />
          <div className="hero-wash" />
          <div className="hero-copy wrap">
            <p className="kicker">{t.heroKicker}</p>
            <h1 className="display mt-4 max-w-3xl">
              {t.hero1}{" "}
              <span className="word block italic" style={{ animationDelay: "120ms" }}>
                {t.hero2}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg">{t.heroBody}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#plan" className="tap inline-flex min-h-11 items-center bg-ink px-5 text-paper">
                {t.shape}
              </a>
              <a
                href={whatsappLink(t.intro)}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline decoration-ink/40 underline-offset-4"
              >
                {t.waTalk}
              </a>
            </div>
            <p className="mt-8 text-sm">{t.heroBy}</p>
            <p className="mt-1 text-sm">{t.heroFacts}</p>
          </div>
        </section>
        <ul className="grid grid-cols-2 border-b border-ink md:grid-cols-4">
          {t.facts.map((fact) => (
            <li key={fact} className="kicker border-t border-ink px-4 py-5 md:px-6">
              {fact}
            </li>
          ))}
        </ul>
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <TickerRow id="a" items={t.ticker} />
            <TickerRow id="b" items={t.ticker} />
          </div>
        </div>
        <section className="wrap py-20 md:py-28">
          <div className="grid gap-5 md:grid-cols-3">
            {t.pillars.map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="h-full border-t border-ink pt-6">
                  <h2 className="font-display text-4xl">{item.title}</h2>
                  <p className="mt-4 max-w-sm">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
        <Experiences />
        <section id="method" className="wrap pb-20 md:pb-28">
          <p className="kicker">{t.wayKicker}</p>
          <h2 className="display-2 mt-3 max-w-xl">{t.wayTitle}</h2>
          <ol className="mt-10 grid gap-px bg-ink/20 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step) => (
              <li key={step.n} className="bg-bg p-6">
                <span className="font-display text-4xl tabular-nums">{step.n}</span>
                <h3 className="mt-8 font-display text-3xl">{step.title}</h3>
                <p className="mt-3">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="fleet" className="border-t border-ink/15">
          <div className="wrap grid items-center gap-10 py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-7">
              <Film
                src={media.alphard.src}
                poster={media.alphard.poster}
                label={media.alphard.label}
                caption={t.fleetCaption}
              />
            </div>
            <div className="lg:col-span-5">
              <p className="kicker">{t.fleetKicker}</p>
              <h2 className="display-2 mt-3">{t.fleetTitle}</h2>
              <p className="mt-5 text-lg">{t.fleetBody}</p>
              <ul className="mt-6 grid gap-2">
                {t.fleetPoints.map((point) => (
                  <li key={point} className="border-t border-ink/20 py-2 text-sm">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <p className="kicker">{t.guideKicker}</p>
              <h2 className="display-2 mt-3">{t.guideTitle}</h2>
              <p className="mt-5 text-lg">{t.guideBody}</p>
            </div>
            <div className="lg:col-span-7">
              <Film
                src={media.shrine.src}
                poster={media.shrine.poster}
                label={media.shrine.label}
                caption={t.guideCaption}
              />
            </div>
          </div>
        </section>
        <Composer />
        <Faq />
        <section id="contact" className="wrap pb-8 pt-4 md:pb-16">
          <p className="kicker">{t.contactKicker}</p>
          <h2 className="display mt-4">
            Steve Uryuu
          </h2>
          <p className="mt-5 max-w-xl text-lg">{t.contactBody}</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <a className="stamp bg-paper p-6" href={whatsappLink(t.intro)} target="_blank" rel="noreferrer">
              <span className="kicker">{t.wa}</span>
              <span className="mt-4 block font-display text-3xl sm:text-4xl">{CONTACT.phoneDisplay}</span>
            </a>
            <a className="stamp bg-paper p-6" href={`mailto:${CONTACT.email}`}>
              <span className="kicker">{t.email}</span>
              <span className="mt-4 block break-all font-display text-2xl sm:text-4xl">{CONTACT.email}</span>
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap flex flex-wrap items-center justify-between gap-3 border-t border-ink/20 py-8 text-sm">
        <p>getlocaljapan</p>
        <p>
          {CONTACT.name} · {CONTACT.phoneDisplay} · {CONTACT.email}
        </p>
      </footer>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/20 bg-bg p-3 md:hidden">
        <a
          className="tap flex min-h-11 items-center justify-center bg-ink px-4 text-paper"
          href="#plan"
        >
          {t.shape}
        </a>
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}
