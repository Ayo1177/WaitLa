"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function RedCarpetScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rollRef = useRef<HTMLDivElement>(null);
  const carpetRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const [viewportHeight, setViewportHeight] = useState(800);
  const headerHeight = 80;

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(window.innerHeight - headerHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || !rollRef.current || !carpetRef.current) return;

      const roll = rollRef.current;
      const carpet = carpetRef.current;
      const spiral = spiralRef.current;

      // Helper function to update dependent elements
      const updateDependentElements = () => {
        const rollY = gsap.getProperty(roll, "y") as number;
        const rollSize = gsap.getProperty(roll, "width") as number;
        const rollCenter = rollY + rollSize / 2;
        
        // Update carpet position to follow the roll
        gsap.set(carpet, {
          bottom: viewportHeight - rollCenter,
        });
      };

      // Set initial positions
      updateDependentElements();

      // Create a timeline that responds to scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing - 1 second to catch up
          invalidateOnRefresh: true,
          onUpdate: updateDependentElements,
        },
      });

      // Calculate animation values
      const maxRollSize = 120;
      const minRollSize = 40;
      const maxRollPosition = viewportHeight - minRollSize;
      const maxCarpetLength = viewportHeight;

      // Animate the roll position (moves down as you scroll)
      tl.to(
        roll,
        {
          y: maxRollPosition,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Animate the roll size (shrinks as carpet unrolls)
      tl.to(
        roll,
        {
          width: minRollSize,
          height: minRollSize,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      // Animate the roll rotation (spins as it unrolls) - 4 full rotations
      tl.to(
        spiral,
        {
          rotation: 1440, // 4 full rotations (360 * 4)
          duration: 1,
          ease: "none",
          transformOrigin: "center center",
        },
        0
      );

      // Animate the carpet length (grows upward from the roll)
      tl.to(
        carpet,
        {
          height: maxCarpetLength,
          duration: 1,
          ease: "power1.out",
        },
        0
      );


      // Add spiral fold segments to the carpet for realism
      // Create multiple segments that appear as the carpet unrolls
      const segmentsContainer = carpet.querySelector(".carpet-segments");
      if (segmentsContainer && segmentsContainer.children.length === 0) {
        const carpetSegments: HTMLDivElement[] = [];
        const segmentCount = 15; // Number of fold segments

        // Create segments only if they don't exist
        for (let i = 0; i < segmentCount; i++) {
          const segment = document.createElement("div");
          segment.className = "absolute left-0 right-0 carpet-segment";
          segment.style.height = `${100 / segmentCount}%`;
          segment.style.top = `${(i * 100) / segmentCount}%`;
          segment.style.background = "transparent";
          segment.style.borderTop = "1px solid rgba(139, 21, 56, 0.3)";
          segment.style.borderBottom = "1px solid rgba(0, 0, 0, 0.2)";
          segment.style.opacity = "0";
          segment.style.transform = "scaleY(0)";
          segment.style.transformOrigin = "top center";
          segmentsContainer.appendChild(segment);
          carpetSegments.push(segment);
        }

        // Animate segments to create fold effect
        carpetSegments.forEach((segment, index) => {
          const segmentProgress = index / segmentCount;
          const foldAmount = Math.sin(segmentProgress * Math.PI * 4) * 0.03;
          
          tl.to(
            segment,
            {
              opacity: 1,
              scaleY: 1 + foldAmount,
              duration: 1 / segmentCount,
              ease: "power1.out",
            },
            segmentProgress
          );
        });
      }

      // Cleanup function
      return () => {
        const triggers = ScrollTrigger.getAll();
        triggers.forEach((trigger) => {
          if (trigger.vars.trigger === "body") {
            trigger.kill();
          }
        });
        // Clean up segments
        const segmentsContainer = carpet.querySelector(".carpet-segments");
        if (segmentsContainer) {
          segmentsContainer.innerHTML = "";
        }
      };
    },
    {
      scope: containerRef,
      dependencies: [viewportHeight],
      revertOnUpdate: true,
    }
  );

  return (
    <div
      className="hidden md:block fixed inset-0 pointer-events-none"
      style={{ zIndex: 30 }}
      ref={containerRef}
    >
      <div
        className="fixed right-0 w-48 md:w-56 lg:w-64 pointer-events-none"
        style={{
          perspective: "1500px",
          top: `${headerHeight}px`,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* The carpet roll - circular spiral */}
          <div
            ref={rollRef}
            className="absolute right-0"
            style={{
              top: 0,
              width: 120,
              height: 120,
              transformOrigin: "center center",
              zIndex: 10,
            }}
          >
            {/* Spiral rotation container */}
            <div
              ref={spiralRef}
              className="absolute inset-0 rounded-full"
              style={{
                transformOrigin: "center center",
              }}
            >
              {/* Spiral SVG pattern */}
              <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 120 120"
                preserveAspectRatio="xMidYMid meet"
              >
                {/* Spiral path - multiple rings */}
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
                  opacity="0.8"
                />
              </svg>

              {/* Filled spiral background with gradient */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at center, #B91C1C 0%, #7F1D1D 50%, #8B1538 100%)",
                  boxShadow:
                    "0 15px 40px rgba(0, 0, 0, 0.6), inset 0 0 30px rgba(0, 0, 0, 0.4)",
                }}
              />

              {/* 3D highlight effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/50" />
            </div>
          </div>

          {/* The unrolled carpet strip - side view */}
          <div
            ref={carpetRef}
            className="absolute right-0"
            style={{
              bottom: viewportHeight - 60, // Start at roll center
              height: 0,
              width: "24px",
              minWidth: "24px",
              maxWidth: "24px",
              zIndex: 5,
            }}
          >
            <div className="relative h-full w-full">
              {/* Main carpet body - side view with depth */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, #8B1538 0%, #B91C1C 50%, #7F1D1D 100%)",
                  boxShadow:
                    "inset -4px 0 20px rgba(0, 0, 0, 0.5), 4px 0 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(185, 28, 28, 0.3)",
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

                {/* Shine effect for side view */}
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
              
              {/* Segments container for fold effects */}
              <div className="carpet-segments absolute inset-0" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
