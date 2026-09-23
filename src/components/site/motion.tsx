import { useEffect, useRef, useState, type ReactNode } from "react";
import { clsx } from "clsx";

export function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.28 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  return { ref, shown };
}

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={clsx("reveal", shown && "in", className)}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Poster({ src }: { src: string }) {
  const [ok, setOk] = useState(true);
  if (!ok) return null;
  return (
    <img
      src={src}
      alt=""
      className="absolute inset-0 h-full w-full object-cover"
      onError={() => setOk(false)}
    />
  );
}

export function Film({
  src,
  poster,
  label,
  caption,
  light = false,
  plain = false,
}: {
  src: string;
  poster: string;
  label: string;
  caption?: string;
  light?: boolean;
  plain?: boolean;
}) {
  const { ref, shown } = useInView<HTMLDivElement>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isGif = src.endsWith(".gif");

  useEffect(() => {
    const el = videoRef.current;
    if (!el || isGif) return;
    el.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shown && !reduce) void el.play().catch(() => {});
    else el.pause();
  }, [shown, isGif]);

  return (
    <div ref={ref} className={plain ? "bg-paper" : light ? "screen-light bg-paper" : "screen bg-paper"}>
      <div className="relative aspect-video overflow-hidden bg-paper">
        {isGif ? (
          <img src={src} alt={label} className="h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0">
            <Poster src={poster} />
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={src}
              poster={poster}
              muted
              playsInline
              loop
              preload="auto"
              aria-label={label}
            />
          </div>
        )}
        {caption ? (
          <p className="absolute bottom-3 left-3 z-10 bg-paper px-3 py-2 text-sm text-ink">{caption}</p>
        ) : null}
      </div>
    </div>
  );
}

export function TokyoClock() {
  const [label, setLabel] = useState("Tokyo");

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Tokyo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      }).format(new Date());
    const tick = () => setLabel(format());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return <span className="tabular-nums">{label}</span>;
}

export function ScrollProgress() {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScale(height > 0 ? window.scrollY / height : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="progress" style={{ transform: `scaleX(${scale})` }} />;
}
