"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

interface RotatingScrollBackgroundProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export default function RotatingScrollBackground({
  containerRef,
}: RotatingScrollBackgroundProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to rotation (0 to 360 degrees)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      ref={backgroundRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        rotate: rotation,
        transformOrigin: "center center",
      }}
    >
      {/* Rotating gradient background */}
      <div
        className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(229, 57, 53, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(255, 143, 163, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(229, 57, 53, 0.08) 0%, transparent 70%),
            linear-gradient(135deg, rgba(255, 242, 242, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 242, 242, 0.3) 100%)
          `,
        }}
      />
      
      {/* Additional rotating pattern layers */}
      <div
        className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 100px,
              rgba(229, 57, 53, 0.03) 100px,
              rgba(229, 57, 53, 0.03) 200px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 100px,
              rgba(255, 143, 163, 0.02) 100px,
              rgba(255, 143, 163, 0.02) 200px
            )
          `,
        }}
      />
    </motion.div>
  );
}

