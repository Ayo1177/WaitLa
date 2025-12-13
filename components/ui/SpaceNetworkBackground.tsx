"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
}

interface SpaceNetworkBackgroundProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export default function SpaceNetworkBackground({
  containerRef,
}: SpaceNetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 50, damping: 30 });
  const smoothY = useSpring(cursorY, { stiffness: 50, damping: 30 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = containerRef?.current || canvas.parentElement;
    if (!container) return;

    const resizeCanvas = () => {
      // Use viewport size for sticky background
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reinitialize points if canvas size changed or points array is empty
      if (pointsRef.current.length === 0 || 
          pointsRef.current[0].baseX > window.innerWidth || 
          pointsRef.current[0].baseY > window.innerHeight) {
        const pointCount = 240; // Doubled again for even denser effect
        pointsRef.current = Array.from({ length: pointCount }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 1.5, // Increased velocity for faster movement
          vy: (Math.random() - 0.5) * 1.5,
          baseX: Math.random() * window.innerWidth,
          baseY: Math.random() * window.innerHeight,
        }));
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      // Use viewport coordinates for sticky background
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    container.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseX = smoothX.get();
      const mouseY = smoothY.get();

      // Update and draw points with distortion
      pointsRef.current.forEach((point) => {
        // Continuous movement - less drift back to base, more free movement
        const driftStrength = 0.005; // Reduced from 0.02 for more free movement
        point.x += (point.baseX - point.x) * driftStrength;
        point.y += (point.baseY - point.y) * driftStrength;

        // Add velocity for continuous movement
        point.x += point.vx;
        point.y += point.vy;

        // Add slight random acceleration for more organic movement
        point.vx += (Math.random() - 0.5) * 0.05;
        point.vy += (Math.random() - 0.5) * 0.05;

        // Limit velocity to prevent too fast movement
        const maxVelocity = 2;
        point.vx = Math.max(-maxVelocity, Math.min(maxVelocity, point.vx));
        point.vy = Math.max(-maxVelocity, Math.min(maxVelocity, point.vy));

        // Bounce off edges with slight velocity variation
        if (point.x < 0 || point.x > canvas.width) {
          point.vx *= -1;
          point.vx += (Math.random() - 0.5) * 0.3; // Add randomness on bounce
          point.baseX = Math.max(0, Math.min(canvas.width, point.x));
          point.x = Math.max(0, Math.min(canvas.width, point.x));
        }
        if (point.y < 0 || point.y > canvas.height) {
          point.vy *= -1;
          point.vy += (Math.random() - 0.5) * 0.3; // Add randomness on bounce
          point.baseY = Math.max(0, Math.min(canvas.height, point.y));
          point.y = Math.max(0, Math.min(canvas.height, point.y));
        }

        // Enhanced cursor distortion/warp effect
        const dx = mouseX - point.x;
        const dy = mouseY - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;
        const influence = Math.max(0, 1 - distance / maxDistance);

        if (influence > 0) {
          // Stronger distortion effect
          const force = influence * influence * 0.15; // Quadratic falloff for smoother effect
          const angle = Math.atan2(dy, dx);
          const pushDistance = force * 30;
          
          point.x -= Math.cos(angle) * pushDistance;
          point.y -= Math.sin(angle) * pushDistance;
        }

        // Draw point with glow - slightly larger for better visibility
        const gradient = ctx.createRadialGradient(
          point.x,
          point.y,
          0,
          point.x,
          point.y,
          5
        );
        gradient.addColorStop(0, "rgba(229, 57, 53, 0.9)");
        gradient.addColorStop(0.5, "rgba(229, 57, 53, 0.5)");
        gradient.addColorStop(1, "rgba(229, 57, 53, 0)");
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, 3.5, 0, Math.PI * 2); // Slightly larger point
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Draw connections with distortion-aware lines
      pointsRef.current.forEach((pointA, i) => {
        pointsRef.current.slice(i + 1).forEach((pointB) => {
          const dx = pointB.x - pointA.x;
          const dy = pointB.y - pointA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 280; // Increased further for even more connections

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.5; // Increased further for better visibility
            
            // Check if line is near cursor for warp effect
            const midX = (pointA.x + pointB.x) / 2;
            const midY = (pointA.y + pointB.y) / 2;
            const distToCursor = Math.sqrt(
              (mouseX - midX) ** 2 + (mouseY - midY) ** 2
            );
            const warpInfluence = Math.max(0, 1 - distToCursor / 150);
            
            ctx.beginPath();
            ctx.moveTo(pointA.x, pointA.y);
            ctx.lineTo(pointB.x, pointB.y);
            ctx.strokeStyle = `rgba(229, 57, 53, ${opacity * (1 + warpInfluence * 0.5)})`;
            ctx.lineWidth = 1.2 + warpInfluence * 0.5; // Slightly thicker lines
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      container.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [mounted, smoothX, smoothY, containerRef]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

