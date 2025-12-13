"use client";

import { useEffect, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { motion } from "framer-motion";

export default function RedCarpetScroll() {
  // Header height - adjust this if header height changes
  const headerHeight = 80; // px
  const [viewportHeight, setViewportHeight] = useState(800);
  
  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight - headerHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [headerHeight]);
  
  // Track scroll progress from the start of the page to the footer
  const { scrollYProgress } = useScroll();
  
  // The roll position moves down as you scroll (starts at top, moves down)
  const rollPositionY = useTransform(scrollYProgress, [0, 1], [0, viewportHeight - 120]);
  
  // The unrolled carpet length grows as you scroll - extends upward from the roll
  const carpetLength = useTransform(scrollYProgress, [0, 1], [0, viewportHeight]);
  
  // The roll size shrinks as carpet unrolls - starts large, ends small but still visible
  const rollSize = useTransform(scrollYProgress, [0, 1], [120, 40]);
  
  // Rotation of the roll (spins as it unrolls) - multiple rotations for realism
  const rollRotation = useTransform(scrollYProgress, [0, 1], [0, 1440]); // 4 full rotations

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 30 }}>
      <div 
        className="fixed right-0 w-48 md:w-56 lg:w-64 pointer-events-none" 
        style={{ 
          perspective: "1500px",
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {/* The carpet roll - simple circular spiral sitting on top of the carpet */}
          <motion.div
            className="absolute right-0"
            style={{
              top: rollPositionY,
              width: rollSize,
              height: rollSize, // Circular: height equals width, shrinks as it unrolls
              // No 3D transform - straight vertical view
              transformOrigin: "center center",
              zIndex: 10,
            }}
          >
            {/* Spiral - the roll */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                transform: `rotateZ(${rollRotation}deg)`,
              }}
            >
              {/* Single spiral shape using SVG - clearly visible */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 120 120"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Single black spiral path */}
                <path
                  d="M 60 60 
                     m -50 0 
                     a 50 50 0 1 1 100 0 
                     a 50 50 0 1 1 -100 0
                     m 20 0
                     a 30 30 0 1 0 60 0
                     a 30 30 0 1 0 -60 0
                     m 15 0
                     a 15 15 0 1 1 30 0
                     a 15 15 0 1 1 -30 0"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="4"
                  strokeLinecap="round"
                  opacity="1"
                />
              </svg>
              
              {/* Filled spiral background - circular */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle at center, #B91C1C 0%, #7F1D1D 50%, #8B1538 100%)",
                  boxShadow: "0 15px 40px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.4)",
                  opacity: 1, // Full opacity - no fading
                }}
              />
              
              {/* Spiral highlight for 3D effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/50" />
            </motion.div>
          </motion.div>

          {/* The unrolled carpet strip (coming out from the roll) - aligned with spiral center */}
          <motion.div
            className="absolute right-0"
            style={{
              bottom: useTransform(
                [rollPositionY, rollSize],
                ([y, size]) => {
                  const yValue = typeof y === 'number' ? y : 0;
                  const sizeValue = typeof size === 'number' ? size : 120;
                  const spiralCenter = yValue + sizeValue / 2;
                  return viewportHeight - spiralCenter;
                }
              ), // Position at center of spiral
              height: carpetLength, // Grows from 0 to full height as you scroll
              width: "24px", // Constant width - stays the same always
              minWidth: "24px",
              maxWidth: "24px",
              flexShrink: 0,
              flexGrow: 0,
              // No 3D transform - straight vertical
              zIndex: 5,
              opacity: 1, // Fully visible
            }}
          >
            <div className="relative h-full w-full">
              {/* Carpet strip - horizontal side view */}
              <div 
                className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-accent-dark"
                style={{
                  boxShadow: "inset -4px 0 20px rgba(0, 0, 0, 0.5), 4px 0 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(185, 28, 28, 0.3)",
                }}
              >
                {/* Carpet texture - visible from side */}
                <div 
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        transparent,
                        transparent 12px,
                        rgba(0, 0, 0, 0.2) 12px,
                        rgba(0, 0, 0, 0.2) 14px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 3px,
                        rgba(255, 255, 255, 0.08) 3px,
                        rgba(255, 255, 255, 0.08) 5px
                      )
                    `,
                  }}
                />
                {/* Shine effect - more prominent for side view */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {/* Top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/40" />
                {/* Bottom edge shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30" />
                {/* Left edge highlight for depth */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/35" />
                {/* Right edge shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-black/25" />
              </div>
            </div>
          </motion.div>

          {/* Shadow under the roll - positioned relative to roll */}
          <motion.div
            className="absolute right-0 rounded-full"
            style={{
              top: rollPositionY,
              marginTop: useTransform(rollSize, (size) => (typeof size === 'number' ? size : 120)),
              width: rollSize,
              height: useTransform(rollSize, (size) => (typeof size === 'number' ? size * 0.5 : 60)),
              background: "radial-gradient(ellipse, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 80%)",
              // No 3D transform - straight vertical view
              transformOrigin: "center center",
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </div>
  );
}
