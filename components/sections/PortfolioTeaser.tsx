"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";

const adReels = [
  {
    id: 1,
    title: "Brand Campaign Reel",
    video: "/reels/analyzed_video_video_a6939c7c990b41f8b79d43e76092d33a_a6939c7c990b41f8b79d43e76092d33a_origin.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
  {
    id: 2,
    title: "Social Media Campaign",
    video: "/reels/analyzed_video_video_13dad07ed68f43fa87299ed8e6504a78_13dad07ed68f43fa87299ed8e6504a78_origin.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
  {
    id: 3,
    title: "Product Launch Ad",
    video: "/reels/57119-483011616_tiny.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
  {
    id: 4,
    title: "Influencer Campaign",
    video: "/reels/analyzed_video_video_a6939c7c990b41f8b79d43e76092d33a_a6939c7c990b41f8b79d43e76092d33a_origin.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
  {
    id: 5,
    title: "Brand Awareness Ad",
    video: "/reels/analyzed_video_video_13dad07ed68f43fa87299ed8e6504a78_13dad07ed68f43fa87299ed8e6504a78_origin.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
  {
    id: 6,
    title: "Conversion Campaign",
    video: "/reels/57119-483011616_tiny.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
  {
    id: 7,
    title: "Digital Strategy Reel",
    video: "/reels/analyzed_video_video_a6939c7c990b41f8b79d43e76092d33a_a6939c7c990b41f8b79d43e76092d33a_origin.mp4",
    thumbnail: "",
    client: "WaitLa Campaign",
  },
];

function ReelCard({ reel, index, isInView }: { reel: typeof adReels[0]; index: number; isInView: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (reel.video.includes("placeholder")) return;
    
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, [reel.video]);

  // Autoplay when in viewport - only for real videos
  useEffect(() => {
    if (reel.video.includes("placeholder")) return;
    
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

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      data-reel-card
      className="flex-shrink-0 w-[300px] sm:w-[400px] lg:w-[500px]"
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative group overflow-hidden bg-gray-900 shadow-lg ring-1 ring-gray-800">
        <div className="aspect-[9/16] relative">
          {reel.video.includes("placeholder") ? (
            // Placeholder for videos not yet added
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/30 flex items-center justify-center">
                  <Play className="h-8 w-8 text-primary ml-1" />
                </div>
                <p className="text-primary font-semibold text-sm">{reel.title}</p>
                <p className="text-gray-500 text-xs mt-2">Coming Soon</p>
              </div>
            </div>
          ) : (
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
          )}
          
          {/* Play/Pause overlay - only for real videos */}
          {!reel.video.includes("placeholder") && (
            <div
              className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              onClick={togglePlay}
            >
              <button
                className="rounded-full bg-white/90 p-4 hover:bg-white transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-8 w-8 text-gray-900" />
                ) : (
                  <Play className="h-8 w-8 text-gray-900 ml-1" />
                )}
              </button>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(true);

  // Infinite scroll effect - duplicate reels for seamless looping
  const duplicatedReels = [...adReels, ...adReels, ...adReels];

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !isScrolling) return;

    // Calculate the width of a single reel (including gap)
    const firstReel = container.querySelector('[data-reel-card]') as HTMLElement;
    if (!firstReel) return;
    
    const reelWidth = firstReel.offsetWidth;
    const singleSetWidth = reelWidth * adReels.length; // Width of one complete set

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const autoScroll = () => {
      if (!isScrolling) {
        requestAnimationFrame(autoScroll);
        return;
      }

      scrollPosition += scrollSpeed;
      container.scrollLeft = scrollPosition;

      // Seamlessly loop: when we've scrolled through one complete set, jump back to start
      // This happens before the user can see the duplicate, creating infinite loop effect
      if (scrollPosition >= singleSetWidth) {
        scrollPosition = scrollPosition - singleSetWidth;
        container.scrollLeft = scrollPosition;
      }

      requestAnimationFrame(autoScroll);
    };

    const animationId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationId);
  }, [isScrolling]);

  // Pause scroll on hover
  const handleMouseEnter = () => setIsScrolling(false);
  const handleMouseLeave = () => setIsScrolling(true);

  return (
    <section ref={ref} className="bg-gradient-to-r from-primary-dark via-primary to-accent-dark">
      {/* Infinite horizontal scrolling gallery - full width, no padding */}
      <div className="w-full">
        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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


