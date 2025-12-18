"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SparkleEffect, FloatingBalloons, AnimatedGradient } from "@/components/ui/FestiveEffects";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("PRAndEvents");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
        <div className="absolute inset-0">
          <AnimatedGradient />
          <SparkleEffect />
          <FloatingBalloons />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="fixed inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] z-0">
        <div className="absolute inset-0">
          <AnimatedGradient />
          <SparkleEffect />
          <FloatingBalloons />
        </div>
      </div>
      
      {/* Floating audience tags (same as original page) */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {[
          { key: "brands", position: { top: "25%", left: "5%" }, delay: 0 },
          { key: "organizers", position: { top: "40%", right: "5%" }, delay: 0.2 },
          { key: "institutions", position: { bottom: "35%", left: "5%" }, delay: 0.4 },
          { key: "entrepreneurs", position: { bottom: "20%", right: "5%" }, delay: 0.6 },
          {
            key: "nationalInternational",
            position: { top: "15%", left: "50%", transform: "translateX(-50%)" },
            delay: 0.8,
          },
        ].map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -35, 0, 15, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: item.delay },
              scale: { duration: 0.5, delay: item.delay },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item.delay + 0.5,
              },
            }}
            className="absolute px-4 py-2 sm:px-5 sm:py-2.5 bg-white/95 backdrop-blur-sm rounded-full border-2 border-white/30 shadow-lg text-primary font-medium text-sm sm:text-base whitespace-nowrap pointer-events-auto hover:bg-white hover:scale-110 hover:shadow-xl transition-all duration-300 cursor-default"
            style={item.position as React.CSSProperties}
          >
            {t(`forWhom.items.${item.key}`)}
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-30 max-w-5xl mx-auto text-center px-4 sm:px-8 lg:px-12">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
          {t("title")}
        </h1>
        <p className="text-2xl sm:text-3xl mb-8 text-white/95 font-medium">
          {t("subtitle")}
        </p>
        <p className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto mb-10 leading-relaxed">
          {t("description")}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 group"
        >
          {t("cta")}
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    </section>
  );
}

