"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import WindButton from "@/components/ui/BusButton";

export default function ContactStrip() {
  const t = useTranslations("ContactStrip");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-20 py-24 sm:py-32 -mt-1 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t("title")}
            </h2>
          </div>

          <WindButton text={t("description")} contactUrl="/contact" />
        </motion.div>
      </div>
    </section>
  );
}


