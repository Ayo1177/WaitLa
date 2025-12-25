"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const t = useTranslations("Hero");

  // Fade out hero as user scrolls down - start at 100% opacity when at top
  // Fade starts when section bottom reaches viewport top, completes when section top reaches viewport top
  const { scrollYProgress: heroFadeProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "start end"],
  });

  const heroOpacityValue = useTransform(heroFadeProgress, [0, 1], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#fff2f2] via-white to-white min-h-screen"
    >
      {/* Fixed text content - stays static on scroll with lowest z-index */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center -z-10 pointer-events-none"
        style={{ opacity: heroOpacityValue }}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 xl:px-16 pointer-events-auto">
          <div className="text-center pt-14 sm:pt-24">
          {mounted && (
            <motion.h1
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
            >
              {t("title.main")}{" "}
              <span className="text-primary">{t("title.highlight")}</span>
            </motion.h1>
          )}
          {mounted && (
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {t("subtitle")}
            </motion.p>
          )}
          {mounted && (
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Button href="/contact" size="lg" className="group">
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                {t("secondaryCta")}
              </Button>
            </motion.div>
          )}
          {mounted && (
            <motion.div
              className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-xs">{t("stat.projects")}</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-xs">{t("stat.clients")}</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5★</div>
                <div className="text-xs">{t("stat.rating")}</div>
              </div>
            </motion.div>
          )}
          </div>
        </div>
      </motion.div>
      
      {/* Spacer to maintain scroll height */}
      <div className="h-screen" />
    </section>
  );
}