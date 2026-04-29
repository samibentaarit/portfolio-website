"use client"

import { useRef } from "react"
import { useScroll, motion, useTransform } from "framer-motion"

interface ParallaxTextProps {
  children: string
  baseVelocity: number
}

export function ParallaxText({ children, baseVelocity = 100 }: ParallaxTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()

  // Use useTransform to reverse the scroll direction depending on baseVelocity
  const x = useTransform(scrollYProgress, [0, 1], [0, baseVelocity * 100])

  return (
    <div ref={containerRef} className="overflow-hidden flex flex-nowrap w-full items-center m-0 whitespace-nowrap">
      <motion.div
        className="flex whitespace-nowrap font-black uppercase text-[10vw] leading-none text-transparent"
        style={{
          x,
          WebkitTextStroke: "2px rgba(255, 255, 255, 0.1)",
        }}
      >
        <span className="block mr-10">{children} </span>
        <span className="block mr-10">{children} </span>
        <span className="block mr-10">{children} </span>
        <span className="block mr-10">{children} </span>
      </motion.div>
    </div>
  )
}
