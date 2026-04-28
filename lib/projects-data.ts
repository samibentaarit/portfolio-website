export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  tech: string[]
  skillsAcquired: string[]
  screenshots: string[]
  demoVideo?: string
  github: string
  live: string
  featured: boolean
}

export const projects: Project[] = [
  {
    id: "hotel-management",
    title: "Hotel Management Web Application",
    shortDescription: "Complete hotel management platform with AI-powered pricing - Final Year Project at ESPRIT",
    fullDescription:
      "Design and development of a complete hotel management web platform for Tunisie Booking. The application features multi-hotel management with reservations, roles and privileges system, and integrates an AI module for best price suggestion using machine learning algorithms. Backend and database hosted on Microsoft Azure, with frontend deployed on Vercel for optimal performance.",
    tech: ["Laravel", "Next.js", "MySQL", "Microsoft Azure", "Vercel", "AI/ML"],
    skillsAcquired: [
      "Full-stack development",
      "Cloud infrastructure (Azure)",
      "AI/ML integration",
      "Database design",
      "Role-based access control",
      "Deployment & DevOps",
    ],
    screenshots: [
      "/hotel-management-dashboard-dark.jpg",
      "/hotel-booking-system-interface.jpg",
      "/hotel-reservation-calendar.jpg",
      "/hotel-ai-pricing-module.jpg",
    ],
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    github: "https://github.com/samibentaarit/hotel-management",
    live: "https://front-end-updated-lemon.vercel.app/",
    featured: true,
  },
  {
    id: "roam-maze",
    title: "ROAM MAZE",
    shortDescription: "Web and mobile app facilitating school-parent communication",
    fullDescription:
      "A comprehensive web and mobile application designed to facilitate communication between school administration and parents. Built during a summer internship in 2024, the platform provides real-time updates, notifications, messaging, and event management features to keep parents informed about their children's education.",
    tech: ["React", "Flutter", "Node.js", "MongoDB"],
    skillsAcquired: [
      "Cross-platform development",
      "Mobile app development with Flutter",
      "Real-time communication",
      "NoSQL database design",
      "RESTful API development",
    ],
    screenshots: [
      "/school-parent-communication-app.jpg",
      "/mobile-notification-system.jpg",
      "/parent-dashboard-interface.jpg",
      "/school-events-calendar.jpg",
    ],
    github: "https://github.com/samibentaarit/roam-maze",
    live: "https://roam-maze.vercel.app",
    featured: true,
  },
  {
    id: "bus-schedule-management",
    title: "Bus Schedule Management",
    shortDescription: "School bus scheduling system for Les Nouvelles Générations",
    fullDescription:
      "A bus schedule management application developed for Les Nouvelles Générations private school in Djerba. The system allows administration to manage bus routes, schedules, and driver assignments while providing parents with real-time updates on bus locations and arrival times.",
    tech: ["Spring Boot", "Angular", "MySQL"],
    skillsAcquired: [
      "Enterprise Java development",
      "Angular frontend development",
      "RESTful API design",
      "Database optimization",
      "Schedule management algorithms",
    ],
    screenshots: [
      "/bus-schedule-dashboard.jpg",
      "/route-management-system.jpg",
      "/driver-assignment-interface.jpg",
      "/bus-tracking-map.jpg",
    ],
    github: "https://github.com/samibentaarit/bus-schedule",
    live: "https://bus-schedule.vercel.app",
    featured: true,
  },
  {
    id: "version-management",
    title: "Project Version Management",
    shortDescription: "GitLab and Artifactory integration for version control at BFI Groupe",
    fullDescription:
      "Bachelor's final project internship at BFI Groupe. Designed and developed a web application to manage project versioning using GitLab and Artifactory APIs. The system provides a unified interface for tracking releases, managing artifacts, and automating deployment workflows.",
    tech: ["Angular", "Spring Boot", "MySQL", "GitLab API", "Artifactory"],
    skillsAcquired: [
      "API integration",
      "Version control systems",
      "Artifact management",
      "Enterprise software development",
      "DevOps workflows",
    ],
    screenshots: [
      "/version-control-dashboard.jpg",
      "/gitlab-integration-interface.jpg",
      "/artifact-management-system.jpg",
      "/placeholder.svg?height=600&width=800",
    ],
    github: "https://github.com/samibentaarit/version-management",
    live: "https://version-mgmt.vercel.app",
    featured: false,
  },
  {
    id: "conservatory-platform",
    title: "Conservatory Management Platform",
    shortDescription: "Platform with facial recognition attendance system",
    fullDescription:
      "Academic project for managing a music conservatory. Features include schedule management for students and teachers, holiday tracking, and an innovative attendance system using facial recognition technology for automated check-ins.",
    tech: ["Node.js", "React", "Python", "OpenCV", "MongoDB"],
    skillsAcquired: [
      "Facial recognition implementation",
      "Computer vision with OpenCV",
      "Full-stack JavaScript development",
      "Biometric systems",
      "Real-time processing",
    ],
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    github: "https://github.com/samibentaarit/conservatory-platform",
    live: "https://conservatory-platform.vercel.app",
    featured: true,
  },
  {
    id: "ecowander",
    title: "EcoWander",
    shortDescription: "Web application promoting eco-friendly travel",
    fullDescription:
      "A Laravel-based web application designed to promote eco-friendly and sustainable travel options. Users can discover green destinations, eco-conscious accommodations, and sustainable transportation alternatives while tracking their carbon footprint.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS"],
    skillsAcquired: [
      "Laravel framework mastery",
      "PHP backend development",
      "Sustainable technology design",
      "Database management",
      "UI/UX for environmental apps",
    ],
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    github: "https://github.com/samibentaarit/ecowander",
    live: "https://ecowander.vercel.app",
    featured: false,
  },
  {
    id: "dormitory-management",
    title: "Dormitory Management",
    shortDescription: "Interactive room reservation system for students",
    fullDescription:
      "A comprehensive dormitory management system built with Spring Boot and Angular. Features an interactive room reservation system that allows students to browse available rooms, make reservations, and manage their accommodation throughout the academic year.",
    tech: ["Spring Boot", "Angular", "MySQL", "TypeScript"],
    skillsAcquired: [
      "Reservation system architecture",
      "Interactive UI development",
      "Spring Boot backend development",
      "Student management systems",
      "Payment integration",
    ],
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    github: "https://github.com/samibentaarit/dormitory-management",
    live: "https://dormitory-mgmt.vercel.app",
    featured: false,
  },
  {
    id: "medcare",
    title: "MedCare",
    shortDescription: "Web and desktop application for medical appointments",
    fullDescription:
      "A dual-platform healthcare solution featuring both web (Symfony) and desktop (JavaFX) applications. MedCare enables patients to schedule appointments, manage medical consultations, and access their health records while providing doctors with efficient patient management tools.",
    tech: ["Symfony", "JavaFX", "MySQL", "PHP", "Java"],
    skillsAcquired: [
      "Multi-platform development",
      "Healthcare software standards",
      "Desktop application development",
      "Symfony PHP framework",
      "Medical data management",
    ],
    screenshots: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    github: "https://github.com/samibentaarit/medcare",
    live: "https://medcare.vercel.app",
    featured: false,
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured)
}
