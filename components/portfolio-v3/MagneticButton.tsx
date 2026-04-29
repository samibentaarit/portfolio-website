"use client"

import React, { useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton = ({ children, className = "", onClick }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e
    if (!buttonRef.current) return
    const { height, width, left, top } = buttonRef.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-flex overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${className}`}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#10b981_50%,#06b6d4_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-8 py-3 text-sm font-medium text-foreground backdrop-blur-3xl transition-colors tracking-tight focus:bg-background/80 hover:bg-background/80">
        <motion.span
          className="flex flex-row items-center justify-center whitespace-nowrap"
          animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
          {children}
        </motion.span>
      </span>
    </motion.button>
  )
}
