"use client";

import { useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WindButtonProps {
  text: string;
  contactUrl: string;
}

export default function WindButton({ text, contactUrl }: WindButtonProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const windRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Float in animation when in view
  useGSAP(
    () => {
      if (!contentRef.current || !windRef.current || !textRef.current || typeof window === "undefined") return;

      const screenWidth = window.innerWidth;

      // Set initial state - animate the container so wind and text move together perfectly
      gsap.set(contentRef.current, {
        x: -screenWidth - 200,
        opacity: 0,
      });

      // Set initial state for individual elements (for continuous floating later)
      gsap.set([windRef.current, textRef.current], {
        opacity: 1, // Keep opacity at 1 since container handles fade
      });

      // Create scroll trigger for float in - trigger earlier so animation is visible
      const floatInTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start when section top hits viewport bottom
          end: "top center",
          toggleActions: "play none none reverse",
        },
      });

      // Container (with wind and text) floats in together from the left
      floatInTl.to(
        contentRef.current,
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        0
      );

      // Start continuous floating animations only after the initial float-in completes
      floatInTl.call(() => {
        // Add continuous floating animation for wind (gentle vertical float)
        const floatAnimation = gsap.to(windRef.current, {
          y: -8,
          rotation: 3,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Add subtle floating animation for text (gentle vertical float)
        const textFloatAnimation = gsap.to(textRef.current, {
          y: -5,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Store animations for cleanup
        (windRef.current as any).__floatAnimation = floatAnimation;
        (textRef.current as any).__floatAnimation = textFloatAnimation;
      });

      return () => {
        floatInTl.kill();
        // Kill continuous animations if they exist
        if ((windRef.current as any)?.__floatAnimation) {
          (windRef.current as any).__floatAnimation.kill();
        }
        if ((textRef.current as any)?.__floatAnimation) {
          (textRef.current as any).__floatAnimation.kill();
        }
      };
    },
    {
      scope: containerRef,
    }
  );

  const handleClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (!windRef.current || !textRef.current) return;

    // Create exit animation timeline
    const exitTl = gsap.timeline({
      onComplete: () => {
        // Navigate after animation completes
        router.push(contactUrl);
      },
    });

    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1920;

    // Container (with wind and text) floats out to the right together
    exitTl.to(
      contentRef.current,
      {
        x: screenWidth + 300,
        opacity: 0,
        scale: 0.9,
        duration: 1.5,
        ease: "power2.in",
      },
      0
    );
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-center py-12 min-h-[500px]">
      {/* Wind SVG and Text Container - animated together */}
      <div
        ref={contentRef}
        className="relative flex items-center justify-center gap-1 md:gap-2"
        style={{
          opacity: isAnimating ? 0.5 : 1,
        }}
      >
        {/* Wind SVG - Not clickable */}
        <svg
          ref={windRef}
          className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 z-10 pointer-events-none"
          viewBox="0 0 56 56"
          fill="none"
          style={{
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
        >
          <path
            d="M 6.1563 21.2852 C 9.5313 20.2071 13.0235 19.6680 16.3516 19.6680 C 20.6641 19.6680 23.8282 20.3476 27.9063 20.3476 C 32.1250 20.3476 34.7500 17.4883 34.7500 13.7617 C 34.7500 9.9414 31.8204 7.2227 28.2110 7.2227 C 25.5391 7.2227 23.1953 8.8867 22.2110 11.1133 C 21.8360 11.8867 21.9766 12.8008 22.7969 13.2227 C 23.5469 13.5976 24.4610 13.3633 24.9532 12.4024 C 25.4688 11.2071 26.7344 10.2695 28.2110 10.2695 C 30.1563 10.2695 31.6797 11.6289 31.6797 13.7617 C 31.6797 15.8945 30.2032 17.3008 27.9063 17.3008 C 24.0157 17.3008 20.8047 16.5976 16.3516 16.5976 C 12.5313 16.5976 8.6641 17.2773 5.2188 18.3789 C 4.2344 18.6602 3.8594 19.5039 4.0938 20.3242 C 4.3282 21.1211 5.1016 21.5898 6.1563 21.2852 Z M 42.8125 32.2539 C 48.2737 32.2539 52.1406 28.7852 52.1406 23.9336 C 52.1406 19.1524 48.4609 15.6836 43.8906 15.6836 C 39.6485 15.6836 36.5079 18.6367 35.9453 22.5273 C 35.8047 23.4883 36.3438 24.2617 37.1875 24.3789 C 38.0547 24.4961 38.8047 23.9571 38.9922 22.8555 C 39.3906 20.4180 41.4297 18.7305 43.8906 18.7305 C 46.7502 18.7305 49.0705 20.8633 49.0705 23.9336 C 49.0705 27.0508 46.6096 29.2071 42.8125 29.2071 C 35.6641 29.2071 27.9532 25.1289 18.5782 25.1289 C 13.7500 25.1289 9.3438 25.9024 5.2188 27.3789 C 4.2579 27.7071 3.8594 28.5273 4.0938 29.3476 C 4.3282 30.1445 5.1250 30.6367 6.1563 30.2852 C 9.9766 28.8320 13.9610 28.1992 18.5782 28.1992 C 27.9297 28.1992 34.9141 32.2539 42.8125 32.2539 Z M 27.9297 48.7773 C 31.5391 48.7773 34.3282 46.1055 34.3282 42.2852 C 34.3282 36.7539 28.6797 33.6602 18.2735 33.6602 C 13.9141 33.6602 9.2032 34.5039 5.2188 35.8867 C 4.2579 36.2149 3.8594 37.0352 4.0938 37.8555 C 4.3282 38.6524 5.1250 39.1445 6.1563 38.7930 C 9.8828 37.4571 14.0547 36.7305 18.2735 36.7305 C 26.7813 36.7305 31.2813 38.8633 31.2813 42.2852 C 31.2813 44.4414 29.7813 45.7305 27.9297 45.7305 C 26.0782 45.7305 24.9532 44.4883 24.6250 42.5195 C 24.4844 41.6524 23.8516 40.9492 22.8438 41.0195 C 21.7891 41.0898 21.3672 41.9805 21.5079 42.9180 C 21.9297 46.1758 24.3438 48.7773 27.9297 48.7773 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
        </svg>

        {/* Text - Contact Strip - Clickable with indicators */}
        <div
          ref={textRef}
          onClick={handleClick}
          className="group relative max-w-2xl cursor-pointer px-6 py-4 md:px-8 md:py-5 rounded-xl border-2 border-white/30 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:scale-105 active:scale-100"
          style={{
            pointerEvents: isAnimating ? "none" : "auto",
          }}
        >
          {/* Always visible border glow */}
          <div className="absolute inset-0 rounded-xl border-2 border-white/20 pointer-events-none" />
          
          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/5 transition-all duration-300 pointer-events-none" />
          
          <div className="relative flex items-center gap-4">
            <p
              className="text-base md:text-lg lg:text-xl font-bold text-white leading-relaxed flex-1"
              style={{
                textShadow: `
                  0 2px 4px rgba(0, 0, 0, 0.5),
                  0 0 8px rgba(0, 0, 0, 0.3)
                `,
              }}
            >
              {text}
            </p>
            
            {/* Arrow icon - always visible, moves on hover */}
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-white opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
