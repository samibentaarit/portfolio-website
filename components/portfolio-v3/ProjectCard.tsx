"use client"

import React, { useRef } from "react"
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ExternalLink } from "lucide-react"

import Link from "next/link"

interface ProjectProps {
  id?: string
  title: string
  company: string
  period: string
  description: string
  logo: string
  index: number
}

export function ProjectCard({ id, title, company, period, description, logo, index }: Readonly<ProjectProps>) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md transform-gpu"
    >
      <div 
        className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
        style={{ transform: "translateZ(-50px)" }} 
      />

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo || "/placeholder.svg"} alt={company} className="h-12 w-12 rounded-full object-cover shadow-xl grayscale filter hover:grayscale-0 transition duration-500" />
            <div>
              <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-sm text-primary/80 font-mono">{company} • {period}</p>
            </div>
          </div>
          <Link href={id ? `/projects/${id}` : "/projects/"} passHref legacyBehavior>
            <a
              href={id ? `/projects/${id}` : "/projects/"}
              className="flex items-center justify-center gap-2 px-4 py-2 mt-4 sm:mt-0 rounded-full bg-white/10 hover:bg-primary hover:text-black text-white transition-colors group/link"
            >
              <span className="text-sm font-bold whitespace-nowrap">View Details</span>
              <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} style={{ display: 'flex' }}>
                <ExternalLink size={18} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </motion.span>
            </a>
          </Link>
        </div>

        <p className="text-gray-400 font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
