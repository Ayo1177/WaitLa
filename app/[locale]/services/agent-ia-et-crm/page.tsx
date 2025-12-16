"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { Bot, Database, Link2, CheckCircle2, ArrowRight, Sparkles, Users, Zap } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { TechBackground } from "@/components/ui/TechEffects";

export default function AgentIAAndCRMPage() {
  const t = useTranslations("AgentIAAndCRM");
  const tNav = useTranslations("Nav");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* 1. Hero Banner */}
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

        {/* 2. What We Do - 3-Column Service Cards */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {t("whatWeDo.title")}
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* AI Agents Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("whatWeDo.aiAgents.title")}
                </h3>
                <ul className="space-y-4">
                  {["conversational", "qualification", "responses", "appointments", "support"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(`whatWeDo.aiAgents.items.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* CRM Integration Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Database className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("whatWeDo.crmIntegration.title")}
                </h3>
                <ul className="space-y-4">
                  {["setup", "centralization", "tracking", "automation", "dashboard"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(`whatWeDo.crmIntegration.items.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Marketing & Sales Connection Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
                  <Link2 className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  {t("whatWeDo.marketingSales.title")}
                </h3>
                <ul className="space-y-4">
                  {["connection", "tracking", "workflow", "sync"].map((key) => (
                    <li key={key} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{t(`whatWeDo.marketingSales.items.${key}`)}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. Our Approach - 4-Step Timeline */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-gray-50 z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {t("ourApproach.title")}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {t("ourApproach.description")}
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Timeline connector line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary origin-left"
                style={{ marginTop: '4rem' }}
              />
              
              {[
                { key: "analyze", number: 1 },
                { key: "design", number: 2 },
                { key: "integrate", number: 3 },
                { key: "optimize", number: 4 }
              ].map((step, index) => (
                <motion.div
                  key={step.key}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative bg-white p-6 rounded-xl border-2 border-primary/20 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg shadow-lg z-20">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2 text-center">
                    {t(`ourApproach.steps.${step.key}`)}
                  </h3>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-lg text-gray-600 mt-12 max-w-3xl mx-auto">
              {t("ourApproach.conclusion")}
            </p>
          </div>
        </section>

        {/* 4. Why Choose Us & Target Audience - Side by Side */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white z-20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center items-center mb-16"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary text-center">
                WaitLa
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                  {t("whyChoose.title")}
                </h2>
                <ul className="space-y-4">
                  {["expertise", "team", "custom", "results", "vision"].map((key) => (
                    <li key={key} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-lg">{t(`whyChoose.items.${key}`)}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Target Audience */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                  {t("forWhom.title")}
                </h2>
                <ul className="space-y-4">
                  {["sme", "ecommerce", "services", "organizers", "highVolume"].map((key) => (
                    <li key={key} className="flex items-start gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <p className="text-gray-700 text-lg">{t(`forWhom.items.${key}`)}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Call to Action */}
        <section className="relative py-24 px-4 sm:px-6 lg:px-12 xl:px-16 text-white overflow-hidden z-30">
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {t("cta.headline")}
              </h2>
              <p className="text-xl sm:text-2xl text-white/95 mb-8">
                {t("cta.subtitle")}
              </p>
              <div className="relative inline-block px-8 sm:px-12 lg:px-16 mb-6">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-white text-primary px-8 py-4 text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300 group"
                >
                  {tNav("contactCta")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
