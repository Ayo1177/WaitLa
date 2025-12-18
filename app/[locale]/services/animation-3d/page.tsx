"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { ArrowRight, CheckCircle2, Users, Sparkles, Video, Link2, Target, PenTool, Share2 } from "lucide-react";
import { motion, useInView } from "framer-motion";

function Animation3DBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/3D animation/3D animation.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary-dark/30 to-[#8a1c1a]/40" />
      
      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/6 blur-3xl" />
    </div>
  );
}

export default function Animation3DPage() {
  const t = useTranslations("Animation3D");
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  
  const approachRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(approachRef, { once: true, margin: "-100px" });

  const services = [
    {
      key: "animation",
      icon: Sparkles,
      title: t("whatWeDo.animation.title"),
      items: t.raw("whatWeDo.animation.items") as string[],
    },
    {
      key: "marketing",
      icon: Video,
      title: t("whatWeDo.marketing.title"),
      items: t.raw("whatWeDo.marketing.items") as string[],
    },
    {
      key: "integration",
      icon: Link2,
      title: t("whatWeDo.integration.title"),
      items: t.raw("whatWeDo.integration.items") as string[],
    },
  ];

  const approachSteps = t.raw("approach.steps") as Array<{ title: string; description: string }>;
  const concepts = t.raw("visualizer.concepts") as Array<{ name: string; description: string }>;

  return (
    <>
      <Header />
      <Animation3DBackground />
      
      <main className="relative z-20 min-h-screen">
        {/* Hero Section with 3D Viewer Placeholder */}
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

        {/* Core Services - Animated Panels */}
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
                    initial={{ opacity: 0, y: 50, rotateX: -15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 }}
                    whileHover={{ scale: 1.05, z: 20 }}
                    className="relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-primary transition-all shadow-lg hover:shadow-2xl h-full group"
                  >
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="relative mb-4">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                        <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <ul className="space-y-3">
                      {service.items.map((item, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.2 + i * 0.1 }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Approach - Animation Timeline */}
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

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Timeline Line */}
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
                          {/* Keyframe indicator */}
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

        {/* Why Choose Us & For Whom */}
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

        {/* CTA Section with Project Visualizer */}
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

              {/* Right Side - Project Visualizer */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-xl font-semibold mb-2 text-center">{t("visualizer.title")}</h3>
                <p className="text-sm text-white/80 mb-6 text-center">{t("visualizer.subtitle")}</p>
                
                <div className="space-y-4 mb-6">
                  {concepts.map((concept, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedConcept(selectedConcept === concept.name ? null : concept.name)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedConcept === concept.name
                          ? "bg-white/20 border-white/50"
                          : "bg-white/10 border-white/30 hover:bg-white/15"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white mb-1">{concept.name}</h4>
                          <p className="text-sm text-white/80">{concept.description}</p>
                        </div>
                        {selectedConcept === concept.name && (
                          <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {selectedConcept && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/20 rounded-lg p-6 mb-6"
                  >
                    <h4 className="text-lg font-semibold mb-2">{t("visualizer.preview")}</h4>
                    <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 text-white/50 mx-auto mb-2" />
                        <p className="text-sm text-white/70">{selectedConcept}</p>
                      </div>
                    </div>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-white text-primary-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
                    >
                      {t("visualizer.button")}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
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
