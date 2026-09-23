import { experiences } from "@/lib/experiences";
import { Film } from "@/components/site/motion";
import { useI18n } from "@/lib/i18n";

export function Experiences() {
  const { t } = useI18n();

  return (
    <section id="experiences" className="pb-8">
      <div className="wrap pt-4 md:pt-8">
        <p className="kicker">{t.expKicker}</p>
        <h2 className="display-2 mt-3 max-w-xl">{t.expTitle}</h2>
      </div>
      <div className="mt-12">
        {experiences.map((item) => {
          const copy = t.exp[item.id];
          return (
            <article key={item.id} className="grid items-center border-t border-ink/15 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Film plain src={item.media.src} poster={item.media.poster} label={item.media.label} />
              </div>
              <div className="px-5 py-6 sm:px-6 sm:py-10 lg:col-span-4 lg:px-12">
                <p className="kicker">{item.index}</p>
                <h3 className="mt-2 font-display text-4xl sm:text-5xl">{copy.title}</h3>
                <p className="mt-3 font-display text-xl italic sm:text-2xl">{copy.lede}</p>
                <p className="mt-4 max-w-xs text-lg">{copy.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}