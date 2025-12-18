"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle2, TrendingUp, BarChart3, Users, MessageSquare, Share2, Target, ChevronDown, Calendar, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function SocialMediaBackground() {
  const platforms = [
    { name: "Instagram", src: "/Logos/instagram.png", x: 10, y: 20 },
    { name: "Facebook", src: "/Logos/meta.png", x: 30, y: 15 },
    { name: "TikTok", src: "/Logos/tik tok.png", x: 50, y: 25 },
    { name: "LinkedIn", src: "/Logos/LinkedIn.png", x: 70, y: 18 },
    { name: "Google", src: "/Logos/google.png", x: 85, y: 22 },
    { name: "YouTube", src: "/Logos/youtube.png", x: 20, y: 30 },
    { name: "Instagram", src: "/Logos/instagram.png", x: 60, y: 35 },
    { name: "Facebook", src: "/Logos/meta.png", x: 15, y: 45 },
    { name: "TikTok", src: "/Logos/tik tok.png", x: 75, y: 40 },
    { name: "LinkedIn", src: "/Logos/LinkedIn.png", x: 40, y: 50 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#8a1c1a]" />
      
      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/6 blur-3xl" />

      {/* Animated platform icons */}
      {platforms.map((platform, i) => (
        <motion.div
          key={`${platform.name}-${i}`}
          className="absolute"
          style={{
            left: `${platform.x}%`,
            top: `${platform.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <div className="relative w-16 h-16 bg-white/15 backdrop-blur-md rounded-xl p-2.5 border border-white/30 shadow-lg">
            <Image
              src={platform.src}
              alt={platform.name}
              width={48}
              height={48}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function SocialMediaManagementPage() {
  const t = useTranslations("SocialMediaManagement");
  const [selectedStrategy, setSelectedStrategy] = useState<"strategy" | "content" | "management" | null>(null);
  const [formData, setFormData] = useState<{ 
    platforms: string[]; 
    goal: string; 
    frequency: string;
  }>({
    platforms: [],
    goal: "",
    frequency: "",
  });
  
  const approachRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(approachRef, { once: true, margin: "-100px" });

  const strategies = [
    {
      key: "strategy",
      icon: Target,
      title: t("whatWeDo.strategy.title"),
      items: t.raw("whatWeDo.strategy.items") as string[],
    },
    {
      key: "content",
      icon: MessageSquare,
      title: t("whatWeDo.content.title"),
      items: t.raw("whatWeDo.content.items") as string[],
    },
    {
      key: "management",
      icon: TrendingUp,
      title: t("whatWeDo.management.title"),
      items: t.raw("whatWeDo.management.items") as string[],
    },
  ];

  const approachSteps = t.raw("approach.steps") as Array<{ title: string; description: string }>;

  return (
    <>
      <Header />
      <SocialMediaBackground />
      
      <main className="relative z-20 min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-12 xl:px-16 pt-32 pb-20">
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

        {/* Core Services Dashboard */}
        <section className="relative z-20 bg-white py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t("whatWeDo.title")}
              </h2>
            </motion.div>

            {/* 3-Panel Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {strategies.map((strategy, idx) => {
                const Icon = strategy.icon;
                const isActive = selectedStrategy === strategy.key;
                
                return (
                  <motion.button
                    key={strategy.key}
                    onClick={() => {
                      // Toggle: if clicking the same card, collapse it; otherwise expand the clicked card
                      setSelectedStrategy(isActive ? null : (strategy.key as any));
                    }}
                    className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                      isActive
                        ? "border-primary bg-primary/5 shadow-lg scale-105"
                        : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`p-3 rounded-lg ${isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{strategy.title}</h3>
                      </div>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-400"}`} />
                      </motion.div>
                    </div>
                    {isActive && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="space-y-2 mt-4 overflow-hidden"
                      >
                        {strategy.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Content Preview Panel */}
            {selectedStrategy && (
              <motion.div
                key={selectedStrategy}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-8 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {strategies.find(s => s.key === selectedStrategy)?.title}
                  </h4>
                  <p className="text-gray-600">
                    {selectedStrategy === "strategy" && "Nous analysons votre présence actuelle et définissons une stratégie claire alignée sur vos objectifs business."}
                    {selectedStrategy === "content" && "Nous créons du contenu visuel et vidéo optimisé pour chaque plateforme, en combinant storytelling et UGC."}
                    {selectedStrategy === "management" && "Nous publions, modérons et optimisons vos réseaux au quotidien pour maximiser l'engagement."}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Our Approach - 4-Step Cycle */}
        <section ref={approachRef} className="relative z-20 bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t("approach.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("approach.subtitle")}
              </p>
            </motion.div>

            {/* Circular/Interactive Cycle */}
            <div className="relative">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {approachSteps.map((step, idx) => {
                  const icons = [Calendar, Sparkles, Share2, BarChart3];
                  const Icon = icons[idx];
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="relative group"
                    >
                      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all shadow-sm hover:shadow-lg h-full">
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                              <Icon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                          <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                      </div>
                      
                      {/* Connection line (for desktop) */}
                      {idx < approachSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent z-0" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Circular connection for mobile */}
              <div className="lg:hidden flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  {approachSteps.map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {idx < approachSteps.length - 1 && (
                        <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-primary/50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us & Social Proof */}
        <section className="relative z-20 bg-white py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Why Choose Us */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {t("why.title")}
                </h3>
                <ul className="space-y-4">
                  {(t.raw("why.items") as string[]).map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Social Proof / Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {t("who.title")}
                </h3>
                <ul className="space-y-4 mb-8">
                  {(t.raw("who.items") as string[]).map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Users className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section with Strategy Builder */}
        <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Left Side - Text Content */}
              <div className="text-center lg:text-left">
                <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold uppercase tracking-wide bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  {t("cta.kicker")}
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  {t("cta.title")}
                </h2>
                <p className="text-lg sm:text-xl text-white/90 mb-6">
                  {t("cta.subtitle")}
                </p>
                <p className="text-lg font-medium italic text-white/90">
                  "{t("cta.tagline")}"
                </p>
              </div>

              {/* Right Side - Strategy Builder Form */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 text-center">{t("cta.quiz.title")}</h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  {/* Platforms Selection - Multiple */}
                  <div>
                    <label className="block text-white/90 mb-3 text-sm font-medium">
                      {t("cta.quiz.step1.question")}
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {(t.raw("cta.quiz.step1.platforms") as string[]).map((platform) => (
                        <label
                          key={platform}
                          className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.platforms.includes(platform)
                              ? "bg-white/20 border-white/50"
                              : "bg-white/10 border-white/30 hover:bg-white/15"
                          }`}
                        >
                          <input
                            type="checkbox"
                            value={platform}
                            checked={formData.platforms.includes(platform)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  platforms: [...formData.platforms, platform],
                                });
                              } else {
                                setFormData({
                                  ...formData,
                                  platforms: formData.platforms.filter((p) => p !== platform),
                                });
                              }
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm text-white">{platform}</span>
                          {formData.platforms.includes(platform) && (
                            <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Goal Selection - Single */}
                  <div>
                    <label className="block text-white/90 mb-3 text-sm font-medium">
                      {t("cta.quiz.step2.question")}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(t.raw("cta.quiz.step2.goals") as string[]).map((goal) => (
                        <label
                          key={goal}
                          className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.goal === goal
                              ? "bg-white/20 border-white/50"
                              : "bg-white/10 border-white/30 hover:bg-white/15"
                          }`}
                        >
                          <input
                            type="radio"
                            name="goal"
                            value={goal}
                            checked={formData.goal === goal}
                            onChange={(e) => {
                              setFormData({ ...formData, goal: e.target.value });
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm text-white">{goal}</span>
                          {formData.goal === goal && (
                            <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Frequency Selection - Single */}
                  <div>
                    <label className="block text-white/90 mb-3 text-sm font-medium">
                      {t("cta.quiz.step3.question")}
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {(t.raw("cta.quiz.step3.frequencies") as string[]).map((freq) => (
                        <label
                          key={freq}
                          className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                            formData.frequency === freq
                              ? "bg-white/20 border-white/50"
                              : "bg-white/10 border-white/30 hover:bg-white/15"
                          }`}
                        >
                          <input
                            type="radio"
                            name="frequency"
                            value={freq}
                            checked={formData.frequency === freq}
                            onChange={(e) => {
                              setFormData({ ...formData, frequency: e.target.value });
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm text-white">{freq}</span>
                          {formData.frequency === freq && (
                            <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                          )}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-white text-primary-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                  >
                    {t("cta.button")}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <div className="relative z-30">
        <Footer />
      </div>
    </>
  );
}
