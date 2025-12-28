"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ArrowRight, CheckCircle2, Users, Printer, Car, Home, Target, PenTool, Share2, TrendingUp } from "lucide-react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import ServiceHero from "./hero";

function PrintingBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-[#8a1c1a]" />
      
      {/* Soft glow blobs */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/8 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-white/6 blur-3xl" />

      {/* Abstract patterns suggesting materials/textures */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 border-white/10"
          style={{
            width: `${100 + i * 20}px`,
            height: `${60 + i * 15}px`,
            left: `${15 + (i % 4) * 25}%`,
            top: `${20 + Math.floor(i / 4) * 30}%`,
            borderRadius: i % 2 === 0 ? "8px" : "0px",
          }}
          animate={{
            rotate: [0, 5, -5, 0],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 6 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

export default function PrintingAndBrandingPage() {
  const t = useTranslations("PrintingAndBranding");
  
  const approachRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(approachRef, { once: true, margin: "-100px" });

  const services = [
    {
      key: "printing",
      icon: Printer,
      title: t("whatWeDo.printing.title"),
      items: t.raw("whatWeDo.printing.items") as string[],
    },
    {
      key: "branding",
      icon: Car,
      title: t("whatWeDo.branding.title"),
      items: t.raw("whatWeDo.branding.items") as string[],
    },
    {
      key: "decoration",
      icon: Home,
      title: t("whatWeDo.decoration.title"),
      items: t.raw("whatWeDo.decoration.items") as string[],
    },
  ];

  const approachSteps = t.raw("approach.steps") as Array<{ title: string; description: string }>;

  return (
    <>
      <Header />
      <PrintingBackground />
      
      <main className="relative z-20 min-h-screen">
        <ServiceHero variant="full" />

        {/* Core Services - What We Do */}
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

            <div className="space-y-12">
              {services.map((service, idx) => {
                const Icon = service.icon;

                const imageSrcMap: Record<string, string> = {
                  printing: "/habillage/panneau%20publicitaire%20card.jpg",
                  branding: "/habillage/habillage%20card.png",
                  decoration: "/habillage/interior%20decoration%20card.webp",
                };

                const imageSrc = imageSrcMap[service.key] ?? "/habillage/habillage%20card.png";
                const reverseOnDesktop = idx % 2 === 1;

                return (
                  <motion.article
                    key={service.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className={`group relative flex flex-col gap-8 bg-white rounded-3xl border border-gray-200 shadow-lg overflow-hidden lg:items-stretch lg:flex-row ${
                      reverseOnDesktop ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Image side */}
                    <div className="relative w-full lg:w-1/2 h-64 md:h-80 overflow-hidden">
                      <Image
                        src={imageSrc}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={idx === 0}
                      />
                    </div>

                    {/* Content side */}
                    <div className="relative w-full lg:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex flex-col gap-4">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="relative">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                            <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center">
                              <Icon className="w-7 h-7 text-white" />
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                        </div>

                        <ul className="space-y-3">
                          {service.items.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: reverseOnDesktop ? 10 : -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: idx * 0.15 + i * 0.08 }}
                              className="flex items-start gap-2 text-gray-700"
                            >
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Approach - 4-Step Process */}
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

            {/* 4-Step Process */}
            <div className="relative">
              {/* Connection line (desktop) */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-dark via-primary to-primary z-0" />
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {approachSteps.map((step, idx) => {
                  const icons = [Target, PenTool, Share2, TrendingUp];
                  const Icon = icons[idx];
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.15 }}
                      className="relative"
                    >
                      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-primary transition-all shadow-sm hover:shadow-lg h-full text-center">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
                          <div className="relative w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          {/* Step marker */}
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full border-2 border-white shadow-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      
                      {/* Connection arrow (for desktop) */}
                      {idx < approachSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-primary/50 z-0">
                          <ArrowRight className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Mobile connection */}
              <div className="lg:hidden flex justify-center mt-8">
                <div className="flex items-center gap-2 flex-wrap justify-center">
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

        {/* CTA Section */}
        <section
          className="relative z-10 py-20 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden"
          style={{
            backgroundImage: "url('/habillage/habillage%20hero2.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary-dark/90 to-primary/95" />
          <div className="relative max-w-4xl mx-auto text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-4 py-2 mb-4 text-sm font-semibold uppercase tracking-wide bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                {t("cta.kicker")}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8">
                {t("cta.subtitle")}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-dark font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
              >
                {t("cta.button")}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-lg font-medium italic text-white/90 mt-8">
                "{t("cta.tagline")}"
              </p>
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
