"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { Target, Users, Video, CheckCircle2, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SparkleEffect, FloatingBalloons, AnimatedGradient } from "@/components/ui/FestiveEffects";
import { motion } from "framer-motion";
import ServiceHero from "./hero";

export default function PRAndEventsPage() {
  const t = useTranslations("PRAndEvents");
  const tNav = useTranslations("Nav");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ServiceHero variant="full" />

        {/* 2. What We Do Section - 3-Column Card Grid */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white z-20">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {t("whatWeDo.title")}
              </h2>
              <p className="text-xl text-gray-600">
                {t("whatWeDo.subtitle")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Organization & Coordination Card */}
              <motion.div
                initial={{ opacity: 0, x: -300 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Organisation & coordination d'événements</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t("whatWeDo.items.brandLaunches")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t("whatWeDo.items.corporateEvents")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t("whatWeDo.items.brandActivations")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{t("whatWeDo.items.sportsCultural")}</span>
                  </li>
                </ul>
                </div>
              </motion.div>

              {/* Public Relations Card */}
              <motion.div
                initial={{ opacity: 0, y: 200 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
                className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t("publicRelations.title")}</h3>
                <ul className="space-y-4">
                  {[
                    "invitations",
                    "coordination",
                    "communication",
                    "brandImage"
                  ].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(`publicRelations.items.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </motion.div>

              {/* Production & Coverage Card */}
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
                className="relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{t("production.title")}</h3>
                <ul className="space-y-4">
                  {[
                    "videoPhoto",
                    "aftermovies",
                    "storytelling",
                    "optimizedContent"
                  ].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(`production.items.${key}`)}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Our Approach Timeline - 3-Step Horizontal Process */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50 z-20">
          <div className="w-full">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {t("ourApproach.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {t("ourApproach.description")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Timeline line spanning from left to right - background element */}
              <svg
                className="hidden md:block absolute left-0 right-0 w-full pointer-events-none"
                style={{ 
                  top: '4rem',
                  height: '30px',
                  zIndex: 0,
                }}
                viewBox="0 0 100 30"
                preserveAspectRatio="none"
              >
                {/* Timeline line: spans from 5% to 95% of the viewBox */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                  d="M 5 15 L 95 15"
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              
              {/* Before Step */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0 }}
                className="relative z-10 bg-white p-8 rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg z-20"
                >
                  1
                </motion.div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-4 mt-4 text-center">
                    {t("ourApproach.before.title")}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {t("ourApproach.before.items")}
                  </p>
                </div>
              </motion.div>

              {/* During Step */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="relative z-10 bg-white p-8 rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg z-20"
                >
                  2
                </motion.div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-4 mt-4 text-center">
                    {t("ourApproach.during.title")}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {t("ourApproach.during.items")}
                  </p>
                </div>
              </motion.div>

              {/* After Step */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                className="relative z-10 bg-white p-8 rounded-2xl border-2 border-primary/20 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                  className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg z-20"
                >
                  3
                </motion.div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary mb-4 mt-4 text-center">
                    {t("ourApproach.after.title")}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {t("ourApproach.after.items")}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us - 2-Column Grid with Checkmarks */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white z-20">
          <div className="w-full">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {t("whyChoose.title")}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                "hybridTeam",
                "internationalVision",
                "creativeExecution",
                "lastingContent",
                "resultsOriented"
              ].map((key) => (
                <div key={key} className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl hover:bg-red-50 hover:border-2 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-125 transition-transform duration-300" />
                  <p className="text-gray-800 text-lg group-hover:text-primary transition-colors duration-300">{t(`whyChoose.items.${key}`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Call to Action Section */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] text-white overflow-hidden">
          <AnimatedGradient />
          <SparkleEffect />
          
          <div className="relative z-10 max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {t("cta.headline")}
              </h2>
              <div className="relative inline-block px-8 sm:px-12 lg:px-16 mb-8">
                <span className="absolute left-0 top-0 text-6xl sm:text-7xl lg:text-8xl text-white/30 font-serif leading-none" style={{ transform: 'translateY(-0.1em)' }}>
                  &ldquo;
                </span>
                <p className="text-xl sm:text-2xl lg:text-3xl text-white/95 font-medium italic relative z-10">
                  {t("cta.tagline")}
                </p>
                <span className="absolute right-0 bottom-0 text-6xl sm:text-7xl lg:text-8xl text-white/30 font-serif leading-none" style={{ transform: 'translateY(0.1em)' }}>
                  &rdquo;
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-auto"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 group"
                style={{
                  animation: 'pulse-glow 2s ease-in-out infinite',
                }}
              >
                {tNav("contactCta")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      
      {/* 6. Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
