"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const PHRASES = [
  "Meow! Let's deploy this!",
  "Hi, I'm Houriya 🐾",
  "I push to prod… carefully 😼",
  "99 bugs in the code, I caught one!",
  "Purr-gramming is my passion.",
  "I nap… then I debug.",
  "Need a dev? Houriya approves Sami.",
  "I write clean code, unlike my fur.",
  "Git commit -m 'meow fix'",
  "I chase bugs faster than QA.",
  "Zero errors, just purrfection.",
  "Frontend? Backend? I sit on both.",
  "If it works, I was here 🐾",
  "Refactoring? I call it grooming.",
  "I don`t crash… I just nap mid-process."
];

export function PetCat() {
  const { scrollYProgress } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentPhrase, setCurrentPhrase] = useState(PHRASES[0]);
  const [catYMax, setCatYMax] = useState(600);
  const [isClient, setIsClient] = useState(false);
  const [isMobileHovered, setIsMobileHovered] = useState(false);

  // Only run window-dependent code on client
  useEffect(() => {
    setIsClient(true);
    if (globalThis.window !== undefined) {
      setCatYMax(globalThis.window.innerHeight - 150);
    }
  }, []);

  const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const catY = useTransform(springScroll, [0, 1], [40, catYMax]);

  useEffect(() => {
    if (globalThis.window === undefined) return;
    setMousePos({ x: globalThis.window.innerWidth / 2, y: globalThis.window.innerHeight / 2 });
    const mm = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const mt = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    globalThis.window.addEventListener("mousemove", mm);
    globalThis.window.addEventListener("touchmove", mt, { passive: true });
    globalThis.window.addEventListener("touchstart", mt, { passive: true });
    return () => {
      globalThis.window.removeEventListener("mousemove", mm);
      globalThis.window.removeEventListener("touchmove", mt);
      globalThis.window.removeEventListener("touchstart", mt);
    }
  }, []);

  const handleHover = () => {
    const nextPhase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setCurrentPhrase(nextPhase);
  };

  // Eyes follow mouse only on client
  const leftEyeOffset = { x: 0, y: 0 };
  const rightEyeOffset = { x: 0, y: 0 };
  let catCenterX = 0;
  let catCenterY = 0;
  
  if (isClient && globalThis.window !== undefined) {
    catCenterX = globalThis.window.innerWidth < 768 ? 32 + 40 : 64 + 40;
    catCenterY = (typeof catY.get === "function" ? catY.get() : 40) + 40;
    const dx = mousePos.x - catCenterX;
    const dy = mousePos.y - catCenterY;
    const maxOffset = 4;
    const distance = Math.min(maxOffset, Math.hypot(dx, dy) * 0.015);
    const angle = Math.atan2(dy, dx);
    leftEyeOffset.x = Math.cos(angle) * distance;
    leftEyeOffset.y = Math.sin(angle) * distance;
    rightEyeOffset.x = leftEyeOffset.x;
    rightEyeOffset.y = leftEyeOffset.y;
  }

  // Check if cursor is near the cat for mobile hover
  useEffect(() => {
    if (isClient && globalThis.window !== undefined) {
      const dx = mousePos.x - catCenterX;
      const dy = mousePos.y - catCenterY;
      const distance = Math.hypot(dx, dy);
      if (distance < 50) {
        if (!isMobileHovered) {
          setIsMobileHovered(true);
          handleHover();
        }
      } else {
        setIsMobileHovered(false);
      }
    }
  }, [mousePos, catCenterX, catCenterY, isClient]);

  const handleClick = (e?: React.MouseEvent | React.TouchEvent) => {
    // Prevent default scrolling on touch and just trigger phrase change
    if (e && typeof (e as any).preventDefault === "function") (e as any).preventDefault()
    const nextPhase = PHRASES[Math.floor(Math.random() * PHRASES.length)];
    setCurrentPhrase(nextPhase);
  };

  return (
    <motion.div
      className="fixed left-8 md:left-16 z-40 flex flex-col items-center w-20 group"
      style={{ y: catY }}
    >
      <div className={`absolute bottom-full left-0 mb-2 text-xs font-mono font-bold text-black bg-white px-4 py-2 rounded-2xl transition-all transform origin-bottom-left whitespace-nowrap pointer-events-none drop-shadow-md ${isMobileHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"}`}>
        {currentPhrase}
        <div className="absolute -bottom-1 left-8 w-3 h-3 bg-white rotate-45" />
      </div>
      <motion.div
        className="cursor-pointer pointer-events-auto touch-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={handleHover}
        onClick={handleClick}
        onTouchStart={(e) => handleClick(e)}
      >
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cat Body */}
        <path d="M20 50C20 30 80 30 80 50C80 80 60 90 50 90C40 90 20 80 20 50Z" fill="#1f2937" />
        
        {/* Cat Ears */}
        <path d="M20 50L15 20L40 35" fill="#1f2937" />
        <path d="M80 50L85 20L60 35" fill="#1f2937" />
        
        {/* Inner Ears */}
        <path d="M22 45L19 25L35 36" fill="#f472b6" />
        <path d="M78 45L81 25L65 36" fill="#f472b6" />
        
        {/* Eyes (sockets) */}
        <circle cx="35" cy="55" r="8" fill="#fff" />
        <circle cx="65" cy="55" r="8" fill="#fff" />
        
        {/* Pupils (dynamic) */}
        <motion.circle 
          cx="35" cy="55" r="4" fill="#000" 
          animate={{ x: leftEyeOffset.x, y: leftEyeOffset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <motion.circle 
          cx="65" cy="55" r="4" fill="#000" 
          animate={{ x: rightEyeOffset.x, y: rightEyeOffset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        
        {/* Nose */}
        <path d="M47 65L50 68L53 65" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Whiskers */}
        <path d="M15 60L25 62" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 65L25 65" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 70L25 68" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
        
        <path d="M85 60L75 62" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M90 65L75 65" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M85 70L75 68" stroke="#4b5563" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      </motion.div>
    </motion.div>
  )
}
