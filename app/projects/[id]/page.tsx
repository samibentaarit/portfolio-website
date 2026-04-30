"use client"

import { useEffect, useRef, use } from "react"
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"

import { CustomCursor } from "@/components/portfolio-v3/CustomCursor"
import { MouseParticles } from "@/components/portfolio-v3/MouseParticles"
import { GlitchText } from "@/components/portfolio-v3/GlitchText"
import { MagneticButton } from "@/components/portfolio-v3/MagneticButton"

// We can extend this logic to fetch true data if we want.
// For now, we mock the extended fields with the user's data to replicate the layout.
const PROJECTS_DB: Record<string, any> = {
  "hotel-management": {
    title: "Hotel Management Web App",
    shortDescription: "End Of Engineering Studies @ Tunisie Booking",
    fullDescription: "Centralized hotel operations including reservations, room management, and user access control. Simplified daily administrative workflows for hotel staff through the automation of contract creation and role-based access. Integrated an AI-assisted pricing suggestion feature.",
    tech: ["Laravel", "Next.js", "MySQL", "Azure", "Vercel"],
    skillsAcquired: ["Full-stack development", "Cloud Infrastructure (Azure)", "Role-based access control", "AI/ML Integration"],
    screenshots: ["/images/image.png", "/placeholder-logo.png"],
    live: "https://front-end-updated-lemon.vercel.app/",
    github: "https://github.com/samibentaarit/hotel-management",
  },
  "school-management": {
    title: "School Management Web Application",
    shortDescription: "Multi-Tenant SaaS Platform",
    fullDescription: "Design and development of a full-featured multi-tenant school management platform covering attendance, timetables, work hours, grades, events, and enrollments. Engineered a secure, scalable architecture with role-based access (RBAC) and real-time communication via WebSockets.",
    tech: ["Laravel 12", "Next.js 16", "PostgreSQL", "Azure", "Neon", "WebSockets"],
    skillsAcquired: ["SaaS Architecture", "Multi-tenancy", "RBAC", "JWT authentication", "Real-time communication"],
    screenshots: ["/placeholder.svg", "/placeholder.svg"],
    live: "https://school-management-frontend-ashen.vercel.app",
    github: "https://github.com/samibentaarit/school-management",
  },
  "pablo-card-game": {
    title: "Pablo — Multiplayer Online Card Game",
    shortDescription: "Real-time multiplayer card game built with an authoritative server architecture.",
    fullDescription: "Implemented a deterministic game engine to guarantee rule consistency using TypeScript, React, Node.js, and Socket.IO. Handles lobbies, turns, special card effects, and round progression.",
    tech: ["TypeScript", "React", "Node.js", "Socket.IO", "Express", "Vite"],
    skillsAcquired: ["Authoritative server architecture", "Deterministic engine", "WebSocket networking", "Real-time state sync"],
    screenshots: ["/placeholder.svg", "/placeholder.svg"],
    live: "https://pablo-sable-beta.vercel.app",
    github: "https://github.com/samibentaarit/pablo",
  },
  "roam-maze": {
    title: "ROAM MAZE",
    shortDescription: "Web and mobile application to facilitate communication between school administration and parents.",
    fullDescription: "Summer Internship project. Improved communication and centralized announcements, notifications, and messaging using React, Flutter, Node.js, and MongoDB.",
    tech: ["React", "Flutter", "Node.js", "MongoDB"],
    skillsAcquired: ["Mobile App Development", "Cross-Platform UI", "REST API Development", "NoSQL Database Integration"],
    screenshots: ["/roam-maze-mobile-app-logo.jpg", "/placeholder.svg"],
    live: "https://roam-maze.vercel.app",
    github: "https://github.com/samibentaarit/roam-maze",
  },
  "bus-schedule-management": {
    title: "Bus Schedule Management",
    shortDescription: "Digitized bus scheduling and route management for school transportation.",
    fullDescription: "Developed for Les Nouvelles Générations. Allows administration to manage bus routes, schedules, and driver assignments while providing parents with real-time updates.",
    tech: ["Spring Boot", "Angular", "MySQL"],
    skillsAcquired: ["Enterprise Java", "Angular Frontend Design", "Geospatial Routing Concepts", "Relational DB Architecture"],
    screenshots: ["/private-school-logo-blue.jpg", "/placeholder.svg"],
    live: "https://bus-schedule.vercel.app",
    github: "https://github.com/samibentaarit/bus-schedule",
  },
  "version-management": {
    title: "Project Versioning Management",
    shortDescription: "Bachelor's Final Project: Centralized project version tracking",
    fullDescription: "Created at BFI Groupe. A centralized project version tracking and artifact management system integrating GitLab and Artifactory APIs.",
    tech: ["Angular", "Spring Boot", "GitLab API", "Artifactory"],
    skillsAcquired: ["API Integrations", "DevOps Pipelines", "System Architecture", "Continuous Integration"],
    screenshots: ["/bfi-group-corporate-logo.jpg", "/placeholder.svg"],
    live: "#",
    github: "https://github.com/samibentaarit",
  }
}

const PROJECTS_LIST = [
  "hotel-management",
  "school-management",
  "pablo-card-game",
  "roam-maze",
  "bus-schedule-management",
  "version-management"
]

export default function ProjectDetailV3({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const projectId = resolvedParams.id
  const project = PROJECTS_DB[projectId]
  
  const currentIndex = PROJECTS_LIST.indexOf(projectId)
  const prevProject = currentIndex > 0 ? PROJECTS_LIST[currentIndex - 1] : null
  const nextProject = currentIndex >= 0 && currentIndex < PROJECTS_LIST.length - 1 ? PROJECTS_LIST[currentIndex + 1] : null

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacityY = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const scaleY = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center cursor-none">
        <CustomCursor />
        <h2>PROJECT NOT FOUND</h2>
        <Link href="/" className="mt-4 text-emerald-400 hover:underline">Back to Portfolio</Link>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen text-white font-sans overflow-hidden cursor-none selection:bg-emerald-400/30">
      <CustomCursor />
      <MouseParticles />

      {/* Dynamic glow background following cursor */}
      <motion.div 
        className="pointer-events-none fixed inset-0 z-0 opacity-50"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(800px circle at ${x}px ${y}px, rgba(6,182,212,0.15), transparent 80%)`
          )
        }}
      />
      
      {/* Animated grid overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Header Back Button */}
      <div className="absolute top-10 left-10 z-50 pointer-events-auto">
        <Link href="/">
          <MagneticButton className="bg-white/10 hover:bg-emerald-400 hover:text-black !px-6 text-white backdrop-blur-md">
            <ArrowLeft className="inline-block mr-2" size={20} /> Back
          </MagneticButton>
        </Link>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="relative z-10 flex min-h-[60svh] flex-col items-center justify-center px-6 pt-32 pb-16"
        style={{ opacity: opacityY, scale: scaleY }}
      >
        <div className="max-w-4xl mx-auto w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlitchText text="PROJECT" className="text-4xl md:text-6xl font-black tracking-widest text-emerald-400 mix-blend-screen opacity-50" />
            <h1 className="text-5xl md:text-7xl font-black mt-4 leading-tight">{project.title}</h1>
            <p className="mt-8 text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
              {project.shortDescription}
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Detail Content Section */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto pointer-events-auto">
        <div className="grid md:grid-cols-3 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-2 space-y-16"
          >
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center"><span className="text-emerald-400 mr-4">/01</span> About This Project</h2>
              <p className="leading-relaxed text-gray-300 text-lg">
                {project.fullDescription}
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center"><span className="text-emerald-400 mr-4">/02</span> Skills Acquired</h2>
              <div className="flex flex-wrap gap-4">
                {project.skillsAcquired.map((skill: string) => (
                  <span key={skill} className="px-5 py-2 border border-white/20 bg-white/5 rounded-full font-mono text-sm hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {project.screenshots && project.screenshots.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-6 flex items-center"><span className="text-emerald-400 mr-4">/03</span> Showcase</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.screenshots.map((src: string, index: number) => (
                     <div key={index} className="rounded-xl overflow-hidden border border-white/10 group relative">
                       <div className="absolute inset-0 bg-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center backdrop-blur-sm">
                         <span className="font-bold text-white tracking-widest uppercase text-sm">View Layer</span>
                       </div>
                       <img src={src} alt="Screenshot" className="w-full h-48 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                     </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="md:col-span-1"
          >
            <div className="sticky top-32 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="text-2xl font-bold mb-6 tracking-widest uppercase">Tech Stack</h3>
              <div className="flex flex-col gap-4">
                {project.tech.map((tech: string) => (
                  <div key={tech} className="flex justify-between items-center text-gray-300 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="flex-1 ml-4">{tech}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 space-y-4">
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-4 bg-emerald-400 text-black hover:bg-emerald-300 rounded-xl font-bold transition-colors">
                  <ExternalLink className="inline-block mr-2" size={18} /> Live Preview
                </a>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="block text-center px-6 py-4 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-xl transition-colors">
                  <Github className="inline-block mr-2" size={18} /> Source Code
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Navigation Footer */}
      <section className="relative z-10 py-16 px-6 max-w-6xl mx-auto border-t border-white/10 flex justify-between items-center z-50 pointer-events-auto">
        {prevProject ? (
          <Link href={`/projects/${prevProject}`} className="group hover:text-emerald-400 transition-colors">
            <div className="text-sm text-gray-500 mb-2 font-mono uppercase tracking-wider">Previous</div>
            <div className="text-xl md:text-3xl font-bold flex items-center gap-3">
              <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
              {PROJECTS_DB[prevProject].title}
            </div>
          </Link>
        ) : <div />}

        {nextProject ? (
          <Link href={`/projects/${nextProject}`} className="group hover:text-emerald-400 transition-colors text-right">
            <div className="text-sm text-gray-500 mb-2 font-mono uppercase tracking-wider">Next</div>
            <div className="text-xl md:text-3xl font-bold flex items-center justify-end gap-3">
              {PROJECTS_DB[nextProject].title}
              <ArrowLeft className="group-hover:translate-x-2 transition-transform rotate-180" />
            </div>
          </Link>
        ) : <div />}
      </section>
    </div>
  )
}