"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function UGCBackLayer() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-white/7 blur-3xl" />

      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ugc-lines" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M-50,420 C260,350 380,220 610,240 C860,260 980,380 1250,320"
          stroke="url(#ugc-lines)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M-50,180 C260,230 360,360 620,380 C880,400 1000,240 1250,200"
          stroke="url(#ugc-lines)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="210" cy="240" r="4" fill="rgba(255,255,255,0.30)" />
        <circle cx="920" cy="380" r="4" fill="rgba(255,255,255,0.22)" />
      </svg>
    </div>
  );
}

export default function UGCAndStorytellingPage() {
  const t = useTranslations("UGCAndStorytelling");
  const tNav = useTranslations("Nav");

  const whatWeDoWrapRef = useRef<HTMLDivElement | null>(null);
  const whatWeDoStickyRef = useRef<HTMLDivElement | null>(null);
  const whatWeDoScrollRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [stickyTop, setStickyTop] = useState(96);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const measure = () => {
      const wrap = whatWeDoWrapRef.current;
      const sticky = whatWeDoStickyRef.current;
      const scrollEl = whatWeDoScrollRef.current;
      if (!wrap || !sticky || !scrollEl) return;

      const headerEl = document.querySelector("header");
      const headerH = headerEl?.getBoundingClientRect().height ?? 0;
      // small breathing room under the sticky header
      const topOffset = Math.round(headerH + 16);
      setStickyTop(topOffset);

      const scrollRange = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
      /**
       * Important: the amount of "sticky time" available is:
       * parentHeight - stickyHeight - topOffset
       * So to keep the section pinned until the inner scroll finishes,
       * we must include `topOffset` in the wrapper height.
       */
      wrap.style.height = `${sticky.offsetHeight + topOffset + scrollRange + 1}px`;
    };

    const syncScroll = () => {
      const wrap = whatWeDoWrapRef.current;
      const scrollEl = whatWeDoScrollRef.current;
      if (!wrap || !scrollEl) return;

      const headerEl = document.querySelector("header");
      const headerH = headerEl?.getBoundingClientRect().height ?? 0;
      const topOffset = Math.round(headerH + 16);

      const rect = wrap.getBoundingClientRect();
      // Start consuming inner scroll once the wrapper reaches the sticky top offset
      const start = window.scrollY + rect.top - topOffset;
      const scrollRange = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);

      const progress = window.scrollY - start;
      const target = Math.min(Math.max(progress, 0), scrollRange);
      scrollEl.scrollTop = target;
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        syncScroll();
      });
    };

    measure();
    syncScroll();

    const ro = new ResizeObserver(() => {
      measure();
      syncScroll();
    });
    if (whatWeDoStickyRef.current) ro.observe(whatWeDoStickyRef.current);
    if (whatWeDoScrollRef.current) ro.observe(whatWeDoScrollRef.current);

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 relative">
        {/* Fixed background layer (static on scroll, lower z-index) */}
        <div className="fixed inset-0 z-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]">
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-55"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          >
            <source src="/reels/57119-483011616_tiny.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/35 to-black/60" />
          <UGCBackLayer />
        </div>

        {/* 1) Hero — immersive video background */}
        <section className="relative z-20 text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
          <div className="relative z-30 max-w-6xl mx-auto text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide"
            >
              <Sparkles className="h-4 w-4" />
              {t("title")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              {t("hero.headline")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-10 flex items-center justify-center"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white text-primary px-7 py-3.5 text-sm sm:text-base font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 group"
              >
                {tNav("contactCta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* 2) What we do — scroll-linked to page scroll */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white z-20">
          <div className="max-w-7xl mx-auto">
            <div ref={whatWeDoWrapRef} className="relative max-w-4xl mx-auto">
              <div
                ref={whatWeDoStickyRef}
                className={prefersReducedMotion ? "relative" : "sticky"}
                style={prefersReducedMotion ? undefined : { top: stickyTop }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                    {t("whatWeDo.title")}
                  </h2>
                </div>

                {/* Scroll fades */}
                <div className="pointer-events-none absolute inset-x-0 top-[84px] h-10 bg-gradient-to-b from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />

                {/* Scroll container (driven by page scroll) */}
                <div
                  ref={whatWeDoScrollRef}
                  className="relative max-h-[520px] overflow-y-auto pr-3 space-y-6 overscroll-contain"
                  aria-label={t("whatWeDo.title")}
                >
                  {(["ugc", "storytelling", "integration"] as const).map((key) => {
                    const items = t.raw(`whatWeDo.cards.${key}.items`) as string[];
                    return (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300"
                      >
                        <h3 className="text-2xl font-bold text-gray-900">
                          {t(`whatWeDo.cards.${key}.title`)}
                        </h3>
                        <ul className="mt-5 space-y-3">
                          {items.map((it) => (
                            <li key={it} className="flex items-start gap-3">
                              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="text-gray-700">{it}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>

                <style jsx>{`
                  div[aria-label]::-webkit-scrollbar {
                    width: 10px;
                  }
                  div[aria-label]::-webkit-scrollbar-thumb {
                    background: rgba(138, 28, 26, 0.35);
                    border-radius: 999px;
                    border: 3px solid rgba(255, 255, 255, 0.9);
                  }
                  div[aria-label]::-webkit-scrollbar-track {
                    background: transparent;
                  }
                `}</style>
              </div>
            </div>
          </div>
        </section>

        {/* 3) Our Approach — 3-step animated funnel */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {t("approach.title")}
              </h2>
              <p className="mt-4 text-lg text-gray-600">{t("approach.description")}</p>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
              {(["capture", "involve", "reinforce"] as const).map((k, idx) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-120px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm hover:shadow-lg hover:border-primary/25 transition-all duration-300"
                >
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      {idx + 1}
                    </span>
                    {t(`approach.steps.${k}.title`)}
                  </div>
                  <p className="mt-4 text-gray-600">{t(`approach.steps.${k}.description`)}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-lg text-gray-600 mt-10 max-w-4xl mx-auto">
              {t("approach.conclusion")}
            </p>
          </div>
        </section>

        {/* 4) Social proof — why / who + floating highlights */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white z-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)] md:gap-0 items-start">
              <div className="py-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {t("proof.whyTitle")}
                </h2>
                <ul className="mt-8 space-y-4">
                  {(t.raw("proof.whyItems") as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden md:block relative" aria-hidden="true">
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl opacity-70" />
                <div className="absolute inset-y-10 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/45 to-transparent" />
              </div>

              <div className="py-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {t("proof.whoTitle")}
                </h2>
                <ul className="mt-8 space-y-4">
                  {(t.raw("proof.whoItems") as string[]).map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 5) Conversion CTA */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 text-white overflow-hidden z-20">
          {/* Subtle overlay to keep CTA readable on the shared fixed background */}
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {t("cta.headline")}
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-white/90">{t("cta.subtitle")}</p>

            <div className="mt-12">
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-lg font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300 group after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-2xl after:opacity-60 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.55),rgba(138,28,26,0.35),transparent_70%)] hover:after:opacity-90"
              >
                {t("cta.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="mt-8 text-white/90 italic text-lg font-medium">
                {t("cta.dynamicTaglines.both")}
              </p>
            </div>
          </div>
        </section>

      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}


