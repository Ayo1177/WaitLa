"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";

function WebBackground() {
  // Keep the soft glow blobs, remove the line artwork.
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const apply = () => setReduced(!!mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);
  return reduced;
}

function useCountUp(shouldStart: boolean, to: number, durationMs = 900, decimals = 0) {
  const [value, setValue] = useState(to);

  useEffect(() => {
    if (!shouldStart) return;
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const next = from + (to - from) * eased;
      const pow = Math.pow(10, decimals);
      setValue(Math.round(next * pow) / pow);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shouldStart, to, durationMs, decimals]);

  return value.toFixed(decimals);
}

function BlueprintMock({ reducedMotion }: { reducedMotion: boolean }) {
  const common = reducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55 } };

  return (
    <div className="relative rounded-2xl border border-white/15 bg-white/8 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        </div>
        <div className="h-2 w-32 rounded-full bg-white/15" />
      </div>
      <div className="p-6">
        <motion.div {...common} className="h-10 w-2/3 rounded-xl bg-white/14" />
        <motion.div
          {...(reducedMotion
            ? { initial: false, animate: { opacity: 1 }, transition: { duration: 0 } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.55, delay: 0.12 } })}
          className="mt-4 h-4 w-full rounded bg-white/10"
        />
        <motion.div
          {...(reducedMotion
            ? { initial: false, animate: { opacity: 1 }, transition: { duration: 0 } }
            : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.55, delay: 0.2 } })}
          className="mt-2 h-4 w-11/12 rounded bg-white/10"
        />
        <div className="mt-6 grid grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              {...(reducedMotion
                ? { initial: false, animate: { opacity: 1, y: 0 }, transition: { duration: 0 } }
                : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.28 + i * 0.08 } })}
              className="h-24 rounded-xl bg-white/10 border border-white/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Modal({
  open,
  title,
  content,
  closeLabel,
  onClose,
}: {
  open: boolean;
  title: string;
  content: string;
  closeLabel: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-2xl"
          >
            <div className="rounded-2xl border border-white/12 bg-gray-950/70 text-white backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.55)] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="font-bold">{title}</div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition"
                >
                  {closeLabel}
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6 text-white/90 leading-relaxed">{content}</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function WebProfessionalWebsitePage() {
  const t = useTranslations("WebProfessionalWebsite");
  const tNav = useTranslations("Nav");
  const reducedMotion = usePrefersReducedMotion();

  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [openPhase, setOpenPhase] = useState<"before" | "during" | "after" | null>(null);
  const [calcType, setCalcType] = useState<"vitrine" | "ecommerce" | "landing">("vitrine");
  const [calcIndustry, setCalcIndustry] = useState("E-commerce");
  const [calcPriority, setCalcPriority] = useState<"design" | "seo" | "speed">("speed");

  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const dashboardInView = useInView(dashboardRef, { once: true, margin: "-120px" });
  const seoScore = useCountUp(dashboardInView && !reducedMotion, 95, 900, 0);
  const loadSec = useCountUp(dashboardInView && !reducedMotion, 1.2, 900, 1);
  const convRate = useCountUp(dashboardInView && !reducedMotion, 3.8, 900, 1);
  const a11yScore = useCountUp(dashboardInView && !reducedMotion, 98, 900, 0);

  const supportsHover = useMemo(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia?.("(hover: hover)")?.matches ?? true;
  }, []);

  const specTags = useMemo(
    () => ({
      custom: ["Next.js", "SSR/SSG", "API Routes", "CMS", "i18n", "TypeScript"],
      perf: ["Core Web Vitals", "Lighthouse 90+", "Caching", "Image Optimization", "A/B Testing"],
      design: ["UI/UX", "Design System", "Branding", "Accessibility", "Responsive"],
    }),
    []
  );

  const outline = useMemo(() => {
    const typeKey = `calculator.types.${calcType}` as const;
    const priKey = `calculator.priorities.${calcPriority}` as const;
    return {
      title: t("calculator.output.title"),
      lines: [
        `${t("calculator.output.siteType")}: ${t(typeKey)}`,
        `${t("calculator.output.industry")}: ${calcIndustry || t("calculator.output.industryPlaceholder")}`,
        `${t("calculator.output.priority")}: ${t(priKey)}`,
        t("calculator.output.next"),
      ],
    };
  }, [calcType, calcIndustry, calcPriority, t]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 relative">
        {/* Fixed background layer (static on scroll, lower z-index) */}
        <div className="fixed inset-0 z-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]">
          <WebBackground />
        </div>

        {/* 1) Hero — performance-focused */}
        <section className="relative z-20 text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
          <div className="relative z-30 max-w-7xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide"
            >
              <Sparkles className="h-4 w-4" />
              {t("hero.badge")}
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
              className="mt-6 text-lg sm:text-xl text-white/90 max-w-3xl lg:max-w-none mx-auto lg:mx-0 leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-10 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3"
            >
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-3 rounded-full bg-white text-primary px-7 py-3.5 text-sm sm:text-base font-semibold shadow-lg hover:scale-[1.02] transition-all duration-300 group after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-2xl after:opacity-60 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.55),rgba(138,28,26,0.35),transparent_70%)] hover:after:opacity-90"
              >
                {tNav("contactCta")}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
              </div>

              {/* Blueprint preview */}
              <div className="relative">
                <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(900px_circle_at_30%_30%,rgba(255,255,255,0.12),transparent_60%)] blur-2xl" />
                <BlueprintMock reducedMotion={reducedMotion} />
              </div>
            </div>
          </div>
          </section>

          {/* 2) Intro + interactive demo */}
          <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    {t("intro.title")}
                  </h2>
                  <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                    {t("intro.description")}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-full max-w-[640px]">
                    <div className="relative aspect-[16/10] w-full">
                      {/* Desktop (base) */}
                      <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-sm">
                        <Image
                          src="/images/desktop web image.png"
                          alt="Website demo (desktop)"
                          fill
                          className="object-cover bg-white"
                          sizes="(min-width: 1024px) 640px, 100vw"
                          priority={false}
                        />
                      </div>

                      {/* Phone (overlay) */}
                      <div className="absolute right-[6%] bottom-[6%] w-[34%] sm:w-[28%] max-w-[240px] min-w-[140px]">
                        <div className="relative aspect-[9/19] overflow-hidden rounded-[26px] shadow-2xl rotate-[-10deg] skew-y-[-4deg]">
                          <Image
                            src="/images/phone web image.png"
                            alt="Website demo (mobile)"
                            fill
                            className="object-cover bg-white"
                            sizes="240px"
                            priority={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* 3) What we do — modular grid with tech spec toggle */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {t("whatWeDo.title")}
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {([
                { key: "custom", tags: specTags.custom },
                { key: "performance", tags: specTags.perf },
                { key: "design", tags: specTags.design },
              ] as const).map((card, idx) => {
                const isFlipped = flippedCard === card.key;
                const shouldFlip = supportsHover ? false : true;
                const benefitItems = t.raw(`whatWeDo.cards.${card.key}.items`) as string[];
                return (
                  <div key={card.key} className="perspective-1000">
                    <button
                      type="button"
                      onClick={() => {
                        if (!supportsHover) setFlippedCard((p) => (p === card.key ? null : card.key));
                      }}
                      onMouseEnter={() => {
                        if (supportsHover) setFlippedCard(card.key);
                      }}
                      onMouseLeave={() => {
                        if (supportsHover) setFlippedCard(null);
                      }}
                      className="w-full text-left"
                      aria-pressed={isFlipped}
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: reducedMotion ? 0 : 0.45 }}
                        className="relative h-[360px] rounded-2xl"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="text-sm font-semibold text-primary">{t(`whatWeDo.cards.${card.key}.label`)}</div>
                          <h3 className="mt-2 text-2xl font-bold text-gray-900">
                            {t(`whatWeDo.cards.${card.key}.title`)}
                          </h3>
                          <ul className="mt-6 space-y-3">
                            {benefitItems.map((it) => (
                              <li key={it} className="flex items-start gap-3">
                                <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                                <span className="text-gray-700">{it}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 rounded-2xl border border-primary/20 bg-red-50 p-8 shadow-sm"
                          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                        >
                          <div className="text-sm font-semibold text-primary">{t("whatWeDo.specTitle")}</div>
                          <h3 className="mt-2 text-2xl font-bold text-gray-900">
                            {t(`whatWeDo.cards.${card.key}.specHeadline`)}
                          </h3>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {card.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center rounded-full border border-primary/20 bg-white px-3 py-2 text-xs font-semibold text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-8 text-sm text-gray-700">
                            {t("whatWeDo.specCaption")}
                          </div>
                        </div>
                      </motion.div>
                    </button>
                  </div>
                );
              })}
            </div>

            <style jsx>{`
              .perspective-1000 {
                perspective: 1000px;
              }
            `}</style>
          </div>
        </section>

        {/* 4) Our approach — interactive 3-phase timeline */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {t("approach.title")}
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                {t("approach.description")}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {(["before", "during", "after"] as const).map((phase, idx) => (
                <button
                  key={phase}
                  type="button"
                  onClick={() => setOpenPhase(phase)}
                  className="text-left rounded-2xl border border-gray-200 bg-gray-50 p-8 hover:shadow-lg hover:border-primary/25 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-primary">
                      {t(`approach.phases.${phase}.label` as any)}
                    </div>
                    <div className="h-9 w-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                      {idx + 1}
                    </div>
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-gray-900">
                    {t(`approach.phases.${phase}.title` as any)}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {(t.raw(`approach.phases.${phase}.items`) as string[]).map((it, i) => (
                      <motion.li
                        key={it}
                        initial={reducedMotion ? false : { opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-120px" }}
                        transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.05 * i }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-gray-700">{it}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-6 text-sm font-semibold text-primary">
                    {t("approach.openCase")}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 5) Why + For whom + performance dashboard */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-14">
              {/* Why / Who laid horizontally */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div>
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

                <div>
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

              {/* KPI bubbles (no background container) */}
              <div ref={dashboardRef} className="flex justify-center">
                {/* Mobile/tablet: simple grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center w-full max-w-4xl lg:hidden">
                  {(
                    [
                      { key: "seo", value: seoScore, suffix: "/100" },
                      { key: "conversion", value: convRate, suffix: "%" },
                      { key: "load", value: loadSec, suffix: "s" },
                      { key: "accessibility", value: a11yScore, suffix: "/100" },
                    ] as const
                  ).map((kpi) => (
                    <motion.div
                      key={kpi.key}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: 10 }}
                      animate={
                        reducedMotion
                          ? { opacity: 1, scale: 1, y: 0 }
                          : dashboardInView
                            ? { opacity: 1, scale: 1, y: 0 }
                            : { opacity: 0, scale: 0.92, y: 10 }
                      }
                      transition={{
                        duration: reducedMotion ? 0 : 0.55,
                        delay: reducedMotion ? 0 : 0.08 * (["seo", "conversion", "load", "accessibility"] as const).indexOf(kpi.key),
                        type: "spring",
                        stiffness: 120,
                        damping: 16,
                      }}
                      className="h-44 w-44 sm:h-52 sm:w-52 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.25)] flex flex-col items-center justify-center text-center px-4"
                    >
                      <div className="text-4xl sm:text-5xl font-bold leading-tight tabular-nums text-white">
                        {kpi.value}
                        <span className="text-base sm:text-lg font-semibold text-white/80">{kpi.suffix}</span>
                      </div>
                      <div className="mt-3 text-xs sm:text-sm font-semibold text-white/90 leading-snug break-words">
                        {t(`dashboard.metrics.${kpi.key}` as any)}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Desktop: arc placement like homepage KPIs */}
                <div className="relative hidden lg:block w-full max-w-6xl h-72 xl:h-80">
                  {(
                    [
                      { key: "seo", value: seoScore, suffix: "/100", pos: "left-[6%] bottom-0 -translate-x-1/2" },
                      { key: "conversion", value: convRate, suffix: "%", pos: "left-[28%] bottom-14 -translate-x-1/2" },
                      { key: "load", value: loadSec, suffix: "s", pos: "right-[28%] bottom-14 -translate-x-1/2" },
                      { key: "accessibility", value: a11yScore, suffix: "/100", pos: "right-[6%] bottom-0 translate-x-1/2" },
                    ] as const
                  ).map((kpi, idx) => (
                    <motion.div
                      key={kpi.key}
                      className={`absolute ${kpi.pos}`}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.92, y: 14 }}
                      animate={
                        reducedMotion
                          ? { opacity: 1, scale: 1, y: 0 }
                          : dashboardInView
                            ? { opacity: 1, scale: 1, y: 0 }
                            : { opacity: 0, scale: 0.92, y: 14 }
                      }
                      transition={{
                        duration: reducedMotion ? 0 : 0.6,
                        delay: reducedMotion ? 0 : 0.12 + idx * 0.08,
                        type: "spring",
                        stiffness: 120,
                        damping: 16,
                      }}
                    >
                      <div className="h-52 w-52 rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.25)] flex flex-col items-center justify-center text-center px-5">
                        <div className="text-5xl font-bold leading-tight tabular-nums text-white">
                          {kpi.value}
                          <span className="text-lg font-semibold text-white/80">{kpi.suffix}</span>
                        </div>
                        <div className="mt-3 text-sm font-semibold text-white/90 leading-snug break-words max-w-[11rem]">
                          {t(`dashboard.metrics.${kpi.key}` as any)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6) CTA — project calculator */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                  {t("cta.headline")}
                </h2>
                <p className="mt-6 text-lg text-gray-600">{t("cta.subtitle")}</p>
                <p className="mt-8 text-lg font-semibold text-primary italic">
                  {t("cta.tagline")}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <div className="text-sm font-semibold text-primary">{t("calculator.kicker")}</div>
                <h3 className="mt-2 text-2xl font-bold text-gray-900">{t("calculator.title")}</h3>

                <div className="mt-6 grid gap-4">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-gray-700">{t("calculator.fields.type")}</span>
                    <select
                      value={calcType}
                      onChange={(e) => setCalcType(e.target.value as any)}
                      className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    >
                      <option value="vitrine">{t("calculator.types.vitrine")}</option>
                      <option value="ecommerce">{t("calculator.types.ecommerce")}</option>
                      <option value="landing">{t("calculator.types.landing")}</option>
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-gray-700">{t("calculator.fields.industry")}</span>
                    <input
                      value={calcIndustry}
                      onChange={(e) => setCalcIndustry(e.target.value)}
                      placeholder={t("calculator.fields.industryPlaceholder")}
                      className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </label>

                  <div className="grid gap-2">
                    <span className="text-sm font-semibold text-gray-700">{t("calculator.fields.priority")}</span>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {(["design", "seo", "speed"] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setCalcPriority(p)}
                          className={[
                            "rounded-xl border px-4 py-4 text-sm font-semibold transition",
                            calcPriority === p
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-700 border-gray-200 hover:border-primary/30 hover:text-primary",
                          ].join(" ")}
                        >
                          {t(`calculator.priorities.${p}` as any)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="font-semibold text-gray-900">{outline.title}</div>
                  <ul className="mt-4 space-y-2 text-gray-700">
                    {outline.lines.map((l) => (
                      <li key={l} className="flex items-start gap-3">
                        <span className="mt-2 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center gap-3 rounded-full bg-primary text-white px-8 py-4 text-lg font-semibold shadow-lg hover:bg-primary-dark hover:scale-[1.02] transition-all duration-300 group"
                  >
                    {tNav("contactCta")}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-10">
        <Footer />
      </div>

      <Modal
        open={openPhase !== null}
        title={openPhase ? t(`approach.phases.${openPhase}.label` as any) : ""}
        content={openPhase ? t(`approach.phases.${openPhase}.caseStudy` as any) : ""}
        closeLabel={t("modal.close")}
        onClose={() => setOpenPhase(null)}
      />
    </div>
  );
}


