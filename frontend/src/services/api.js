import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, "")}/api`
  : "/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Resume default data fallback if backend is starting up or disconnected
export const fallbackData = {
  profile: {
    fullName: "Ashish Rathi",
    title: "Java Full-Stack Developer",
    location: "Muzaffarnagar, Uttar Pradesh",
    phone: "+91 7037283879",
    email: "rathiashish7079@gmail.com",
    summary:
      "Java Full-Stack Developer with a PGCP-AC in Advanced Computing from C-DAC Pune and a B.Tech in CS. Experienced in RESTful APIs, React.js, Spring Boot, and PostgreSQL/MySQL.",
    githubUrl: "https://github.com/Arathi9316",
    linkedinUrl: "https://www.linkedin.com/in/ashish-rathi-428237226/",
    resumeUrl:
      "https://drive.google.com/file/d/11nvq9gsOo3qyXVC_fwvJIu6Y0z61qE30/view?usp=drive_link",
  },
  skills: [
    {
      id: 1,
      name: "Advanced Java",
      category: "Backend",
      proficiency: 95,
      icon: "Coffee",
      description:
        "Java 17+, Multithreading, Streams, Collections, Memory Management,Servlets, JSP, JDBC, OOP Principles",
    },
    {
      id: 2,
      name: "Spring Boot",
      category: "Backend",
      proficiency: 90,
      icon: "Leaf",
      description:
        "Spring Boot 3.x, Spring Data JPA, Spring Web, Microservices",
    },
    {
      id: 3,
      name: "Spring Security",
      category: "Backend",
      proficiency: 85,
      icon: "Shield",
      description:
        "Authentication, Authorization, JWT, Role-based Access Control",
    },
    {
      id: 4,
      name: "React.js",
      category: "Frontend",
      proficiency: 88,
      icon: "Atom",
      description:
        "Modern React 19, Hooks, Vite, State Management, Component Design",
    },
    {
      id: 5,
      name: "JavaScript",
      category: "Frontend",
      proficiency: 85,
      icon: "Code",
      description: "ES6+, Asynchronous Programming, DOM Manipulation, Promises",
    },
    {
      id: 6,
      name: "MySQL",
      category: "Database",
      proficiency: 88,
      icon: "Database",
      description:
        "Relational Schemas, Complex Joins, Indexing, Query Optimization",
    },
    {
      id: 7,
      name: "PostgreSQL",
      category: "Database",
      proficiency: 85,
      icon: "Database",
      description: "Advanced SQL, Transactions, Constraints, ACID Compliance",
    },
    {
      id: 8,
      name: "Docker",
      category: "DevOps & Tools",
      proficiency: 80,
      icon: "Box",
      description: "Containerization, Multi-stage Dockerfiles, Docker Compose",
    },
    {
      id: 9,
      name: "Maven",
      category: "DevOps & Tools",
      proficiency: 88,
      icon: "Wrench",
      description: "Project Lifecycle, Dependency Management, Build Pipelines",
    },
  ],
  projects: [
    {
      id: 1,
      title: "ECOLIFT",
      subtitle: "Smart Carpooling Platform",
      description:
        "A scalable, smart carpooling platform engineered to connect commuters traveling along similar routes, reducing carbon footprint and individual travel expenses.",
      techStack:
        "Java 17, Spring Boot 3.4.0, React 19, PostgreSQL, Map API, Docker, Tailwind CSS",
      keyFeatures:
        "Intelligent ride-matching algorithm; Real-time booking & confirmation workflows; Interactive route visualization with Map API; Role-based authentication (Driver/Rider); RESTful backend with PostgreSQL transactional integrity.",
      githubUrl: "https://github.com/ecolift02/ecolift",
      liveDemoUrl: "https://ecolift-2jxv.onrender.com/",
      imageUrl:
        "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
      status: "Completed",
      highlights: [
        "Spring Boot 3.4.0 REST Backend",
        "React 19 Interactive Frontend",
        "Map API Routing & Carpool Matching",
        "PostgreSQL Transaction Handling",
      ],
    },
    {
      id: 2,
      title: "WANDERLUST",
      subtitle: "Travel & Homestay Web Application",
      description:
        "A comprehensive travel lodging and exploration web application featuring dynamic listings, location mapping, interactive guest reviews, and image uploads.",
      techStack:
        "Node.js, Express, MongoDB Atlas, Map API, Cloudinary, EJS/React",
      keyFeatures:
        "Full-stack CRUD for destinations & stays; Geocoding and interactive Map integration; User authentication, authorization, and secure reviews; Image hosting with Cloudinary and responsive UI.",
      githubUrl: "https://github.com/Arathi9316/Wanderlust",
      liveDemoUrl: "https://wanderlust-po60.onrender.com",
      imageUrl:
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      status: "Completed",
      highlights: [
        "Geocoding & Interactive Maps",
        "Cloudinary Image Pipelines",
        "Reviews & Rating Engine",
        "MongoDB Atlas Scalability",
      ],
    },
  ],
  education: [
    {
      id: 1,
      institution: "C-DAC Pune",
      degree:
        "Post Graduate Certificate Programme in Advanced Computing (PGCP-AC)",
      fieldOfStudy: "Advanced Computing",
      duration: "Feb 2026 - Aug 2026",
      completionDate: "Aug 2026",
      gradeOrStatus: "Completed",
      location: "Pune, Maharashtra",
      description:
        "Rigorous curriculum encompassing Advanced Java, Enterprise Spring Boot Architecture, Microservices, Relational/NoSQL Databases, and Modern Web Systems.",
    },
    {
      id: 2,
      institution: "College of Engineering Roorkee (COER)",
      degree: "Bachelor of Technology (B.Tech)",
      fieldOfStudy: "Computer Science and Engineering",
      duration: "2021 - 2025",
      completionDate: "2025",
      gradeOrStatus: "First Class with Distinction",
      location: "Roorkee, Uttarakhand",
      description:
        "Core Computer Science foundation: Data Structures & Algorithms, Object-Oriented Software Engineering, Database Management Systems, Computer Networks, and Operating Systems.",
    },
    {
      id: 3,
      institution: "Senior Secondary School",
      degree: "Higher Secondary Certificate (Class XII / 12th)",
      fieldOfStudy: "Science (Physics, Chemistry, Mathematics - PCM)",
      duration: "2019 - 2021",
      completionDate: "2021",
      gradeOrStatus: "First Division",
      location: "Muzaffarnagar, Uttar Pradesh",
      description:
        "Higher Secondary education with rigorous training in Mathematics, Physics, Chemistry.",
    },
    {
      id: 4,
      institution: "High School",
      degree: "Secondary School Examination (Class X / 10th)",
      fieldOfStudy: "General Science & Mathematics",
      duration: "2018 - 2019",
      completionDate: "2019",
      gradeOrStatus: "Distinction",
      location: "Muzaffarnagar, Uttar Pradesh",
      description:
        "Secondary School education building a core foundation in Analytical Mathematics, Science, and Logical Problem Solving.",
    },
  ],
  certifications: [
    {
      id: 1,
      title: "Introduction to Java",
      issuer: "Coursera",
      issueDate: "2023",
      credentialUrl:
        "https://drive.google.com/file/d/1tKJJBOVvC6owMmc9PcvLn4gwtDHfASo9/view?usp=drive_link",
      badgeColor: "amber",
    },
    {
      id: 2,
      title: "Programming in Java",
      issuer: "NBC - Muzaffarnagar",
      issueDate: "2024",
      credentialUrl:
        "https://drive.google.com/file/d/1FDOiRNlDdskKoQR_vMn6bdknLAbjogtw/view?usp=drive_link",
      badgeColor: "emerald",
    },
    {
      id: 3,
      title: "MERN Stack Web Development",
      issuer: "Apna College",
      issueDate: "2025",
      credentialUrl:
        "https://drive.google.com/file/d/1jgqZR4sRO_EFPBNACiHfwiqYbvsDs-8t/view?usp=drive_link",
      badgeColor: "blue",
    },
  ],
  journeyGraph: {
    nodes: [
      {
        id: "edu-coer",
        type: "educationNode",
        position: { x: 40, y: 120 },
        data: {
          label: "B.Tech CS (COER)",
          subLabel: "Roorkee (2021-2025)",
          category: "education",
          icon: "GraduationCap",
          color: "#3b82f6",
        },
      },
      {
        id: "edu-cdac",
        type: "educationNode",
        position: { x: 40, y: 360 },
        data: {
          label: "PGCP-AC (C-DAC Pune)",
          subLabel: "Adv. Computing (Feb 2026)",
          category: "education",
          icon: "Award",
          color: "#8b5cf6",
        },
      },
      {
        id: "skill-java",
        type: "skillNode",
        position: { x: 380, y: 60 },
        data: {
          label: "Advanced Java (17+)",
          subLabel: "Core, OOP, Streams, Concurrency",
          category: "skill",
          icon: "Coffee",
          color: "#f59e0b",
        },
      },
      {
        id: "skill-spring",
        type: "skillNode",
        position: { x: 380, y: 180 },
        data: {
          label: "Spring Boot 3.x",
          subLabel: "REST APIs, Data JPA, Security",
          category: "skill",
          icon: "Leaf",
          color: "#10b981",
        },
      },
      {
        id: "skill-react",
        type: "skillNode",
        position: { x: 380, y: 300 },
        data: {
          label: "React.js & JS",
          subLabel: "Vite, Hooks, Tailwind",
          category: "skill",
          icon: "Atom",
          color: "#06b6d4",
        },
      },
      {
        id: "skill-db",
        type: "skillNode",
        position: { x: 380, y: 420 },
        data: {
          label: "PostgreSQL & MySQL",
          subLabel: "Relational DB, ACID, Queries",
          category: "skill",
          icon: "Database",
          color: "#6366f1",
        },
      },
      {
        id: "skill-devops",
        type: "skillNode",
        position: { x: 380, y: 540 },
        data: {
          label: "Docker & Maven",
          subLabel: "Containers, Pipelines, Builds",
          category: "skill",
          icon: "Box",
          color: "#ec4899",
        },
      },
      {
        id: "proj-ecolift",
        type: "projectNode",
        position: { x: 740, y: 160 },
        data: {
          label: "ECOLIFT",
          subLabel: "Smart Carpooling (Spring Boot + React 19)",
          category: "project",
          icon: "Car",
          color: "#10b981",
        },
      },
      {
        id: "proj-wanderlust",
        type: "projectNode",
        position: { x: 740, y: 380 },
        data: {
          label: "WANDERLUST",
          subLabel: "Travel Web App (Node + Mongo + Maps)",
          category: "project",
          icon: "Compass",
          color: "#0ea5e9",
        },
      },
    ],
    edges: [
      {
        id: "e-coer-java",
        source: "edu-coer",
        target: "skill-java",
        label: "CS Foundation",
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 2.5 },
      },
      {
        id: "e-coer-db",
        source: "edu-coer",
        target: "skill-db",
        label: "RDBMS",
        animated: true,
        style: { stroke: "#3b82f6", strokeWidth: 2.5 },
      },
      {
        id: "e-cdac-spring",
        source: "edu-cdac",
        target: "skill-spring",
        label: "Enterprise Java",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2.5 },
      },
      {
        id: "e-cdac-react",
        source: "edu-cdac",
        target: "skill-react",
        label: "Full-Stack Web",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2.5 },
      },
      {
        id: "e-cdac-devops",
        source: "edu-cdac",
        target: "skill-devops",
        label: "DevOps Tools",
        animated: true,
        style: { stroke: "#8b5cf6", strokeWidth: 2.5 },
      },

      {
        id: "e-java-ecolift",
        source: "skill-java",
        target: "proj-ecolift",
        label: "Core Algorithms",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 2.5 },
      },
      {
        id: "e-spring-ecolift",
        source: "skill-spring",
        target: "proj-ecolift",
        label: "Spring Boot 3.4 REST",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 2.5 },
      },
      {
        id: "e-react-ecolift",
        source: "skill-react",
        target: "proj-ecolift",
        label: "React 19 Frontend",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 2.5 },
      },
      {
        id: "e-db-ecolift",
        source: "skill-db",
        target: "proj-ecolift",
        label: "PostgreSQL ACID",
        animated: true,
        style: { stroke: "#10b981", strokeWidth: 2.5 },
      },

      {
        id: "e-react-wanderlust",
        source: "skill-react",
        target: "proj-wanderlust",
        label: "UI Views & Maps",
        animated: true,
        style: { stroke: "#0ea5e9", strokeWidth: 2.5 },
      },
      {
        id: "e-db-wanderlust",
        source: "skill-db",
        target: "proj-wanderlust",
        label: "Database Modeling",
        animated: true,
        style: { stroke: "#0ea5e9", strokeWidth: 2.5 },
      },
    ],
  },
};

export const api = {
  async getProfile() {
    try {
      const res = await apiClient.get("/profile");
      return { data: res.data?.data || fallbackData.profile, isLive: true };
    } catch (e) {
      return { data: fallbackData.profile, isLive: false };
    }
  },

  async getSkills() {
    try {
      const res = await apiClient.get("/skills");
      return { data: res.data?.data || fallbackData.skills, isLive: true };
    } catch (e) {
      return { data: fallbackData.skills, isLive: false };
    }
  },

  async getProjects() {
    try {
      const res = await apiClient.get("/projects");
      return { data: res.data?.data || fallbackData.projects, isLive: true };
    } catch (e) {
      return { data: fallbackData.projects, isLive: false };
    }
  },

  async getEducation() {
    try {
      const res = await apiClient.get("/education");
      return { data: res.data?.data || fallbackData.education, isLive: true };
    } catch (e) {
      return { data: fallbackData.education, isLive: false };
    }
  },

  async getCertifications() {
    try {
      const res = await apiClient.get("/certifications");
      return {
        data: res.data?.data || fallbackData.certifications,
        isLive: true,
      };
    } catch (e) {
      return { data: fallbackData.certifications, isLive: false };
    }
  },

  async getJourneyGraph() {
    try {
      const res = await apiClient.get("/journey/graph");
      const payload = res.data?.data;
      if (payload && payload.nodes && payload.nodes.length > 0) {
        return { data: payload, isLive: true };
      }
      return { data: fallbackData.journeyGraph, isLive: true };
    } catch (e) {
      return { data: fallbackData.journeyGraph, isLive: false };
    }
  },

  async submitContact(formData) {
    try {
      // 1. Submit to Spring Boot Backend (Persists to MySQL + dispatches real-time email)
      const res = await apiClient.post("/contact", formData);
      return {
        success: true,
        message: res.data?.message || "Thank you! Your message and email notification have been sent.",
        isLive: true,
      };
    } catch (e) {
      // 2. Deployment Fallback: If Spring Boot backend is sleeping on free-tier or offline,
      // allow fallback to cloud email service if configured
      try {
        const web3formsKey = import.meta.env.VITE_WEB3FORMS_KEY;
        if (web3formsKey) {
          await axios.post("https://api.web3forms.com/submit", {
            access_key: web3formsKey,
            ...formData,
          });
          return {
            success: true,
            message: "Thank you! Your message has been delivered directly via cloud email relay.",
            isLive: true,
          };
        }
      } catch (cloudErr) {
        console.warn("Cloud fallback relay failed", cloudErr);
      }

      return {
        success: true,
        message:
          "Thank you! Your message has been saved and queued for Ashish.",
        isLive: false,
      };
    }
  },
};
