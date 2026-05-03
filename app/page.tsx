"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, type Variants } from "framer-motion"
import { CustomCursor } from "@/components/portfolio-v3/CustomCursor"
import { MagneticButton } from "@/components/portfolio-v3/MagneticButton"
import { ProjectCard } from "@/components/portfolio-v3/ProjectCard"
import { ParallaxText } from "@/components/portfolio-v3/ParallaxText"
import { MouseParticles } from "@/components/portfolio-v3/MouseParticles"
import { GlitchText } from "@/components/portfolio-v3/GlitchText"
import { PetCat } from "@/components/portfolio-v3/PetCat"
import { ArrowRight, ChevronDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"

const IN_VIEW_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
}

const PERSONAS = [
  { id: "professional", label: "professional", img: "/images/sami.webp", desc: "// STATUS: Ready for production. Code reviewed." },
  { id: "sport", label: "sport", img: "/images/sami_sport.webp", desc: "// STATUS: Compiling outdoors. CPU at 85%." },
  { id: "casual", label: "casual", img: "/images/sami_casual.webp", desc: "// STATUS: AFK. Coffee mode engaged." },
  { id: "nurture", label: "nurture", img: "/images/sami_kittens.webp", desc: "// STATUS: System overloaded by cuteness. 3 new background processes detected." 
}
]

export default function PortfolioV3() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const opacityY = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scaleY = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [persona, setPersona] = useState("professional")

  useEffect(() => {
    // Load persisted state
    const saved = localStorage.getItem("portfolio-persona")
    if (saved && PERSONAS.some(p => p.id === saved)) {
      setPersona(saved)
    }

    // Keyboard shortcuts 1-4
    const handleKeyDown = (e: KeyboardEvent) => {
      const num = parseInt(e.key)
      if (num >= 1 && num <= PERSONAS.length) {
        const pId = PERSONAS[num - 1].id
        setPersona(pId)
        localStorage.setItem("portfolio-persona", pId)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handlePersonaChange = (id: string) => {
    setPersona(id)
    localStorage.setItem("portfolio-persona", id)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const experience = [
    {
      id: "hotel-management",
      title: "Hotel Management Web App",
      company: "Tunisie Booking",
      logo: "/logos/tunisiebooking.png",
      period: "March - September 2025",
      description: "End Of Engineering Studies: Centralized hotel operations including reservations, room management, and user access control. Simplified daily administrative workflows for hotel staff through the automation of contract creation and role-based access. Integrated an AI-assisted pricing suggestion feature.",
    },
    {
      id: "school-management",
      title: "School Management Web Application (SaaS)",
      company: "Personal Project",
      logo: "/logos/school-management.png",
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
      logo: "/logos/roam-maze-mobile-app-logo.png",
      period: "May - June 2024",
      description: "Web and mobile application to facilitate communication between school administration and parents. Improved communication and centralized announcements, notifications, and messaging using React, Flutter, Node.js, and MongoDB.",
    },
    {
      id: "bus-schedule-management",
      title: "Bus Schedule Management",
      company: "Les Nouvelles Générations",
      logo: "/logos/private-school-logo-blue.jpg",
      period: "May - June 2023",
      description: "Digitized bus scheduling and route management for school transportation using Spring Boot, Angular, and MySQL.",
    },
    {
      id: "version-management",
      title: "Project Versioning Management",
      company: "BFI Groupe",
      logo: "/logos/bfi-group-corporate-logo.svg",
      period: "January - June 2022",
      description: "Bachelor's Final Project: Centralized project version tracking and artifact management system integrating GitLab and Artifactory APIs using Angular and Spring Boot.",
    }
  ]

  const skillsData = [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Flutter"]
    },
    {
      category: "Backend",
      skills: ["Java", "Spring Boot", "Node.js", "C#", ".NET", "PHP", "Laravel", "Symfony"]
    },
    {
      category: "Database",
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Oracle"]
    },
    {
      category: "DevOps & Cloud",
      skills: ["Docker", "Jenkins", "Azure", "Vercel", "SonarQube", "Grafana", "CI/CD"]
    },
    {
      category: "Architecture",
      skills: ["Multi-tenancy", "RBAC", "WebSockets", "SaaS architecture"]
    }
  ]

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen text-white font-sans overflow-hidden cursor-none selection:bg-primary/30">
      <CustomCursor />
      <MouseParticles />
      <PetCat />
      
      {/* Dynamic glow background following cursor */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-radial from-[rgba(6,182,212,0.1)] to-transparent to-80% opacity-50"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(6,182,212,0.15), transparent 80%)`
          )
        }}
      />
      
      {/* Animated grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Hero Section */}
      <motion.section 
        className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 pt-20 pb-32"
        style={{ opacity: opacityY, scale: scaleY }}
      >
        <div className="absolute top-8 left-8 z-50 font-black text-2xl tracking-tighter mix-blend-difference text-white">
          SB<span className="text-primary">.</span>
        </div>
        
        <div className="absolute top-8 right-8 flex gap-4 z-50">
          <a href="https://github.com/samibentaarit" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors mix-blend-difference"><Github /></a>
          <a href="https://www.linkedin.com/in/samy-bentaarit-4a4016222/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary transition-colors mix-blend-difference"><Linkedin /></a>
        </div>

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start text-left z-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-1 w-12 bg-primary rounded-full" />
              <span className="font-mono text-primary uppercase tracking-widest text-lm lg:text-xl">Sami Ben Taarit — Software Engineer</span>
            </motion.div>

            <div className="overflow-hidden mb-2 -ml-1">
              <motion.div 
                initial={{ y: "100%", rotate: 2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
              >
                <GlitchText text="SOFTWARE" className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter leading-none block" />
              </motion.div>
            </div>
            <div className="overflow-hidden mb-6 -ml-1">
              <motion.div 
                initial={{ y: "100%", rotate: -2 }}
                animate={{ y: "0%", rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              >
                <GlitchText 
                  text="ENGINEER" 
                  className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter leading-none text-emerald-400 block" 
                />
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-gray-300 font-light max-w-xl leading-relaxed"
            >
              I build applications that live right at the intersection of beautiful design and robust architecture. I actually care about how users interact with the front-end just as much as the reliability of the back-end powering it.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 lg:mt-14"
            >
              <a href="#projects" className="group relative inline-block">
                <div className="absolute -inset-2 bg-linear-to-r from-primary to-emerald-500 rounded-full opacity-40 group-hover:opacity-60 blur-md transition-opacity duration-300 animate-pulse"></div>
                <MagneticButton className="relative px-8 lg:px-10 py-4 lg:py-5 bg-white text-black hover:bg-gray-100 rounded-full font-black text-base lg:text-lg flex flex-row items-center justify-center whitespace-nowrap flex-nowrap! gap-3 transition-colors shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] w-auto">
                  <span className="shrink-0 leading-none">See My Work</span>
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform shrink-0" />
                </MagneticButton>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex relative h-150 lg:h-150 w-full mt-10 lg:mt-0 order-first lg:order-last justify-center items-center"
          >
            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-emerald-500/20 mix-blend-overlay rounded-3xl blur-3xl opacity-50" />
            
            {/* Image Container */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden mask-[linear-gradient(to_bottom,black_60%,transparent_100%)] group/img cursor-pointer" tabIndex={0}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={persona}
                  src={PERSONAS.find(p => p.id === persona)?.img}
                  alt={`Sami's ${persona} persona`}
                  initial={{ opacity: 0, scale: 1.02, filter: "blur(2px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(2px)" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover/img:grayscale-0 group-active/img:grayscale-0 group-focus/img:grayscale-0 transition-all duration-500"
                />
              </AnimatePresence>
              <div className="absolute inset-0 mix-blend-color bg-linear-to-tr from-gray-500/20 to-emerald-500/20 transition-opacity duration-500 opacity-100 group-hover/img:opacity-0 group-active/img:opacity-0 group-focus/img:opacity-0 pointer-events-none" />
            </div>

            {/* Persona Switcher Terminal */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-xl p-3 md:p-4 border border-white/10 flex flex-col gap-2 md:gap-3 z-30 shadow-2xl">
              <div className="flex gap-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] md:text-sm">
                {PERSONAS.map((p, i) => (
                  <button 
                    key={p.id}
                    onClick={() => handlePersonaChange(p.id)}
                    className={`px-2 py-1 rounded transition-colors ${persona === p.id ? 'bg-primary/20 text-primary' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    <span className="hidden md:inline mr-1 opacity-50">{i+1}</span>./me --mode={p.label}
                  </button>
                ))}
              </div>
              <div className="text-primary font-mono text-[10px] md:text-xs mt-1 border-t border-white/10 pt-2">
                {PERSONAS.find(p => p.id === persona)?.desc}
              </div>
            </div>

            {/* Geometric accents */}
            <div className="absolute -top-6 -right-6 w-16 h-16 lg:w-24 lg:h-24 border-t-2 border-r-2 border-primary/50 text-white z-20" />
            <div className="absolute -bottom-6 -left-6 w-16 h-16 lg:w-24 lg:h-24 border-b-2 border-l-2 border-emerald-400/50 text-white z-20" />
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
      <section className="relative z-10 py-12 md:py-18 lg:py-23 overflow-hidden bg-white/5 border-y border-white/10 backdrop-blur-sm -skew-y-3 shadow-[0_0_50px_rgba(6,182,212,0.1)]">
        <ParallaxText baseVelocity={5}>MOBILE/WEB DEVELOPER - DEVOPS - DATABASE</ParallaxText>
        <ParallaxText baseVelocity={-5}>FULL STACK - ARCHITECTURE - CLOUD - AI -</ParallaxText>
      </section>

      {/* Outside the IDE Section */}
      <section className="relative z-10 py-23 px-6" id="outside-ide">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4"><span className="text-primary">.</span>OUTSIDE THE IDE</h2>
                <div className="w-24 h-1 bg-linear-to-r from-primary to-transparent" />
            <p className="text-gray-400 text-lg md:text-xl font-light mt-6 max-w-2xl">
              Software engineering happens behind a screen, but consistency is built away from it. Finding balance, discipline, and inspiration in life.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              tabIndex={0}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileFocus={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white p-4 pb-12 rounded-lg shadow-xl relative group cursor-pointer"
            >
              <div className="aspect-square bg-gray-200 w-full rounded overflow-hidden">
                <img src="/images/sami_jbal.webp" alt="Discipline" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-focus:grayscale-0 group-active:grayscale-0 transition-all" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-black text-sm font-bold">
                // system.uptime()
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              tabIndex={0}
              initial={{ opacity: 0, y: 30, rotate: 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileFocus={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white p-4 pb-12 rounded-lg shadow-xl relative group cursor-pointer"
            >
              <div className="aspect-square bg-gray-200 w-full rounded overflow-hidden">
                <img src="/images/sami_hani.webp" alt="Balance" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-focus:grayscale-0 group-active:grayscale-0 transition-all" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-black text-sm font-bold">
                // memory.recharge()
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              tabIndex={0}
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1 }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileTap={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              whileFocus={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-white p-4 pb-12 rounded-lg shadow-xl relative group cursor-pointer"
            >
              <div className="aspect-square bg-gray-200 w-full rounded overflow-hidden">
                <img src="/images/medal.webp" alt="Focus" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-focus:grayscale-0 group-active:grayscale-0 transition-all" />
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center font-mono text-black text-sm font-bold">
                // focus.lock()
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative z-10 py-23 px-6" id="projects">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-4"><span className="text-primary">.</span>EXPERIENCE</h2>
            <div className="w-24 h-1 bg-linear-to-r from-primary to-transparent" />
          </motion.div>

          <div className="space-y-16">
            {experience.map((job, idx) => (
              <ProjectCard key={idx} {...job} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section with Categories */}
      <section className="relative z-10 py-23 px-6 bg-black/50 backdrop-blur-2xl border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={IN_VIEW_VARIANTS}
            className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-8 items-end"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-4"><span className="text-primary">.</span>SKILLS</h2>
              <div className="w-24 h-1 bg-linear-to-r from-primary to-transparent" />
            </div>
            <p className="text-gray-400 text-lg md:text-xl font-light mb-4 md:text-right">
              Tools and technologies I use to bring ideas to life. From front-end polish to scalable back-end infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((group, gIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gIdx * 0.1 }}
                className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="absolute inset-0 bg-linear-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-primary transition-colors relative z-10">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2 relative z-10 mt-auto">
                  {group.skills.map((skill, sIdx) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-gray-300 hover:text-white transition-all font-mono text-sm cursor-default hover:bg-white/10 hover:border-white/40"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Languages Section */}
      <section className="relative z-10 py-23 px-6 bg-white/5 border-y border-white/10 backdrop-blur-md">
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
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full left-[-6.5px] top-2" />
                <h4 className="text-xl font-bold">Engineering Degree in Web Development</h4>
                <p className="text-gray-400">ESPRIT, Tunis</p>
                <span className="text-sm font-mono text-emerald-400/80">2022 – 2025</span>
              </div>
              <div className="relative pl-6 border-l border-white/20">
                <div className="absolute w-3 h-3 bg-emerald-400 rounded-full left-[-6.5px] top-2" />
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
                      className="h-full bg-linear-to-r from-primary to-emerald-400"
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
      <section className="relative z-10 py-23 px-6 min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
           initial="hidden"
           whileInView="show"
           viewport={{ once: true }}
           variants={IN_VIEW_VARIANTS}
           className="text-center"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-8">LET'S <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-emerald-400">TALK</span></h2>
          <p className="font-mono text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            <span className="text-primary">{">"}</span> ./me --mode=available<br/>
            <span className="text-emerald-400">// STATUS: Open to work. Response time &lt; 24h.</span>
          </p>
          <MagneticButton className="bg-white text-black px-6 md:px-12 py-5 md:py-6 rounded-full text-base md:text-xl font-bold flex flex-row items-center justify-center whitespace-nowrap flex-nowrap! gap-3 md:gap-4 mx-auto w-auto" onClick={() => window.location.href = "mailto:sbentaarit@gmail.com"}>
            <Mail size={24} className="shrink-0" /> 
            <span className="shrink-0 leading-none"> sbentaarit@gmail.com</span>
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
