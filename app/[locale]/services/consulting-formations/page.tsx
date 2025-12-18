"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, TrendingUp, BookOpen, Users, Lightbulb, Target, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import { motion, useInView } from "framer-motion";

function ConsultingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#8a1c1a]" />
      
      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/6 blur-3xl" />

      {/* Animated connecting nodes (knowledge transfer) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default function ConsultingAndTrainingPage() {
  const t = useTranslations("ConsultingAndTraining");
  const [selectedPathway, setSelectedPathway] = useState<"business" | "team" | null>(null);
  const [assessmentData, setAssessmentData] = useState<{
    level?: string;
    challenge?: string;
  }>({});
  const [showResult, setShowResult] = useState(false);
  
  const approachRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(approachRef, { once: true, margin: "-100px" });

  const approachSteps = t.raw("approach.steps") as Array<{ title: string; description: string }>;
  
  const mergedServices = [
    {
      key: "consulting",
      serviceIcon: Lightbulb,
      approachIcon: Target,
      serviceTitle: t("whatWeDo.consulting.title"),
      approachTitle: approachSteps[0].title,
      approachDescription: approachSteps[0].description,
      items: t.raw("whatWeDo.consulting.items") as string[],
    },
    {
      key: "training",
      serviceIcon: GraduationCap,
      approachIcon: BookOpen,
      serviceTitle: t("whatWeDo.training.title"),
      approachTitle: approachSteps[1].title,
      approachDescription: approachSteps[1].description,
      items: t.raw("whatWeDo.training.items") as string[],
    },
    {
      key: "support",
      serviceIcon: Users,
      approachIcon: TrendingUp,
      serviceTitle: t("whatWeDo.support.title"),
      approachTitle: approachSteps[2].title,
      approachDescription: approachSteps[2].description,
      items: t.raw("whatWeDo.support.items") as string[],
    },
  ];

  const handleAssessmentSubmit = () => {
    if (assessmentData.level && assessmentData.challenge) {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    const levels = t.raw("assessment.levels") as string[];
    const challenges = t.raw("assessment.challenges") as string[];
    
    if (assessmentData.level === levels[0] || assessmentData.challenge === challenges[3]) {
      return t("assessment.result.training");
    }
    return t("assessment.result.consulting");
  };

  return (
    <>
      <Header />
      <ConsultingBackground />
      
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

        {/* Pathway Selector */}
        <section className="relative z-20 bg-white py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t("pathway.title")}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("pathway.subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.button
                onClick={() => setSelectedPathway(selectedPathway === "business" ? null : "business")}
                className={`relative p-8 rounded-2xl border-2 text-left transition-all ${
                  selectedPathway === "business"
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${selectedPathway === "business" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}>
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("pathway.business.title")}</h3>
                    <p className="text-sm font-medium text-primary mb-2">{t("pathway.business.subtitle")}</p>
                    <p className="text-gray-600">{t("pathway.business.description")}</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                onClick={() => setSelectedPathway(selectedPathway === "team" ? null : "team")}
                className={`relative p-8 rounded-2xl border-2 text-left transition-all ${
                  selectedPathway === "team"
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-md"
                }`}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-4 rounded-lg ${selectedPathway === "team" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`}>
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("pathway.team.title")}</h3>
                    <p className="text-sm font-medium text-primary mb-2">{t("pathway.team.subtitle")}</p>
                    <p className="text-gray-600">{t("pathway.team.description")}</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        </section>

        {/* Merged Services & Approach */}
        <section ref={approachRef} className="relative z-20 bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
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
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {t("approach.subtitle")}
              </p>
            </motion.div>

            {/* Merged Cards with Connection Arrows */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {mergedServices.map((service, idx) => {
                  const ServiceIcon = service.serviceIcon;
                  const ApproachIcon = service.approachIcon;
                  
                  return (
                    <motion.div
                      key={service.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary transition-all shadow-sm hover:shadow-lg h-full">
                        {/* Service Icon & Title */}
                        <div className="flex flex-col items-center text-center mb-6">
                          <div className="relative mb-4">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                            <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                              <ServiceIcon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.serviceTitle}</h3>
                        </div>

                        {/* Service Items */}
                        <ul className="space-y-3 mb-6">
                          {service.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-gray-700">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Approach Step */}
                        <div className="pt-6 border-t border-gray-200">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <ApproachIcon className="w-5 h-5 text-primary" />
                            <h4 className="text-lg font-semibold text-primary">{service.approachTitle}</h4>
                          </div>
                          <p className="text-sm text-gray-600 text-center">{service.approachDescription}</p>
                        </div>
                      </div>
                      
                      {/* Connection arrow (for desktop) */}
                      {idx < mergedServices.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-primary/50 z-0">
                          <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Connection indicator for mobile */}
              <div className="md:hidden flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  {mergedServices.map((_, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {idx < mergedServices.length - 1 && (
                        <ArrowRight className="w-4 h-4 text-primary mx-1" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us & For Whom */}
        <section className="relative z-20 bg-gradient-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-12 xl:px-16">
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

              {/* For Whom */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
                  {t("who.title")}
                </h3>
                <ul className="space-y-4">
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

        {/* CTA Section with Skill Assessment */}
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

              {/* Right Side - Skill Assessment */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-6 text-center">{t("assessment.title")}</h3>
                
                {!showResult ? (
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleAssessmentSubmit(); }}>
                    {/* Question 1 */}
                    <div>
                      <label className="block text-white/90 mb-3 text-sm font-medium">
                        {t("assessment.question1")}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {(t.raw("assessment.levels") as string[]).map((level) => (
                          <label
                            key={level}
                            className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              assessmentData.level === level
                                ? "bg-white/20 border-white/50"
                                : "bg-white/10 border-white/30 hover:bg-white/15"
                            }`}
                          >
                            <input
                              type="radio"
                              name="level"
                              value={level}
                              checked={assessmentData.level === level}
                              onChange={(e) => setAssessmentData({ ...assessmentData, level: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-sm text-white">{level}</span>
                            {assessmentData.level === level && (
                              <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Question 2 */}
                    <div>
                      <label className="block text-white/90 mb-3 text-sm font-medium">
                        {t("assessment.question2")}
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(t.raw("assessment.challenges") as string[]).map((challenge) => (
                          <label
                            key={challenge}
                            className={`relative flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              assessmentData.challenge === challenge
                                ? "bg-white/20 border-white/50"
                                : "bg-white/10 border-white/30 hover:bg-white/15"
                            }`}
                          >
                            <input
                              type="radio"
                              name="challenge"
                              value={challenge}
                              checked={assessmentData.challenge === challenge}
                              onChange={(e) => setAssessmentData({ ...assessmentData, challenge: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-sm text-white text-center">{challenge}</span>
                            {assessmentData.challenge === challenge && (
                              <CheckCircle2 className="absolute top-1 right-1 w-4 h-4 text-white" />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!assessmentData.level || !assessmentData.challenge}
                      className="w-full px-8 py-4 bg-white text-primary-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {t("assessment.result.button")}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/20 rounded-lg p-6">
                      <h4 className="text-lg font-semibold mb-4">{t("assessment.result.title")}</h4>
                      <p className="text-white/90 mb-4">
                        {t("assessment.result.description").replace("{recommendation}", getRecommendation())}
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
                        setAssessmentData({});
                      }}
                      className="w-full text-sm text-white/70 hover:text-white transition text-center"
                    >
                      {t("assessment.result.reset")}
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
