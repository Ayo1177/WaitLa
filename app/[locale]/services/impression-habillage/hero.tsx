"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ServiceHeroProps {
  variant?: "full" | "card";
}

export default function ServiceHero({ variant = "full" }: ServiceHeroProps) {
  const t = useTranslations("PrintingAndBranding");

  if (variant === "card") {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/habillage/habillage%20hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      </div>
    );
  }

  return (
    <section
      className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 pt-32 pb-20 overflow-hidden"
      style={{
        backgroundImage: "url('/habillage/habillage%20hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary-dark/85 to-primary/90" />
      <div className="max-w-5xl mx-auto text-center text-white relative z-10">
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

