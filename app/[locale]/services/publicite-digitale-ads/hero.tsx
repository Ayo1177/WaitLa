"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

function DataStreamBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-white/15"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + (i % 3) * 30}%`,
            width: "2px",
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0.15, 0.5, 0.15],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("DigitalAds");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
        <DataStreamBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] z-0">
        <DataStreamBackground />
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

