"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Button from "@/components/ui/Button";
import { Sparkles, Target, TrendingUp } from "lucide-react";

const values = [
  {
    name: "Creativity",
    description:
      "We think outside the box to deliver innovative solutions that stand out.",
    icon: Sparkles,
  },
  {
    name: "Relevance",
    description:
      "Every strategy is tailored to your audience and business objectives.",
    icon: Target,
  },
  {
    name: "Performance",
    description:
      "Data-driven approaches that deliver measurable results and ROI.",
    icon: TrendingUp,
  },
];

export default function AboutTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-4xl lg:text-center">
          {isInView && (
            <motion.h2
              className="text-base font-semibold leading-7 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              About WaitLa
            </motion.h2>
          )}
          {isInView && (
            <motion.p
              className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We're a creative digital marketing agency
            </motion.p>
          )}
          {isInView && (
            <motion.p
              className="mt-6 text-lg leading-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Specializing in website development, mobile applications, digital
              strategy, and media buying. We combine creativity, youth, and
              innovation to help brands reach their full potential.
            </motion.p>
          )}
        </div>
        <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 w-full">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                className="flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <value.icon
                    className="h-5 w-5 flex-none text-white"
                    aria-hidden="true"
                  />
                  {value.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-white/90">
                  <p className="flex-auto">{value.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
        <div className="mt-12 text-center">
          {isInView && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button href="/about" variant="outline">
                Learn More About Us
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}


