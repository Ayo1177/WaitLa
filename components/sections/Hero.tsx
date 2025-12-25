"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Helper function to split text into words and wrap them in spans
const splitTextIntoWords = (text: string, className: string = ""): string => {
  return text
    .split(/(\s+)/)
    .map((word, index) => {
      if (word.trim() === "") {
        return word; // Preserve whitespace
      }
      return `<span class="word-wrapper ${className}" style="display: inline-block; overflow: hidden;"><span class="word" style="display: inline-block;">${word}</span></span>`;
    })
    .join("");
};

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("Hero");

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!mounted || !heroContainerRef.current || !titleRef.current || !subtitleRef.current) return;

      // Split title text into words
      const mainText = t("title.main");
      const highlightText = t("title.highlight");
      
      // Set up the title HTML with split words
      if (titleRef.current) {
        titleRef.current.innerHTML = `
          ${splitTextIntoWords(mainText)} 
          <span class="text-primary">${splitTextIntoWords(highlightText, "highlight-word")}</span>
        `;
      }

      // Split subtitle text
      const subtitleText = t("subtitle");
      if (subtitleRef.current) {
        subtitleRef.current.innerHTML = splitTextIntoWords(subtitleText);
      }

      // Get word elements - separate regular words from highlight words
      const allWords = titleRef.current?.querySelectorAll(".word") || [];
      const highlightContainer = titleRef.current?.querySelector(".text-primary");
      const highlightWords = highlightContainer?.querySelectorAll(".word") || [];
      
      // Get regular words (exclude highlight words)
      const regularWords = Array.from(allWords).filter(
        (word) => !highlightContainer?.contains(word)
      );
      
      const subtitleWords = subtitleRef.current?.querySelectorAll(".word") || [];

      // Set initial state for regular title words
      gsap.set(regularWords, {
        y: 100,
        opacity: 0,
      });

      // Set initial state for highlight words with more dramatic effect
      gsap.set(highlightWords, {
        y: 150,
        scale: 0.3,
        rotation: -15,
        opacity: 0,
      });

      gsap.set(subtitleWords, {
        y: 50,
        opacity: 0,
      });

      // Set initial state for other elements
      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          y: 30,
          opacity: 0,
        });
      }

      if (statsRef.current) {
        gsap.set(statsRef.current, {
          y: 30,
          opacity: 0,
        });
      }

      // Create timeline for hero animations
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Animate regular title words with normal stagger
      tl.to(regularWords, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
      });

      // Animate highlight words with dramatic, attention-grabbing effect
      // Start slightly after regular words finish for emphasis
      tl.to(
        highlightWords,
        {
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          stagger: {
            amount: 0.4, // Total stagger duration
            from: "start",
            ease: "power2.out",
          },
          ease: "back.out(1.7)", // Bouncy effect for attention
        },
        "-=0.3" // Start slightly before regular words finish
      );

      // Animate subtitle words
      if (subtitleWords.length > 0) {
        tl.to(
          subtitleWords,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.03,
          },
          "-=0.5"
        );
      } else {
        // Fallback if subtitle isn't split
        tl.to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
          },
          "-=0.5"
        );
      }

      // Animate button
      if (buttonRef.current) {
        tl.to(
          buttonRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.3"
        );
      }

      // Animate stats
      if (statsRef.current) {
        tl.to(
          statsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.2"
        );
      }

      // Set up scroll-triggered fade out
      if (sectionRef.current && heroContainerRef.current) {
        gsap.to(heroContainerRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "end end",
            end: "start end",
            scrub: 1,
          },
        });
      }
    },
    {
      scope: heroContainerRef,
      dependencies: [mounted],
      revertOnUpdate: true,
    }
  );


  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-gradient-to-b from-[#fff2f2] via-white to-white min-h-screen"
    >
      {/* Fixed text content - in front of background */}
      <div
        ref={heroContainerRef}
        className="fixed inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="text-center pt-14 sm:pt-24">
            {mounted && (
              <h1
                ref={titleRef}
                className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl pointer-events-none"
              />
            )}
            {mounted && (
              <p
                ref={subtitleRef}
                className="mt-6 text-lg leading-8 text-gray-600 sm:text-xl pointer-events-none"
              />
            )}
            {mounted && (
              <div
                ref={buttonRef}
                className="mt-10 flex items-center justify-center relative z-20 pointer-events-auto"
              >
                <Button
                  href="/contact"
                  size="lg"
                  className="group relative bg-gradient-to-r from-primary via-primary-dark to-[#8a1c1a] text-white shadow-[0_0_20px_rgba(229,57,53,0.5),0_0_40px_rgba(229,57,53,0.3)] hover:shadow-[0_0_30px_rgba(229,57,53,0.8),0_0_60px_rgba(229,57,53,0.5),0_0_90px_rgba(229,57,53,0.3)] hover:scale-105 transition-all duration-300 hover:-translate-y-1 active:scale-100 active:translate-y-0"
                >
                  {t("primaryCta")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            )}
            {mounted && (
              <div
                ref={statsRef}
                className="mt-16 flex items-center justify-center gap-8 text-sm text-gray-600 pointer-events-none"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-xs">{t("stat.projects")}</div>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">30+</div>
                  <div className="text-xs">{t("stat.clients")}</div>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">5★</div>
                  <div className="text-xs">{t("stat.rating")}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to maintain scroll height */}
      <div className="h-screen" />
    </section>
  );
}