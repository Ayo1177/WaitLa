"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

function BrandingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="brand-lines" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>
        <path
          d="M-50,480 C250,420 350,260 600,240 C820,220 950,340 1250,300"
          stroke="url(#brand-lines)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("Branding");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
        <BrandingBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative z-20 text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] z-0">
        <BrandingBackground />
      </div>
      
      <div className="relative z-30 max-w-5xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide mb-6"
        >
          <Sparkles className="h-4 w-4" />
          {t("title")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
        >
          {t("hero.headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>
      </div>
    </section>
  );
}

