"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";

interface KPI {
  value: number;
  prefix?: string;
  suffix?: string;
  labelKey: string;
}

function CountUpNumber({ kpi, isInView, label }: { kpi: KPI; isInView: boolean; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = kpi.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(
        Math.floor(increment * currentStep),
        kpi.value
      );
      setCount(nextValue);

      if (currentStep >= steps) {
        setCount(kpi.value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, kpi.value]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
        {kpi.prefix}
        {count}
        {kpi.suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-white/90 sm:text-base">
        {label}
      </div>
    </div>
  );
}

export default function AboutUs() {
  const t = useTranslations("AboutUs");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const kpiRef = useRef(null);
  const kpisInView = useInView(kpiRef, { once: true, margin: "-100px" });

  const kpis: KPI[] = [
    { value: 15, prefix: "+", suffix: "", labelKey: "kpi.years" },
    { value: 200, prefix: "+", suffix: "", labelKey: "kpi.projects" },
    { value: 150, prefix: "+", suffix: "", labelKey: "kpi.clients" },
    { value: 160, prefix: "+", suffix: "", labelKey: "kpi.reviews" },
  ];

  // Track scroll relative to when section enters viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Fade in and slide up prominently to replace hero
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const sectionY = useTransform(scrollYProgress, [0, 0.6], [100, 0]);

  return (
    <motion.section
      ref={ref}
      className="relative overflow-visible bg-gradient-to-r from-primary-dark via-primary to-accent-dark py-24 sm:py-32 lg:py-40 z-20"
      style={{ opacity: sectionOpacity, y: sectionY }}
    >
      <div className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-16 lg:pb-32">
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Section */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.button
              className="mb-6 w-fit rounded-full bg-primary px-6 py-2 text-sm font-semibold text-white shadow-lg transition hover:bg-primary-dark"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("badge")}
            </motion.button>
            <motion.h2
              className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t("title")}
            </motion.h2>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.p
              className="text-lg leading-8 text-white sm:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("description1")}
            </motion.p>
            <motion.p
              className="text-lg leading-8 text-white sm:text-xl"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t("description2")}
            </motion.p>
          </motion.div>
        </div>

        {/* KPIs with responsive layouts that prevent overlap */}
        <div ref={kpiRef} className="relative mt-16 lg:mt-24">
          {/* Mobile: Single column (< 450px) */}
          <div className="flex flex-col items-center gap-6 min-[450px]:hidden">
            {kpis.map((kpi, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={
                  kpisInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.9 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.1 * (index + 1),
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                  <CountUpNumber kpi={kpi} isInView={kpisInView} label={t(kpi.labelKey)} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Small tablets: Arc layout (450px - 767px) */}
          <div className="hidden min-[450px]:flex md:hidden justify-center items-end gap-2 min-[500px]:gap-3 min-[600px]:gap-4 h-64 min-[550px]:h-72">
            {/* KPI 1 - Left (lower) */}
            <motion.div
              className="self-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-28 w-28 min-[500px]:h-32 min-[500px]:w-32 min-[600px]:h-36 min-[600px]:w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[0]} isInView={kpisInView} label={t(kpis[0].labelKey)} />
              </div>
            </motion.div>
            {/* KPI 2 - Left-center (higher) */}
            <motion.div
              className="self-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-28 w-28 min-[500px]:h-32 min-[500px]:w-32 min-[600px]:h-36 min-[600px]:w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[1]} isInView={kpisInView} label={t(kpis[1].labelKey)} />
              </div>
            </motion.div>
            {/* KPI 3 - Right-center (higher) */}
            <motion.div
              className="self-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-28 w-28 min-[500px]:h-32 min-[500px]:w-32 min-[600px]:h-36 min-[600px]:w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[2]} isInView={kpisInView} label={t(kpis[2].labelKey)} />
              </div>
            </motion.div>
            {/* KPI 4 - Right (lower) */}
            <motion.div
              className="self-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-28 w-28 min-[500px]:h-32 min-[500px]:w-32 min-[600px]:h-36 min-[600px]:w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[3]} isInView={kpisInView} label={t(kpis[3].labelKey)} />
              </div>
            </motion.div>
          </div>

          {/* Medium tablets: Arc layout (768px - 1023px) */}
          <div className="hidden md:flex lg:hidden justify-center items-end gap-4 h-72">
            {/* KPI 1 - Left (lower) */}
            <motion.div
              className="self-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[0]} isInView={kpisInView} label={t(kpis[0].labelKey)} />
              </div>
            </motion.div>
            {/* KPI 2 - Left-center (higher) */}
            <motion.div
              className="self-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[1]} isInView={kpisInView} label={t(kpis[1].labelKey)} />
              </div>
            </motion.div>
            {/* KPI 3 - Right-center (higher) */}
            <motion.div
              className="self-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[2]} isInView={kpisInView} label={t(kpis[2].labelKey)} />
              </div>
            </motion.div>
            {/* KPI 4 - Right (lower) */}
            <motion.div
              className="self-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[3]} isInView={kpisInView} label={t(kpis[3].labelKey)} />
              </div>
            </motion.div>
          </div>

          {/* Desktop: Arc layout (≥1024px) - using flexbox with controlled spacing */}
          <div className="hidden lg:flex justify-center items-end gap-6 xl:gap-8 h-80 xl:h-96">
            {/* KPI 1 - Left (lower) */}
            <motion.div
              className="self-end mb-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-44 w-44 xl:h-52 xl:w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[0]} isInView={kpisInView} label={t(kpis[0].labelKey)} />
              </div>
            </motion.div>

            {/* KPI 2 - Left-center (higher) */}
            <motion.div
              className="self-start mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-44 w-44 xl:h-52 xl:w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[1]} isInView={kpisInView} label={t(kpis[1].labelKey)} />
              </div>
            </motion.div>

            {/* KPI 3 - Right-center (higher) */}
            <motion.div
              className="self-start mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-44 w-44 xl:h-52 xl:w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[2]} isInView={kpisInView} label={t(kpis[2].labelKey)} />
              </div>
            </motion.div>

            {/* KPI 4 - Right (lower) */}
            <motion.div
              className="self-end mb-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={kpisInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 100 }}
            >
              <div className="flex h-44 w-44 xl:h-52 xl:w-52 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark shadow-[0_10px_40px_rgba(229,57,53,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_20px_60px_rgba(229,57,53,0.6)]">
                <CountUpNumber kpi={kpis[3]} isInView={kpisInView} label={t(kpis[3].labelKey)} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </motion.section>
  );
}

