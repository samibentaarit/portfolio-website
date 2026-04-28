"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { CustomCursor } from "@/components/portfolio-v3/CustomCursor"
import { MagneticButton } from "@/components/portfolio-v3/MagneticButton"
import { ProjectCard } from "@/components/portfolio-v3/ProjectCard"
import { ParallaxText } from "@/components/portfolio-v3/ParallaxText"
import { MouseParticles } from "@/components/portfolio-v3/MouseParticles"
import { GlitchText } from "@/components/portfolio-v3/GlitchText"
import { PetCat } from "@/components/portfolio-v3/PetCat"
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { projects } from "@/lib/projects-data"

const IN_VIEW_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

export default function PortfolioV3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const opacityY = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scaleY = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const experience = [
    {
      id: "hotel-management",
      title: "Hotel Management Web App",
      company: "Tunisie Booking",
      logo: "/images/image.png",
      period: "March - September 2025",
      description: "End Of Engineering Studies: Centralized hotel operations including reservations, room management, and user access control. Simplified daily administrative workflows for hotel staff through the automation of contract creation and role-based access. Integrated an AI-assisted pricing suggestion feature.",
    },
    {
      id: "school-management",
      title: "School Management Web Application (SaaS)",
      company: "Personal Project",
      logo: "/placeholder-logo.png",
      period: "2026",
      description: "Design and development of a full-featured multi-tenant school management platform covering attendance, timetables, work hours, grades, events, and enrollments. Engineered a secure, scalable architecture with role-based access (RBAC) and real-time communication via WebSockets using Laravel 12, Next.js 16, and PostgreSQL hosted on Azure and Neon.",
    },
    {
      id: "pablo-card-game",
      title: "Pablo — Multiplayer Online Card Game",
      company: "Personal Project",
      logo: "/placeholder-logo.png",
      period: "2026",
      description: "Real-time multiplayer card game built with an authoritative server architecture. Implemented a deterministic game engine to guarantee rule consistency using TypeScript, React, Node.js, and Socket.IO. Handles lobbies, turns, special card effects, and round progression.",
    },
    {
      id: "roam-maze",
      title: "ROAM MAZE",
      company: "Summer Internship",
      logo: "/roam-maze-mobile-app-logo.jpg",
      period: "May - June 2024",
      description: "Web and mobile application to facilitate communication between school administration and parents. Improved communication and centralized announcements, notifications, and messaging using React, Flutter, Node.js, and MongoDB.",
    },
    {
      id: "bus-schedule-management",
      title: "Bus Schedule Management",
      company: "Les Nouvelles Générations",
      logo: "/private-school-logo-blue.jpg",
      period: "May - June 2023",
      description: "Digitized bus scheduling and route management for school transportation using Spring Boot, Angular, and MySQL.",
    },
    {
      id: "version-management",
      title: "Project Versioning Management",
      company: "BFI Groupe",
      logo: "/bfi-group-corporate-logo.jpg",
      period: "January - June 2022",
      description: "Bachelor's Final Project: Centralized project version tracking and artifact management system integrating GitLab and Artifactory APIs using Angular and Spring Boot.",
    }
  ]

  const skills = [
    "Java", "C#", "PHP", "JavaScript", "TypeScript", 
    "Laravel", "Spring Boot", "Angular", "Next.js", "React", "Flutter", "Node.js", "Symfony", ".NET",
    "PostgreSQL", "MySQL", "MongoDB", "Oracle",
    "Docker", "Jenkins", "Azure", "Vercel", "SonarQube", "Grafana", "Nexus",
    "Multi-tenancy", "RBAC", "WebSockets", "CI/CD", "SaaS architecture"
  ]

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen text-white font-sans overflow-hidden cursor-none selection:bg-primary/30">
      <CustomCursor />
      <MouseParticles />
      <PetCat />
      
      {/* Dynamic glow background following cursor */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x)_var(--mouse-y),rgba(6,182,212,0.1),transparent_80%)] opacity-50"
        style={{ ["--mouse-x" as any]: `${mousePos.x}px`, ["--mouse-y" as any]: `${mousePos.y}px` }}
      />
      
      {/* Animated grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Hero Section */}
      <motion.section 
        className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 pt-20 pb-32"
        style={{ opacity: opacityY, scale: scaleY }}
      >
        <div className="absolute top-8 right-8 flex gap-4 z-50">
          <a href="https://github.com/samibentaarit" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors mix-blend-difference"><Github /></a>
          <a href="https://www.linkedin.com/in/samy-bentaarit-4a4016222/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors mix-blend-difference"><Linkedin /></a>
        </div>

        <div className="max-w-5xl mx-auto w-full text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="relative mx-auto w-56 h-56 md:w-64 md:h-64 rounded-full ring-1 ring-primary/30 ring-offset-4 ring-offset-black">
              <div className="absolute inset-0 rounded-full animate-[spin_4s_linear_infinite] bg-gradient-to-tr from-primary to-emerald-500 opacity-20 blur-xl" />
              <img
                src={isGlitching ? "/professional-software-engineer-male-portrait2.jpg" : "/professional-software-engineer-male-portrait.jpg"}
                alt="Sami Ben Taarit"
                className={`w-full h-full object-cover rounded-full filter grayscale transition-all duration-300 relative z-10 ${
                  isGlitching ? "brightness-150 scale-105" : "hover:grayscale-0"
                }`}
              />
            </div>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-3xl md:text-5xl font-bold tracking-tight mt-6"
            >
              SAMI BENTAARIT
            </motion.h2>
          </motion.div>

          <div className="overflow-hidden">
            <motion.div 
              initial={{ y: "100%", rotate: 5 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            >
              <GlitchText text="SOFTWARE" className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none mb-4 block" />
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div 
              initial={{ y: "100%", rotate: -5 }}
              animate={{ y: "0%", rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            >
              <GlitchText 
                text="ENGINEER" 
                className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none text-emerald-400 block" 
                onGlitchChange={setIsGlitching}
              />
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-xl md:text-2xl text-gray-400 font-light max-w-2xl text-center"
          >
            Web Development Engineer specializing in React, Next.js, Spring Boot, and DevOps. Let's build the future together.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-12 flex gap-6"
          >
             <MagneticButton className="px-8 py-4 bg-primary text-black rounded-full font-bold flex items-center gap-2">
                <span>View Projects</span>
                <ArrowRight size={20} />
             </MagneticButton>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-10"
        >
           <ChevronDown size={32} className="text-white/30" />
        </motion.div>
      </motion.section>

      {/* Marquee Section */}
      <section className="relative z-10 py-20 overflow-hidden bg-white/5 border-y border-white/10 backdrop-blur-sm -skew-y-3 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <ParallaxText baseVelocity={5}>NEXT.JS - SPRING BOOT - AZURE - DEVOPS -</ParallaxText>
        <ParallaxText baseVelocity={-5}>FULL STACK - ARCHITECTURE - CLOUD - AI -</ParallaxText>
      </section>

      {/* Experience Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4"><span className="text-primary">.</span>EXPERIENCE</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
          </motion.div>

          <div className="space-y-16">
            {experience.map((job, idx) => (
              <ProjectCard key={idx} {...job} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Staggered Fade */}
      <section className="relative z-10 py-32 px-6 bg-black/50 backdrop-blur-2xl border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
            className="mb-20 text-right"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4">SKILLS<span className="text-primary">.</span></h2>
            <div className="w-24 h-1 bg-gradient-to-l from-primary to-transparent ml-auto" />
          </motion.div>

          <div className="flex flex-wrap justify-center xl:justify-end gap-4">
            {skills.map((skill, idx) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-primary/20 hover:border-primary/50 transition-all font-mono text-lg cursor-default">
                  {skill}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Languages Section */}
      <section className="relative z-10 py-32 px-6 bg-white/5 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
          >
            <h3 className="text-4xl font-black mb-8">EDUCATION<span className="text-emerald-400">.</span></h3>
            <div className="space-y-8">
              <div className="relative pl-6 border-l border-white/20">
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -left-[6.5px] top-2" />
                <h4 className="text-xl font-bold">Engineering Degree in Web Development</h4>
                <p className="text-gray-400">ESPRIT, Tunis</p>
                <span className="text-sm font-mono text-emerald-400/80">2022 – 2025</span>
              </div>
              <div className="relative pl-6 border-l border-white/20">
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full -left-[6.5px] top-2" />
                <h4 className="text-xl font-bold">Bachelor's Degree in IS Development</h4>
                <p className="text-gray-400">ISET Djerba</p>
                <span className="text-sm font-mono text-emerald-400/80">2019 – 2022</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
          >
            <h3 className="text-4xl font-black mb-8">LANGUAGES<span className="text-emerald-400">.</span></h3>
            <div className="space-y-6">
              {[
                { lang: "Arabic", level: "Native", percent: 100 },
                { lang: "French", level: "B2", percent: 75 },
                { lang: "English", level: "B2", percent: 75 }
              ].map((l, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{l.lang}</span>
                    <span className="text-primary font-mono text-sm">{l.level}</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-emerald-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${l.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer / Contact */}
      <section className="relative z-10 py-32 px-6 min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           variants={IN_VIEW_VARIANTS}
           className="text-center"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-8">LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">TALK</span></h2>
          <p className="text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
            Ready to create something amazing? Reach out to discuss your next project.
          </p>
          <MagneticButton className="bg-white text-black px-12 py-6 rounded-full text-xl font-bold flex items-center gap-4 mx-auto" onClick={() => window.location.href = "mailto:sbentaarit@gmail.com"}>
            <Mail size={24} />
            <span>sbentaarit@gmail.com</span>
          </MagneticButton>
        </motion.div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-between px-12 text-sm text-gray-500 font-mono z-50 pointer-events-auto">
          <div>© 2026 Sami Ben Taarit</div>
          <div className="flex gap-6">
            <a href="https://linkedin.com/in/samy-bentaarit" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase tooltip-trigger">LinkedIn</a>
            <a href="https://github.com/samibentaarit" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors uppercase tooltip-trigger">GitHub</a>
          </div>
        </div>
      </section>
    </div>
  )
}
