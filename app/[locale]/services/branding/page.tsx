"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import ServiceHero from "./hero";

function BrandingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/8 blur-3xl" />

      {/* Abstract lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-35"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brand-lines" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M-50,480 C250,420 350,260 600,240 C820,220 950,340 1250,300"
          stroke="url(#brand-lines)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M-50,140 C260,210 340,380 610,390 C880,400 980,210 1250,180"
          stroke="url(#brand-lines)"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="220" cy="210" r="4" fill="rgba(255,255,255,0.55)" />
        <circle cx="915" cy="340" r="4" fill="rgba(255,255,255,0.45)" />
        <circle cx="650" cy="245" r="3" fill="rgba(255,255,255,0.35)" />
      </svg>
    </div>
  );
}

export default function BrandingPage() {
  const t = useTranslations("Branding");
  const tNav = useTranslations("Nav");

  const whatWeDoCards = [
    { key: "strategy" },
    { key: "visual" },
    { key: "verbal" },
    { key: "rollout" },
  ] as const;

  const approachSteps = ["understand", "structure", "create", "activate"] as const;

  const whyItems = t.raw("whyChoose.items") as string[];
  const whoItems = t.raw("forWhom.items") as string[];

  const sectionElRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    const elements = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        // Pick the most "visible" card as the active one
        const best = visible.sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
        )[0];

        const idx = Number((best.target as HTMLElement).dataset.index ?? "0");
        if (!Number.isNaN(idx)) setActiveCardIndex(idx);
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8],
        rootMargin: "-30% 0px -55% 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 relative">
        <ServiceHero variant="full" />

        {/* 2) What we do (uses the fixed background behind) */}
        <section
          className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 text-white overflow-hidden"
          ref={(el) => {
            // keep a stable ref for spotlight computations without recreating the handler closures
            sectionElRef.current = el;
          }}
          onMouseMove={(e) => {
            const el = sectionElRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            setSpotlight({
              x: e.clientX - rect.left,
              y: e.clientY - rect.top,
              visible: true,
            });
          }}
          onMouseLeave={() => setSpotlight((s) => ({ ...s, visible: false }))}
        >
          {/* Spotlight lighting */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: spotlight.visible ? 1 : 0,
              background: `radial-gradient(800px circle at ${spotlight.x}px ${spotlight.y}px, rgba(138,28,26,0.12), transparent 60%)`,
            }}
          />
          {/* Soft brand tint to integrate with the WaitLa palette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_10%,rgba(138,28,26,0.10),transparent_60%)]" />

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-6xl font-bold text-white">
                {t("whatWeDo.title")}
              </h2>
            </div>

            <div className="relative max-w-[1200px] mx-auto w-full">
              {/* Vertical spine */}
              <div className="hidden md:block absolute left-[46px] top-0 bottom-0 w-px bg-white/15" />

              <div className="space-y-8">
                {whatWeDoCards.map((card, index) => {
                  const items = t.raw(`whatWeDo.cards.${card.key}.items`) as string[];
                  const isActive = index === activeCardIndex;
                  const step = String(index + 1).padStart(2, "0");

                  return (
                    <motion.div
                      key={card.key}
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      data-index={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: index * 0.06 }}
                      animate={{
                        opacity: isActive ? 1 : 0.35,
                        scale: isActive ? 1 : 0.985,
                      }}
                      className="grid md:grid-cols-[92px_1fr] gap-6 items-start"
                    >
                      {/* Left step number (desktop) */}
                      <div className="hidden md:flex justify-center">
                        <div className="relative w-[92px] flex flex-col items-center">
                          <div
                            className={`text-[11px] font-semibold tracking-[0.28em] uppercase transition-colors ${
                              isActive ? "text-white/95" : "text-white/45"
                            }`}
                          >
                            {t("whatWeDo.stepLabel")}
                          </div>
                          <div
                            className={`text-5xl font-bold leading-none transition-colors ${
                              isActive ? "text-white" : "text-white/25"
                            }`}
                          >
                            {step}
                          </div>
                          <div
                            className={`mt-4 h-3 w-3 rounded-full border transition-colors ${
                              isActive
                                ? "bg-white border-white/60 shadow-[0_0_24px_rgba(255,255,255,0.35)]"
                                : "bg-white/10 border-white/15"
                            }`}
                          />
                        </div>
                      </div>

                      {/* Card */}
                      <div className="relative">
                        {/* Active card glow */}
                        <div
                          className={`pointer-events-none absolute -inset-1 rounded-2xl blur-2xl transition-opacity duration-300 ${
                            isActive ? "opacity-100" : "opacity-0"
                          }`}
                          style={{
                            background:
                              "radial-gradient(600px circle at 20% 30%, rgba(138,28,26,0.32), transparent 55%)",
                          }}
                        />

                        <div
                          className={`relative rounded-2xl border bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(0,0,0,0.35)] transition-colors ${
                            isActive
                              ? "border-white/25"
                              : "border-white/10 hover:border-white/15"
                          }`}
                        >
                          {/* Spotlight inside card */}
                          <div
                            className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                              isActive ? "opacity-100" : "opacity-0"
                            }`}
                            style={{
                              background:
                                "radial-gradient(520px circle at 30% 20%, rgba(255,255,255,0.12), transparent 62%)",
                            }}
                          />

                          <div className="relative p-8 sm:p-10">
                            <div className="flex items-center gap-4">
                              {/* Mobile label (no pill/button styling) */}
                              <div
                                className={`md:hidden text-[11px] font-semibold tracking-[0.28em] uppercase transition-colors ${
                                  isActive ? "text-white/90" : "text-white/55"
                                }`}
                              >
                                {t("whatWeDo.stepLabel")}
                              </div>
                            </div>

                            <h3 className="mt-6 text-2xl sm:text-3xl font-bold text-white">
                              {t(`whatWeDo.cards.${card.key}.title`)}
                            </h3>

                            <ul className="mt-6 space-y-4">
                              {items.map((item) => (
                                <li key={item} className="flex items-start gap-3">
                                  <span className="h-2.5 w-2.5 rounded-full border border-primary/60 bg-primary/15 shadow-[0_0_14px_rgba(239,68,68,0.25)] flex-shrink-0 mt-2" />
                                  <span className="text-white/85 text-base sm:text-lg">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 4) Our approach */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
                {t("ourApproach.title")}
              </h2>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                {t("ourApproach.description")}
              </p>
            </div>

            <div className="relative grid md:grid-cols-4 gap-8">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: "easeInOut", delay: 0.15 }}
                className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary origin-left"
              />

              {approachSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className="relative bg-gray-50 rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-lg">
                    {index + 1}
                  </div>
                  <p className="mt-6 text-center font-semibold text-gray-900">
                    {t(`ourApproach.steps.${step}`)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5) Why / Who */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)] md:gap-0">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="py-2"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {t("whyChoose.title")}
                </h2>
                <ul className="mt-8 space-y-4">
                  {whyItems.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Center gutter fade (desktop) */}
              <div className="hidden md:block relative" aria-hidden="true">
                {/* Soft glow wash */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-28 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl opacity-70" />
                {/* Thin gradient line */}
                <div className="absolute inset-y-10 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-primary/45 to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="py-2"
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {t("forWhom.title")}
                </h2>
                <ul className="mt-8 space-y-4">
                  {whoItems.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <div className="mt-1 h-3 w-3 rounded-full bg-primary flex-shrink-0" />
                      <p className="text-gray-700 text-lg">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6) CTA */}
        <section className="relative z-20 overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-12 xl:px-16 text-white">
          {/* Subtle glass panel so text stays readable on the shared fixed background */}
          <div className="pointer-events-none absolute inset-0 bg-black/15" />
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            >
              {t("cta.headline")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-6 text-lg sm:text-xl text-white/90"
            >
              {t("cta.subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                className="relative inline-flex items-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-lg font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300 group after:content-[''] after:absolute after:inset-0 after:-z-10 after:rounded-full after:blur-2xl after:opacity-60 after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.55),rgba(138,28,26,0.35),transparent_70%)] hover:after:opacity-90"
              >
                {t("cta.button")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-8 text-lg font-medium text-white/90 italic"
            >
              {t("cta.tagline")}
            </motion.p>
          </div>
        </section>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}


