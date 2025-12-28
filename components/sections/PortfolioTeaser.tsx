"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import reelsData from "@/lib/reels.json";

type Reel = {
  id: number;
  title: string;
  video: string;
  thumbnail: string;
  client: string;
};

// Filter out placeholder videos - only show actual videos
const adReels: Reel[] = reelsData.reels.filter((reel) => !reel.video.includes("placeholder"));

function ReelCard({ reel, index, isInView }: { reel: Reel; index: number; isInView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Autoplay when in viewport
  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay was prevented, user interaction required
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [reel.video]);

  return (
    <motion.div
      ref={cardRef}
      data-reel-card
      className="flex-shrink-0 w-[300px] sm:w-[400px] lg:w-[500px]"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative group overflow-hidden bg-gray-900 shadow-lg ring-1 ring-gray-800">
        <div className="aspect-[9/16] relative">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={reel.thumbnail}
          >
            <source src={reel.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Infinite scroll effect - duplicate reels once for seamless looping (only need 2 copies)
  const duplicatedReels = [...adReels, ...adReels];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Calculate the width of a single reel (including gap)
    const firstReel = container.querySelector('[data-reel-card]') as HTMLElement;
    if (!firstReel) return;
    
    const reelWidth = firstReel.offsetWidth;
    const singleSetWidth = reelWidth * adReels.length; // Width of one complete set

    const scrollSpeed = 0.5; // pixels per frame

    const autoScroll = () => {
      scrollPositionRef.current += scrollSpeed;
      container.scrollLeft = scrollPositionRef.current;

      // Seamlessly loop: when we've scrolled through one complete set, jump back to start
      // This happens before the user can see the duplicate, creating infinite loop effect
      if (scrollPositionRef.current >= singleSetWidth) {
        scrollPositionRef.current = scrollPositionRef.current - singleSetWidth;
        container.scrollLeft = scrollPositionRef.current;
      }

      animationFrameRef.current = requestAnimationFrame(autoScroll);
    };

    animationFrameRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array - only run once on mount

  return (
    <section ref={ref} className="relative z-20 -mt-1 bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      {/* Infinite horizontal scrolling gallery - full width, no padding */}
      <div className="w-full">
        <div
          ref={scrollContainerRef}
          className="flex gap-0 overflow-x-hidden scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {duplicatedReels.map((reel, index) => (
            <ReelCard
              key={`${reel.id}-${index}`}
              reel={reel}
              index={index % adReels.length}
              isInView={isInView}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}


