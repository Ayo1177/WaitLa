"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, Users, Palette, Monitor, Package, Target, PenTool, Share2 } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

function DesignMoodboardBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#8a1c1a]" />
      
      {/* Animated color swatches */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-lg opacity-20"
          style={{
            width: `${60 + (i % 3) * 20}px`,
            height: `${60 + (i % 3) * 20}px`,
            left: `${10 + (i % 4) * 25}%`,
            top: `${15 + Math.floor(i / 4) * 30}%`,
            background: i % 3 === 0 ? "rgba(255,255,255,0.3)" : i % 3 === 1 ? "rgba(255,200,200,0.2)" : "rgba(200,255,255,0.2)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Abstract shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute border-2 border-white/10"
          style={{
            width: `${80 + i * 15}px`,
            height: `${80 + i * 15}px`,
            left: `${20 + i * 15}%`,
            top: `${25 + (i % 2) * 35}%`,
            borderRadius: i % 2 === 0 ? "50%" : "0%",
          }}
          animate={{
            rotate: [0, 180, 360],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
    </div>
  );
}

export default function DesignPage() {
  const t = useTranslations("Design");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizData, setQuizData] = useState<{ industry?: string; goal?: string }>({});
  const [showResult, setShowResult] = useState(false);
  
  const approachRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(approachRef, { once: true, margin: "-100px" });

  const services = [
    {
      key: "identity",
      icon: Palette,
      title: t("whatWeDo.identity.title"),
      items: t.raw("whatWeDo.identity.items") as string[],
    },
    {
      key: "digital",
      icon: Monitor,
      title: t("whatWeDo.digital.title"),
      items: t.raw("whatWeDo.digital.items") as string[],
    },
    {
      key: "print",
      icon: Package,
      title: t("whatWeDo.print.title"),
      items: t.raw("whatWeDo.print.items") as string[],
    },
  ];

  const approachSteps = t.raw("approach.steps") as Array<{ title: string; description: string }>;
  const styles = t.raw("styleExplorer.styles") as Array<{ name: string; description: string }>;

  const handleQuizSubmit = () => {
    if (quizData.industry && quizData.goal) {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const industries = t.raw("projectStarter.industries") as string[];
    const goals = t.raw("projectStarter.goals") as string[];
    
    if (quizData.industry === industries[0] || quizData.goal === goals[1]) {
      return t("projectStarter.result.bold");
    }
    if (quizData.industry === industries[3] || quizData.goal === goals[0]) {
      return t("projectStarter.result.elegant");
    }
    return t("projectStarter.result.modern");
  };

  return (
    <>
      <Header />
      <DesignMoodboardBackground />
      
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

        {/* Core Services - Interactive Gallery */}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary transition-all shadow-lg hover:shadow-2xl overflow-hidden"
                  >
                    {/* Hover effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative">
                      <div className="flex flex-col items-center text-center mb-6">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>
                      <ul className="space-y-3">
                        {service.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.15 + i * 0.1 }}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Approach - Design Journey */}
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

            {/* Design Journey Path */}
            <div className="relative">
              {/* Path line (desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {approachSteps.map((step, idx) => {
                  const icons = [Target, PenTool, Share2];
                  const Icon = icons[idx];
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.2 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary transition-all shadow-sm hover:shadow-lg h-full text-center">
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                          <div className="relative w-20 h-20 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto">
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                          {/* Journey marker */}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Mobile connection */}
              <div className="md:hidden flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  {approachSteps.map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {idx < approachSteps.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-primary mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us & Style Explorer */}
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

              {/* Style Explorer */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {t("styleExplorer.title")}
                </h3>
                <p className="text-gray-600 mb-6">{t("styleExplorer.subtitle")}</p>
                
                <div className="space-y-4">
                  {styles.map((style, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedStyle(selectedStyle === style.name ? null : style.name)}
                      className={cn(
                        "w-full p-6 rounded-xl border-2 text-left transition-all",
                        selectedStyle === style.name
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className={cn(
                            "text-lg font-semibold mb-2",
                            selectedStyle === style.name ? "text-primary" : "text-gray-900"
                          )}>
                            {style.name}
                          </h4>
                          <p className="text-sm text-gray-600">{style.description}</p>
                        </div>
                        {selectedStyle === style.name && (
                          <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 ml-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* For Whom */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
                {t("who.title")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {(t.raw("who.items") as string[]).map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <Users className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section with Project Starter */}
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

              {/* Right Side - Project Starter Quiz */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-2 text-center">{t("projectStarter.title")}</h3>
                <p className="text-sm text-white/80 mb-6 text-center">{t("projectStarter.subtitle")}</p>
                
                {!showResult ? (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleQuizSubmit(); }}>
                    {/* Question 1 */}
                    <div>
                      <label className="block text-white/90 mb-3 text-sm font-medium">
                        {t("projectStarter.question1")}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(t.raw("projectStarter.industries") as string[]).map((industry) => (
                          <label
                            key={industry}
                            className={cn(
                              "relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                              quizData.industry === industry
                                ? "bg-white/20 border-white/50"
                                : "bg-white/10 border-white/30 hover:bg-white/15"
                            )}
                          >
                            <input
                              type="radio"
                              name="industry"
                              value={industry}
                              checked={quizData.industry === industry}
                              onChange={(e) => setQuizData({ ...quizData, industry: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-sm text-white text-center">{industry}</span>
                            {quizData.industry === industry && (
                              <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div>
                      <label className="block text-white/90 mb-3 text-sm font-medium">
                        {t("projectStarter.question2")}
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {(t.raw("projectStarter.goals") as string[]).map((goal) => (
                          <label
                            key={goal}
                            className={cn(
                              "relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                              quizData.goal === goal
                                ? "bg-white/20 border-white/50"
                                : "bg-white/10 border-white/30 hover:bg-white/15"
                            )}
                          >
                            <input
                              type="radio"
                              name="goal"
                              value={goal}
                              checked={quizData.goal === goal}
                              onChange={(e) => setQuizData({ ...quizData, goal: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-sm text-white text-center">{goal}</span>
                            {quizData.goal === goal && (
                              <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!quizData.industry || !quizData.goal}
                      className="w-full px-8 py-4 bg-white text-primary-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("projectStarter.button")}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">{t("projectStarter.result.title")}</h4>
                      <p className="text-white/90 mb-4">
                        {t("projectStarter.result.description").replace("{recommendation}", getRecommendation())}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-white text-primary-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                    >
                      {t("cta.button")}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => {
                        setShowResult(false);
                        setQuizData({});
                      }}
                      className="w-full text-sm text-white/70 hover:text-white transition text-center"
                    >
                      {t("projectStarter.result.reset")}
                    </button>
                  </motion.div>
                )}
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
