"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  
  // Fade out hero as user scrolls down - start at 100% opacity when at top
  // Fade starts when section bottom reaches viewport top, completes when section top reaches viewport top
  const { scrollYProgress: heroFadeProgress } = useScroll({
    target: sectionRef,
    offset: ["end end", "start end"],
  });
  
  const heroOpacityValue = useTransform(heroFadeProgress, [0, 1], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#fff2f2] via-white to-white px-4 sm:px-8 lg:px-12 xl:px-16 pt-14 sm:pt-24"
    >
      <motion.div
        className="mx-auto max-w-5xl py-32 sm:py-48 lg:py-56"
        style={{ opacity: heroOpacityValue }}
      >
        <div className="text-center">
          {mounted && (
            <motion.h1
              className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6 }}
            >
              Take Your Brand to the{" "}
              <span className="text-primary">Next Level</span>
            </motion.h1>
          )}
          {mounted && (
            <motion.p
              className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Creative digital marketing agency specializing in web development,
              mobile apps, digital strategy, and media buying. We bring
              creativity, relevance, and performance to every project.
            </motion.p>
          )}
          {mounted && (
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              <Button
                href="/contact"
                size="lg"
                className="group"
              >
                Book a Call
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                href="/portfolio"
                variant="outline"
                size="lg"
              >
                View Our Work
              </Button>
            </motion.div>
          )}
          {mounted && (
            <motion.div
              className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50+</div>
                <div className="text-xs">Projects</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-xs">Happy Clients</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5★</div>
                <div className="text-xs">Rating</div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

