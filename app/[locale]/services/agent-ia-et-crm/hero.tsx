"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { TechBackground } from "@/components/ui/TechEffects";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("AgentIAAndCRM");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a]" />
        <TechBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section className="relative text-white min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden">
      {/* Fixed Background Layer - stays static on scroll */}
      <div className="fixed inset-0 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] z-0">
        <TechBackground />
      </div>
      
      <div className="relative z-30 max-w-7xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            {t("title")}
          </h1>
          <p className="text-2xl sm:text-3xl mb-6 text-white/95 font-medium">
            {t("subtitle")}
          </p>
          <p className="text-lg sm:text-xl text-white/85 max-w-3xl mx-auto mb-4 leading-relaxed">
            {t("description")}
          </p>
          <p className="text-xl font-semibold text-white/90 italic mt-6">
            {t("tagline")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

