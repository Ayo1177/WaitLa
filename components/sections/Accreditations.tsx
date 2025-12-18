"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const certifications = [
  {
    nameKey: "cert.googleAds",
    descKey: "cert.googleAdsDesc",
    logo: "/badges/google ads.png",
  },
  {
    nameKey: "cert.googleAnalytics",
    descKey: "cert.googleAnalyticsDesc",
    logo: "/badges/google analytics.png",
  },
  {
    nameKey: "cert.meta",
    descKey: "cert.metaDesc",
    logo: "/badges/meta media buying.jpeg",
  },
];

export default function Accreditations() {
  const t = useTranslations("Accreditations");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-20 py-24 sm:py-32 -mt-1 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-4xl lg:text-center">
          {isInView && (
            <motion.h2
              className="text-base font-semibold leading-7 text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {t("badge")}
            </motion.h2>
          )}
          {isInView && (
            <motion.p
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t("title")}
            </motion.p>
          )}
          {isInView && (
            <motion.p
              className="mt-6 text-lg leading-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("description")}
            </motion.p>
          )}
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-5xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.nameKey}
              className="flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex h-32 w-32 items-center justify-center rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow hover:scale-105">
                <Image
                  src={cert.logo}
                  alt={t(cert.nameKey)}
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white text-center">
                {t(cert.nameKey)}
              </h3>
              <p className="mt-2 text-xs text-white/70 text-center">
                {t(cert.descKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


