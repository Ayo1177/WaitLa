"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

function WebBackground() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/8 blur-3xl" />
    </div>
  );
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("WebDevelopment");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
        <WebBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] z-0">
        <WebBackground />
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

