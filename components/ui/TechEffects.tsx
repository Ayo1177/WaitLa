"use client";

import { useEffect, useRef } from "react";

export function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrame: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gridSize = 50;
      const lineColor = "rgba(239, 68, 68, 0.2)";
      const glowColor = "rgba(239, 68, 68, 0.1)";

      // Draw grid
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated glow points
      const points = 20;
      for (let i = 0; i < points; i++) {
        const x = (canvas.width / points) * i + (Math.sin(time * 0.001 + i) * 30);
        const y = (canvas.height / points) * i + (Math.cos(time * 0.001 + i) * 30);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 30);
        gradient.addColorStop(0, "rgba(239, 68, 68, 0.4)");
        gradient.addColorStop(1, "rgba(239, 68, 68, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 16;
      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  );
}

export function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {/* Animated circuit-like lines */}
        <path
          d="M 0,100 Q 200,50 400,100 T 800,100"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M 100,0 Q 300,150 500,0 T 900,0"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <path
          d="M 0,200 Q 300,250 600,200 T 1200,200"
          stroke="url(#circuitGradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </svg>
    </div>
  );
}

export function FloatingParticles() {
  const particles = Array.from({ length: 30 }, (_, i) => {
    const randomX = Math.random() * 50 - 25;
    const randomY = Math.random() * 50 - 25;
    return {
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      randomX,
      randomY,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    };
  });

  useEffect(() => {
    const styleId = 'tech-particles-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = particles.map((particle) => `
      @keyframes float-particle-${particle.id} {
        0%, 100% {
          transform: translate(0, 0);
          opacity: 0.2;
        }
        50% {
          transform: translate(${particle.randomX}px, ${particle.randomY}px);
          opacity: 0.6;
        }
      }
    `).join('\n');
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float-particle-${particle.id} ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function DataStream() {
  const streams = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: (100 / 6) * (i + 1),
    delay: i * 0.3,
  }));

  useEffect(() => {
    const styleId = 'tech-datastream-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes dataStream {
        0% {
          transform: translateY(-100%);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) existingStyle.remove();
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
          style={{
            left: `${stream.x}%`,
            animation: `dataStream 3s linear infinite`,
            animationDelay: `${stream.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function CircuitBoard() {
  return (
    <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMaxYMax meet">
        <defs>
          <linearGradient id="circuitBoardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Circuit board base */}
        <rect x="0" y="0" width="400" height="800" fill="url(#circuitBoardGradient)" />
        
        {/* Circuit traces */}
        <g stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.6">
          {/* Horizontal traces */}
          <line x1="50" y1="100" x2="350" y2="100" />
          <line x1="50" y1="200" x2="350" y2="200" />
          <line x1="50" y1="300" x2="350" y2="300" />
          <line x1="50" y1="400" x2="350" y2="400" />
          <line x1="50" y1="500" x2="350" y2="500" />
          <line x1="50" y1="600" x2="350" y2="600" />
          <line x1="50" y1="700" x2="350" y2="700" />
          
          {/* Vertical traces */}
          <line x1="100" y1="50" x2="100" y2="750" />
          <line x1="200" y1="50" x2="200" y2="750" />
          <line x1="300" y1="50" x2="300" y2="750" />
          
          {/* Diagonal connections */}
          <path d="M 100 100 L 200 200 M 200 200 L 300 100" />
          <path d="M 100 300 L 200 400 M 200 400 L 300 300" />
          <path d="M 100 500 L 200 600 M 200 600 L 300 500" />
        </g>
        
        {/* Circuit components (resistors, chips) */}
        <g fill="#ef4444" opacity="0.5">
          {/* Resistor symbols */}
          <rect x="120" y="90" width="60" height="20" rx="2" />
          <rect x="220" y="190" width="60" height="20" rx="2" />
          <rect x="120" y="290" width="60" height="20" rx="2" />
          <rect x="220" y="390" width="60" height="20" rx="2" />
          <rect x="120" y="490" width="60" height="20" rx="2" />
          <rect x="220" y="590" width="60" height="20" rx="2" />
          
          {/* Chip/IC symbols */}
          <rect x="150" y="180" width="40" height="40" rx="3" />
          <rect x="250" y="280" width="40" height="40" rx="3" />
          <rect x="150" y="380" width="40" height="40" rx="3" />
          <rect x="250" y="480" width="40" height="40" rx="3" />
          <rect x="150" y="580" width="40" height="40" rx="3" />
          
          {/* Connection points */}
          <circle cx="100" cy="100" r="4" />
          <circle cx="200" cy="200" r="4" />
          <circle cx="300" cy="100" r="4" />
          <circle cx="100" cy="300" r="4" />
          <circle cx="200" cy="400" r="4" />
          <circle cx="300" cy="300" r="4" />
          <circle cx="100" cy="500" r="4" />
          <circle cx="200" cy="600" r="4" />
          <circle cx="300" cy="500" r="4" />
        </g>
      </svg>
    </div>
  );
}

export function RobotIllustration() {
  return (
    <div className="absolute left-0 top-0 w-1/2 h-full opacity-15 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 400 800" preserveAspectRatio="xMinYMax meet">
        <defs>
          <linearGradient id="robotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Robot head */}
        <g transform="translate(100, 150)">
          <rect x="0" y="0" width="200" height="180" rx="20" fill="url(#robotGradient)" stroke="#ef4444" strokeWidth="3" opacity="0.6" />
          
          {/* Eyes */}
          <circle cx="60" cy="60" r="25" fill="#ef4444" opacity="0.8" className="animate-pulse">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="60" r="25" fill="#ef4444" opacity="0.8" className="animate-pulse">
            <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" begin="0.1s" />
          </circle>
          
          {/* Antenna */}
          <line x1="100" y1="0" x2="100" y2="-30" stroke="#ef4444" strokeWidth="3" />
          <circle cx="100" cy="-35" r="5" fill="#ef4444" />
          
          {/* Mouth/Display */}
          <rect x="50" y="120" width="100" height="30" rx="5" fill="#ef4444" opacity="0.5" />
          <line x1="60" y1="135" x2="140" y2="135" stroke="rgba(255,255,255,0.8)" strokeWidth="2" />
        </g>
        
        {/* Robot body */}
        <g transform="translate(80, 350)">
          <rect x="0" y="0" width="240" height="200" rx="15" fill="url(#robotGradient)" stroke="#ef4444" strokeWidth="3" opacity="0.6" />
          
          {/* Chest panel */}
          <rect x="40" y="30" width="160" height="140" rx="10" fill="#ef4444" opacity="0.3" />
          
          {/* Control buttons */}
          <circle cx="80" cy="100" r="8" fill="#ef4444" opacity="0.6" />
          <circle cx="120" cy="100" r="8" fill="#ef4444" opacity="0.6" />
          <circle cx="160" cy="100" r="8" fill="#ef4444" opacity="0.6" />
          
          {/* Status indicator */}
          <rect x="90" y="150" width="60" height="10" rx="5" fill="#ef4444" opacity="0.8" className="animate-pulse" />
        </g>
        
        {/* Robot arms */}
        <g transform="translate(50, 400)">
          {/* Left arm */}
          <rect x="0" y="0" width="60" height="120" rx="10" fill="url(#robotGradient)" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
          <rect x="10" y="10" width="40" height="100" rx="5" fill="#ef4444" opacity="0.3" />
          
          {/* Right arm */}
          <rect x="290" y="0" width="60" height="120" rx="10" fill="url(#robotGradient)" stroke="#ef4444" strokeWidth="2" opacity="0.5" />
          <rect x="300" y="10" width="40" height="100" rx="5" fill="#ef4444" opacity="0.3" />
        </g>
        
        {/* Robot base/legs */}
        <g transform="translate(100, 580)">
          <rect x="0" y="0" width="200" height="150" rx="20" fill="url(#robotGradient)" stroke="#ef4444" strokeWidth="3" opacity="0.6" />
          
          {/* Left leg */}
          <rect x="30" y="80" width="60" height="70" rx="10" fill="#ef4444" opacity="0.4" />
          
          {/* Right leg */}
          <rect x="110" y="80" width="60" height="70" rx="10" fill="#ef4444" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
}

export function TechBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <AnimatedGrid />
      <CircuitLines />
      <FloatingParticles />
      <DataStream />
      <RobotIllustration />
      <CircuitBoard />
    </div>
  );
}

