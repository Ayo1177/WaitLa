"use client";

import { useEffect, useState } from "react";

// Confetti particles component
export function ConfettiParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate random confetti particles
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes confetti-fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
        `
      }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full opacity-60"
            style={{
              left: `${particle.left}%`,
              backgroundColor: Math.random() > 0.5 ? '#ef4444' : '#dc2626',
              animation: `confetti-fall ${particle.duration}s linear ${particle.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}

// Sparkle effect component
export function SparkleEffect() {
  const [sparkles, setSparkles] = useState<Array<{ id: number; top: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setSparkles(newSparkles);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes sparkle {
            0%, 100% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1.5);
            }
          }
        `
      }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute w-1 h-1 bg-red-500 rounded-full"
            style={{
              top: `${sparkle.top}%`,
              left: `${sparkle.left}%`,
              animation: `sparkle 2s ease-in-out ${sparkle.delay}s infinite`,
              boxShadow: '0 0 6px 2px rgba(239, 68, 68, 0.8)',
            }}
          />
        ))}
      </div>
    </>
  );
}

// Floating balloons decoration
export function FloatingBalloons() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-20px) rotate(5deg);
            }
          }
        `
      }} />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + Math.random() * 20}%`,
              animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <div className="w-8 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-full relative">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-red-300"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Animated background gradient
export function AnimatedGradient() {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradient-shift {
            0%, 100% {
              transform: scale(1) rotate(0deg);
            }
            50% {
              transform: scale(1.1) rotate(5deg);
            }
          }
        `
      }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: 'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(220, 38, 38, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(185, 28, 28, 0.2) 0%, transparent 50%)',
            animation: 'gradient-shift 8s ease infinite',
          }}
        />
      </div>
    </>
  );
}

// Celebration burst effect on hover
export function CelebrationBurst({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes burst {
            0% {
              transform: rotate(var(--rotation)) translateY(0) scale(0);
              opacity: 1;
            }
            100% {
              transform: rotate(var(--rotation)) translateY(-30px) scale(1);
              opacity: 0;
            }
          }
        `
      }} />
      <div className="relative group">
        {children}
        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-red-500 rounded-full"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-30px)`,
                animation: `burst 0.6s ease-out forwards`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}
