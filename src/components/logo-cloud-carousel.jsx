"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useTheme } from "next-themes";
import { useIsMobile } from "../hooks/use-mobile"; // Ensure this path is correct

/**
 * LogoCloudCarousel Component
 * Cleaned of TypeScript interfaces for .jsx compatibility
 */
export function LogoCloudCarousel({ logos }) {
  const { resolvedTheme } = useTheme();
  const isMobile = useIsMobile();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div className="w-full py-20 overflow-hidden bg-[#050505]">
      <div className="container mx-auto" ref={containerRef}>
        <div className="relative">
          {/* Gradient Fades for a "Nebula" transition feel */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />

          <MarqueeRow
            direction="left"
            speed={40}
            logos={logos}
            isMobile={isMobile}
          />

          <MarqueeRow
            direction="right"
            speed={40}
            logos={logos}
            isMobile={isMobile}
            className="mt-8"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Internal MarqueeRow Component
 */
function MarqueeRow({
  direction,
  speed,
  logos,
  isMobile,
  className = "",
}) {
  const duplicatedLogos = [...logos, ...logos, ...logos]; // Triple for smoother loops
  const translateValue = isMobile ? "100%" : "33.33%";

  return (
    <motion.div
      className={`flex space-x-8 ${className}`}
      initial={{ x: direction === "left" ? 0 : `-${translateValue}` }}
      animate={{ x: direction === "left" ? `-${translateValue}` : 0 }}
      transition={{
        repeat: Infinity,
        duration: speed,
        ease: "linear",
      }}
    >
      {duplicatedLogos.map((logo, index) => (
        <motion.div
          key={`${direction}-${index}`}
          className="flex-shrink-0 flex items-center justify-center h-20 w-40 rounded-xl bg-white/5 backdrop-blur-md border border-white/10"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(99, 102, 241, 0.5)", // Indigo glow on hover
          }}
        >
          <img
            src={logo.url}
            alt={logo.name}
            className="max-h-10 max-w-[80%] object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}