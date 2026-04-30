"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 30, stiffness: 600, mass: 0.5 };
  const borderConfig = { damping: 50, stiffness: 1000, mass: 0.1 };
  
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const borderX = useSpring(mouseX, borderConfig);
  const borderY = useSpring(mouseY, borderConfig);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "A" ||
        target.tagName.toLowerCase() === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovered ? 2.5 : 1,
          opacity: isHovered ? 0.5 : 1,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary rounded-full pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: borderX,
          y: borderY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0 : 0.5,
        }}
      />
    </>
  );
};
