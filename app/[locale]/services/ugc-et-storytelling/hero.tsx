"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

function UGCBackLayer() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/8 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ugc-lines" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M-50,420 C260,350 380,220 610,240 C860,260 980,380 1250,320"
          stroke="url(#ugc-lines)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("UGCAndStorytelling");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
        <UGCBackLayer />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] z-0">
        <UGCBackLayer />
      </div>
      
      <div className="relative z-30 max-w-5xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 mb-6 text-sm font-semibold uppercase tracking-wide bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            {t("hero.badge")}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

