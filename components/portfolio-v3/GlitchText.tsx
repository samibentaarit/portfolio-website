"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function GlitchText({ text, className = "", onGlitchChange }: { text: string; className?: string; onGlitchChange?: (isGlitching: boolean) => void }) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        setIsGlitching(true)
        if (onGlitchChange) onGlitchChange(true)
        setTimeout(() => {
          setIsGlitching(false)
          if (onGlitchChange) onGlitchChange(false)
        }, 200 + Math.random() * 300)
      }
    }, 2000)
    return () => clearInterval(glitchInterval)
  }, [onGlitchChange])

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-[2px] z-0 text-red-500 opacity-70 mix-blend-screen"
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -3, 3, 0] }}
            transition={{ duration: 0.2, repeat: Infinity }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute -top-[1px] -left-[2px] z-0 text-cyan-500 opacity-70 mix-blend-screen"
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 3, -3, 0] }}
            transition={{ duration: 0.15, repeat: Infinity, delay: 0.05 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-[1px] left-0 z-0 text-green-500 opacity-50 mix-blend-screen"
            initial={{ x: 0 }}
            animate={{ x: [-1, 1, -2, 2, 0] }}
            transition={{ duration: 0.25, repeat: Infinity, delay: 0.1 }}
          >
            {text}
          </motion.span>
          
          {/* Slices for true glitch look */}
          <div className="absolute inset-0 z-20 w-full h-full overflow-hidden mix-blend-overlay">
            <motion.div
               className="w-full bg-white opacity-20"
               initial={{ height: 2, y: 0 }}
               animate={{ y: [0, 40, 10, 80, 0] }}
               transition={{ duration: 0.3, ease: "linear" }}
            />
          </div>
        </>
      )}
    </div>
  )
}
