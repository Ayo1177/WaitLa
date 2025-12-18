"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, TrendingUp, BarChart3, Target, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

function DataStreamBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Animated data stream elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-white/20"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 30}%`,
              width: "2px",
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
      {/* Floating metric badges */}
      <motion.div
        className="absolute top-1/4 right-1/4 text-white/60 text-sm font-semibold"
        animate={{ opacity: [0.4, 0.8, 0.4], y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ROI: +250%
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/4 text-white/60 text-sm font-semibold"
        animate={{ opacity: [0.4, 0.8, 0.4], y: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
      >
        Reach: 1M+
      </motion.div>
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

export default function DigitalAdsPage() {
  const t = useTranslations("DigitalAds");
  const tNav = useTranslations("Nav");
  const reducedMotion = usePrefersReducedMotion();

  const [selectedPlatform, setSelectedPlatform] = useState<"facebook" | "instagram" | "google" | "youtube" | "tiktok" | "linkedin">("facebook");
  const [roiSpend, setRoiSpend] = useState("");
  const [roiIndustry, setRoiIndustry] = useState("");
  const [roiGoal, setRoiGoal] = useState<"awareness" | "leads" | "sales">("leads");

  const funnelRef = useRef<HTMLDivElement | null>(null);
  const funnelInView = useInView(funnelRef, { once: true, margin: "-120px" });
  const roiValue = useCountUp(funnelInView && !reducedMotion, 250, 1200, 0);

  const cardsScrollRef = useRef<HTMLDivElement | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Center the active card when activeCardIndex changes (but not during manual scroll)
  useEffect(() => {
    if (cardsScrollRef.current && !isScrolling) {
      const container = cardsScrollRef.current;
      const containerWidth = container.clientWidth;
      if (containerWidth === 0) return;
      
      const containerCenter = containerWidth / 2;
      // Cards use w-[80vw] max-w-[600px], so use viewport width
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth;
      const cardWidth = Math.min(viewportWidth * 0.8, 600);
      const gap = 32;
      const cardWithGap = cardWidth + gap;
      
      // Calculate scroll position to center the active card
      // Structure: [empty card] [card 0] [card 1] [card 2] [empty card]
      // To center a card: card center should align with viewport center
      // cardLeft + cardWidth/2 = scrollLeft + containerCenter
      // So: scrollLeft = cardLeft + cardWidth/2 - containerCenter
      const cardLeft = cardWidth + gap + activeCardIndex * cardWithGap;
      const cardCenter = cardLeft + cardWidth / 2;
      const targetScroll = cardCenter - containerCenter;
      
      // Ensure we don't scroll to negative values
      const finalScroll = Math.max(0, targetScroll);
      
      // Use requestAnimationFrame to ensure DOM is ready
      requestAnimationFrame(() => {
        if (cardsScrollRef.current) {
          cardsScrollRef.current.scrollTo({
            left: finalScroll,
            behavior: "smooth",
          });
          setScrollPosition(finalScroll);
        }
      });
    }
  }, [activeCardIndex, isScrolling]);

  // Center the first card on mount
  useEffect(() => {
    const centerCard = () => {
      if (cardsScrollRef.current) {
        const container = cardsScrollRef.current;
        const containerWidth = container.clientWidth;
        if (containerWidth === 0) return; // Not ready yet
        
        const containerCenter = containerWidth / 2;
        // Cards use w-[80vw] max-w-[600px], so use viewport width
        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth;
        const cardWidth = Math.min(viewportWidth * 0.8, 600);
        const gap = 32;
        
        // Scroll to center the first card (index 0)
        // Structure: [empty card] [card 0] [card 1] [card 2] [empty card]
        // Position of card 0: after empty card
        const cardLeft = cardWidth + gap;
        const cardCenter = cardLeft + cardWidth / 2;
        const targetScroll = cardCenter - containerCenter;
        const finalScroll = Math.max(0, targetScroll);
        
        // Use scrollTo for consistency
        container.scrollTo({
          left: finalScroll,
          behavior: "auto", // Instant on mount
        });
        setScrollPosition(finalScroll);
        setActiveCardIndex(0);
      }
    };
    
    // Wait for layout to be ready, try multiple times
    const timeout1 = setTimeout(centerCard, 100);
    const timeout2 = setTimeout(centerCard, 300);
    const timeout3 = setTimeout(centerCard, 600);
    window.addEventListener('resize', centerCard);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      window.removeEventListener('resize', centerCard);
    };
  }, []);

  const platforms = useMemo(
    () => ({
      facebook: {
        name: t("whatWeDo.platforms.facebook.name"),
        logo: "/Logos/meta.png",
        items: t.raw("whatWeDo.cards.paid.items") as string[],
        highlights: t.raw("whatWeDo.platforms.facebook.highlights") as string[],
      },
      instagram: {
        name: t("whatWeDo.platforms.instagram.name"),
        logo: "/Logos/instagram.png",
        items: t.raw("whatWeDo.cards.paid.items") as string[],
        highlights: t.raw("whatWeDo.platforms.instagram.highlights") as string[],
      },
      google: {
        name: t("whatWeDo.platforms.google.name"),
        logo: "/Logos/google.png",
        items: t.raw("whatWeDo.cards.paid.items") as string[],
        highlights: t.raw("whatWeDo.platforms.google.highlights") as string[],
      },
      youtube: {
        name: t("whatWeDo.platforms.youtube.name"),
        logo: "/Logos/youtube.png",
        items: t.raw("whatWeDo.cards.paid.items") as string[],
        highlights: t.raw("whatWeDo.platforms.youtube.highlights") as string[],
      },
      tiktok: {
        name: t("whatWeDo.platforms.tiktok.name"),
        logo: "/Logos/tik tok.png",
        items: t.raw("whatWeDo.cards.paid.items") as string[],
        highlights: t.raw("whatWeDo.platforms.tiktok.highlights") as string[],
      },
      linkedin: {
        name: t("whatWeDo.platforms.linkedin.name"),
        logo: "/Logos/LinkedIn.png",
        items: t.raw("whatWeDo.cards.paid.items") as string[],
        highlights: t.raw("whatWeDo.platforms.linkedin.highlights") as string[],
      },
    }),
    [t]
  );

  const estimatedUplift = useMemo(() => {
    if (!roiSpend || !roiIndustry) return null;
    const spend = parseFloat(roiSpend);
    if (isNaN(spend) || spend <= 0) return null;
    const baseMultiplier = roiGoal === "sales" ? 2.5 : roiGoal === "leads" ? 2.0 : 1.5;
    const min = Math.round(spend * baseMultiplier * 0.8);
    const max = Math.round(spend * baseMultiplier * 1.3);
    return { min, max };
  }, [roiSpend, roiIndustry, roiGoal]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 relative">
        {/* Fixed background layer (static on scroll) */}
        <div className="fixed inset-0 z-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]">
          <DataStreamBackground />
        </div>

        {/* 1) Hero — animated data stream */}
        <section className="relative z-20 text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
          <div className="relative z-30 max-w-6xl mx-auto text-center w-full">
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

        {/* 2) Core Service Hub — interactive platform selector */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">{t("whatWeDo.title")}</h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Platform selector */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(["facebook", "instagram", "google", "youtube", "tiktok", "linkedin"] as const).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedPlatform(key)}
                      className={[
                        "rounded-xl border p-6 text-left transition-all",
                        selectedPlatform === key
                          ? "bg-primary text-white border-primary shadow-lg scale-[1.02]"
                          : "bg-white text-gray-700 border-gray-200 hover:border-primary/30 hover:shadow-md",
                      ].join(" ")}
                    >
                      <div className="relative h-12 w-12 mb-3">
                        <Image
                          src={platforms[key].logo}
                          alt={platforms[key].name}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div className="font-semibold text-sm">{platforms[key].name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic content display */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                      src={platforms[selectedPlatform].logo}
                      alt={platforms[selectedPlatform].name}
                      fill
                      className="object-contain"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{platforms[selectedPlatform].name}</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {platforms[selectedPlatform].highlights.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={reducedMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service cards — horizontal scrollable */}
            <div className="mt-16 relative">
              <style jsx>{`
                .cards-scroll::-webkit-scrollbar {
                  display: none;
                }
                .card-fade-mask {
                  mask-image: linear-gradient(
                    to right,
                    transparent 0%,
                    black 10%,
                    black 90%,
                    transparent 100%
                  );
                  -webkit-mask-image: linear-gradient(
                    to right,
                    transparent 0%,
                    black 10%,
                    black 90%,
                    transparent 100%
                  );
                }
              `}</style>
              <div
                ref={cardsScrollRef}
                className="cards-scroll flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onScroll={(e) => {
                  setIsScrolling(true);
                  const container = e.currentTarget;
                  const scrollLeft = container.scrollLeft;
                  setScrollPosition(scrollLeft);
                  const containerWidth = container.clientWidth;
                  const containerCenter = containerWidth / 2;
                  // Cards use w-[80vw] max-w-[600px]
                  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth;
                  const cardWidth = Math.min(viewportWidth * 0.8, 600);
                  const gap = 32;
                  const cardWithGap = cardWidth + gap;
                  
                  // Calculate which card should be centered based on scroll position
                  // Structure: [empty card] [card 0] [card 1] [card 2] [empty card]
                  const viewportCenter = scrollLeft + containerCenter;
                  
                  // Find which card's center is closest to the viewport center
                  let closestIndex = 0;
                  let minDistance = Infinity;
                  for (let i = 0; i < 3; i++) {
                    // Card position = empty card width + gap + (card index * (card width + gap))
                    const cardLeft = cardWidth + gap + i * cardWithGap;
                    const cardCenter = cardLeft + cardWidth / 2;
                    const distance = Math.abs(cardCenter - viewportCenter);
                    if (distance < minDistance) {
                      minDistance = distance;
                      closestIndex = i;
                    }
                  }
                  
                  // Update active index if we're close enough to a card center
                  if (minDistance < cardWidth * 0.4 && closestIndex !== activeCardIndex) {
                    setActiveCardIndex(closestIndex);
                  }
                  
                  // Reset scrolling flag after a delay
                  setTimeout(() => setIsScrolling(false), 300);
                }}
              >
                {/* Left empty card placeholder */}
                <motion.div
                  className="flex-shrink-0 w-[80vw] max-w-[600px] rounded-2xl border border-gray-200 bg-transparent p-8 snap-center"
                  animate={{
                    opacity: activeCardIndex === 0 ? 0.3 : 0,
                    scale: activeCardIndex === 0 ? 0.9 : 0.8,
                    filter: "blur(10px)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    pointerEvents: "none",
                  }}
                />
                
                {(["paid", "content", "optimization"] as const).map((key, idx) => {
                  const isActive = activeCardIndex === idx;
                  const distance = Math.abs(idx - activeCardIndex);
                  
                  // Gradual blur based on distance from active card
                  // Active card: 0px blur, adjacent: 4px, far: 8px
                  const blurAmount = distance === 0 ? 0 : distance === 1 ? 4 : 8;
                  // Gradual opacity: active card fully visible, others fade out gradually
                  const opacity = distance === 0 ? 1 : distance === 1 ? 0.3 : 0;
                  // Gradual scale: active card normal size, others slightly smaller
                  const scale = distance === 0 ? 1 : distance === 1 ? 0.95 : 0.9;
                  
                  return (
                    <motion.div
                      key={key}
                      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-120px" }}
                      className={`flex-shrink-0 w-[80vw] max-w-[600px] rounded-2xl border border-gray-200 bg-white p-8 shadow-sm snap-center transition-all duration-300 ${!isActive ? 'card-fade-mask' : ''}`}
                      animate={{
                        opacity: opacity,
                        scale: scale,
                        filter: `blur(${blurAmount}px)`,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{t(`whatWeDo.cards.${key}.title`)}</h3>
                      <ul className="space-y-3">
                        {(t.raw(`whatWeDo.cards.${key}.items`) as string[]).map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3">
                            <span className="mt-2 h-2.5 w-2.5 rounded-full bg-primary flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
                
                {/* Right empty card placeholder */}
                <motion.div
                  className="flex-shrink-0 w-[80vw] max-w-[600px] rounded-2xl border border-gray-200 bg-transparent p-8 snap-center"
                  animate={{
                    opacity: activeCardIndex === 2 ? 0.3 : 0,
                    scale: activeCardIndex === 2 ? 0.9 : 0.8,
                    filter: "blur(10px)",
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    pointerEvents: "none",
                  }}
                />
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => {
                    if (!cardsScrollRef.current) return;
                    const container = cardsScrollRef.current;
                    const containerWidth = container.clientWidth;
                    const containerCenter = containerWidth / 2;
                    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth;
                    const cardWidth = Math.min(viewportWidth * 0.8, 600);
                    const gap = 32;
                    const cardWithGap = cardWidth + gap;
                    const newIndex = Math.max(0, activeCardIndex - 1);
                    // Calculate scroll position to center the new card
                    // Account for empty card at start: empty card width + gap + card position
                    const cardLeft = cardWidth + gap + newIndex * cardWithGap;
                    const targetScroll = cardLeft + cardWidth / 2 - containerCenter;
                    setActiveCardIndex(newIndex);
                    container.scrollTo({
                      left: Math.max(0, targetScroll),
                      behavior: "smooth",
                    });
                  }}
                  disabled={activeCardIndex === 0}
                  className={[
                    "p-3 rounded-full border transition-all",
                    activeCardIndex === 0
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-primary text-primary hover:bg-primary hover:text-white",
                  ].join(" ")}
                  aria-label="Previous card"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Dots indicator */}
                <div className="flex gap-2">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        if (!cardsScrollRef.current) return;
                        const container = cardsScrollRef.current;
                        const containerWidth = container.clientWidth;
                        const containerCenter = containerWidth / 2;
                        const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth;
                        const cardWidth = Math.min(viewportWidth * 0.8, 600);
                        const gap = 32;
                        const cardWithGap = cardWidth + gap;
                        // Calculate scroll position to center the clicked card
                        // Account for empty card at start: empty card width + gap + card position
                        const cardLeft = cardWidth + gap + idx * cardWithGap;
                        const targetScroll = cardLeft + cardWidth / 2 - containerCenter;
                        setActiveCardIndex(idx);
                        container.scrollTo({
                          left: Math.max(0, targetScroll),
                          behavior: "smooth",
                        });
                      }}
                      className={[
                        "h-2 rounded-full transition-all",
                        activeCardIndex === idx ? "w-8 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400",
                      ].join(" ")}
                      aria-label={`Go to card ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!cardsScrollRef.current) return;
                    const container = cardsScrollRef.current;
                    const containerWidth = container.clientWidth;
                    const containerCenter = containerWidth / 2;
                    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : containerWidth;
                    const cardWidth = Math.min(viewportWidth * 0.8, 600);
                    const gap = 32;
                    const cardWithGap = cardWidth + gap;
                    const newIndex = Math.min(2, activeCardIndex + 1);
                    // Calculate scroll position to center the new card
                    // Account for empty card at start: empty card width + gap + card position
                    const cardLeft = cardWidth + gap + newIndex * cardWithGap;
                    const targetScroll = cardLeft + cardWidth / 2 - containerCenter;
                    setActiveCardIndex(newIndex);
                    container.scrollTo({
                      left: Math.max(0, targetScroll),
                      behavior: "smooth",
                    });
                  }}
                  disabled={activeCardIndex === 2}
                  className={[
                    "p-3 rounded-full border transition-all",
                    activeCardIndex === 2
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-primary text-primary hover:bg-primary hover:text-white",
                  ].join(" ")}
                  aria-label="Next card"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 3) Our Approach — 4-step ROI funnel */}
        <section ref={funnelRef} className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">{t("approach.title")}</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">{t("approach.description")}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {(["analyze", "create", "launch", "optimize"] as const).map((step, idx) => {
                const isLast = idx === 3;
                return (
                  <motion.div
                    key={step}
                    initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-120px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="relative"
                  >
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                          {idx + 1}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`approach.steps.${step}.title`)}</h3>
                      <p className="text-gray-600 text-sm">{t(`approach.steps.${step}.description`)}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4) Why Choose Us / For Whom + Campaign Wall */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("proof.whyTitle")}</h2>
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
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{t("proof.whoTitle")}</h2>
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

              {/* Campaign Wall */}
              <div>
                <div className="text-sm font-semibold text-primary mb-4 text-center">{t("proof.campaignWall.title")}</div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { src: "/add_images/facebook add.jpeg" },
                    { src: "/add_images/instagram add.jpg" },
                    { src: "/add_images/TikTok_add.jpg" },
                    { src: "/add_images/youtube add.jpeg" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={reducedMotion ? false : { opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-120px" }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
                      style={{
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
                      }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                    >
                      <Image
                        src={item.src}
                        alt={`Campaign creative ${idx + 1}`}
                        fill
                        className="object-cover group-hover:object-contain transition-all duration-300"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5) CTA — Project Brief */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">{t("cta.headline")}</h2>
                <p className="mt-6 text-lg text-gray-600">{t("cta.subtitle")}</p>
                <p className="mt-8 text-lg font-semibold text-primary italic">{t("cta.tagline")}</p>
              </div>

              {/* Project Brief Form */}
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="text-sm font-semibold text-primary mb-2">{t("projectBrief.kicker")}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("projectBrief.title")}</h3>

                <div className="space-y-4">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-gray-700">{t("projectBrief.fields.spend")}</span>
                    <input
                      type="number"
                      value={roiSpend}
                      onChange={(e) => setRoiSpend(e.target.value)}
                      placeholder={t("projectBrief.fields.spendPlaceholder")}
                      className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-gray-700">{t("projectBrief.fields.industry")}</span>
                    <input
                      value={roiIndustry}
                      onChange={(e) => setRoiIndustry(e.target.value)}
                      placeholder={t("projectBrief.fields.industryPlaceholder")}
                      className="h-12 rounded-xl border border-gray-200 bg-white px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </label>

                  <div className="grid gap-2">
                    <span className="text-sm font-semibold text-gray-700">{t("projectBrief.fields.goal")}</span>
                    <div className="grid grid-cols-3 gap-3">
                      {(["awareness", "leads", "sales"] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setRoiGoal(g)}
                          className={[
                            "rounded-xl border px-4 py-3 text-sm font-semibold transition",
                            roiGoal === g
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-gray-700 border-gray-200 hover:border-primary/30 hover:text-primary",
                          ].join(" ")}
                        >
                          {t(`projectBrief.goals.${g}`)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {estimatedUplift && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 rounded-xl border border-primary/20 bg-red-50 p-6"
                    >
                      <div className="text-sm font-semibold text-primary mb-2">{t("projectBrief.result.title")}</div>
                      <div className="text-3xl font-bold text-gray-900">
                        {estimatedUplift.min}K - {estimatedUplift.max}K
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{t("projectBrief.result.subtitle")}</div>
                    </motion.div>
                  )}

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="relative inline-flex items-center gap-3 rounded-full bg-primary text-white px-8 py-4 text-lg font-semibold shadow-lg hover:bg-primary-dark hover:scale-[1.02] transition-all duration-300 group w-full justify-center"
                    >
                      {t("projectBrief.button")}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
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
