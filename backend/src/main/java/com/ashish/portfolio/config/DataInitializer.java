package com.ashish.portfolio.config;

import com.ashish.portfolio.entity.*;
import com.ashish.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final JourneyNodeRepository journeyNodeRepository;
    private final JourneyEdgeRepository journeyEdgeRepository;

    public DataInitializer(ProfileRepository profileRepository,
                           SkillRepository skillRepository,
                           ProjectRepository projectRepository,
                           EducationRepository educationRepository,
                           CertificationRepository certificationRepository,
                           JourneyNodeRepository journeyNodeRepository,
                           JourneyEdgeRepository journeyEdgeRepository) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.journeyNodeRepository = journeyNodeRepository;
        this.journeyEdgeRepository = journeyEdgeRepository;
    }

    @Override
    public void run(String... args) {
        seedProfile();
        seedSkills();
        seedProjects();
        seedEducation();
        seedCertifications();
        seedJourneyGraph();
        log.info("Portfolio initial seed check completed successfully.");
    }

    private void seedProfile() {
        if (profileRepository.count() == 0) {
            Profile profile = new Profile(
                "Ashish Rathi",
                "Java Full-Stack Developer",
                "Pune, Maharashtra",
                "+91 7037283879",
                "rathiashish7079@gmail.com",
                "Java Full-Stack Developer with a PGCP-AC in Advanced Computing from C-DAC Pune and a B.Tech in CS. Experienced in RESTful APIs, React.js, Spring Boot, and PostgreSQL/MySQL.",
                "https://github.com",
                "https://linkedin.com",
                "/Ashish_Resume.pdf"
            );
            profileRepository.save(profile);
            log.info("Profile seeded.");
        }
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            List<Skill> skills = List.of(
                new Skill(null, "Advanced Java", "Backend", 95, "java", "Java 17+, Multithreading, Streams, Collections, Memory Management"),
                new Skill(null, "Spring Boot", "Backend", 90, "spring", "Spring Boot 3.x, Spring Data JPA, Spring Web, Microservices"),
                new Skill(null, "Spring Security", "Backend", 85, "shield", "Authentication, Authorization, JWT, Role-based Access Control"),
                new Skill(null, "React.js 19", "Frontend", 88, "react", "Modern React 19, Hooks, Vite, State Management, Component Design"),
                new Skill(null, "JavaScript", "Frontend", 85, "js", "ES6+, Asynchronous Programming, DOM Manipulation, Promises"),
                new Skill(null, "MySQL", "Database", 88, "database", "Relational Schemas, Complex Joins, Indexing, Query Optimization"),
                new Skill(null, "PostgreSQL", "Database", 85, "database", "Advanced SQL, Transactions, Constraints, ACID Compliance"),
                new Skill(null, "Docker", "DevOps & Tools", 80, "docker", "Containerization, Multi-stage Dockerfiles, Docker Compose"),
                new Skill(null, "Maven", "DevOps & Tools", 88, "tool", "Project Lifecycle, Dependency Management, Build Pipelines")
            );
            skillRepository.saveAll(skills);
            log.info("Skills seeded: {}", skills.size());
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            List<Project> projects = List.of(
                new Project(
                    null,
                    "ECOLIFT",
                    "Smart Carpooling Platform",
                    "A scalable, smart carpooling platform engineered to connect commuters traveling along similar routes, reducing carbon footprint and travel expenses.",
                    "Java 17, Spring Boot 3.4.0, React 19, PostgreSQL, Map API, Docker, Tailwind CSS",
                    "Intelligent ride-matching algorithm; Real-time booking & confirmation workflows; Interactive route visualization with Map API; Role-based authentication (Driver/Rider); RESTful backend with PostgreSQL transactional integrity.",
                    "https://github.com/ashishrathi/ecolift",
                    "https://ecolift-demo.example.com",
                    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80",
                    "Completed"
                ),
                new Project(
                    null,
                    "WANDERLUST",
                    "Travel & Homestay Web Application",
                    "A comprehensive travel lodging and exploration web application featuring dynamic listings, location mapping, interactive guest reviews, and image uploads.",
                    "Node.js, Express, MongoDB Atlas, Map API, Cloudinary, EJS/React",
                    "Full-stack CRUD for destinations & stays; Geocoding and interactive Map integration; User authentication, authorization, and secure reviews; Image hosting with Cloudinary and responsive UI.",
                    "https://github.com/ashishrathi/wanderlust",
                    "https://wanderlust-demo.example.com",
                    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
                    "Completed"
                )
            );
            projectRepository.saveAll(projects);
            log.info("Projects seeded: {}", projects.size());
        }
    }

    private void seedEducation() {
        if (educationRepository.count() < 4) {
            educationRepository.deleteAll();
            List<Education> educationList = List.of(
                new Education(
                    null,
                    "C-DAC Pune",
                    "Post Graduate Certificate Programme in Advanced Computing (PGCP-AC)",
                    "Advanced Computing",
                    "Feb 2026 - Aug 2026",
                    "Aug 2026",
                    "Completed with Distinction",
                    "Pune, Maharashtra",
                    "Rigorous curriculum encompassing Advanced Java, Enterprise Spring Boot Architecture, Microservices, Cloud Technologies, Relational/NoSQL Databases, and Modern Web Systems."
                ),
                new Education(
                    null,
                    "College of Engineering Roorkee (COER)",
                    "Bachelor of Technology (B.Tech)",
                    "Computer Science and Engineering",
                    "2021 - 2025",
                    "2025",
                    "First Class with Distinction",
                    "Roorkee, Uttarakhand",
                    "Core Computer Science foundation: Data Structures & Algorithms, Object-Oriented Software Engineering, Database Management Systems, Computer Networks, and Operating Systems."
                ),
                new Education(
                    null,
                    "Senior Secondary School",
                    "Higher Secondary Certificate (Class XII / 12th)",
                    "Science (Physics, Chemistry, Mathematics - PCM)",
                    "2019 - 2021",
                    "2021",
                    "Completed with First Division",
                    "Muzaffarnagar, Uttar Pradesh",
                    "Completed Higher Secondary Education focusing on advanced Mathematics, Physics, Chemistry"
                ),
                new Education(
                    null,
                    "High School",
                    "Secondary School Certificate (Class X / 10th)",
                    "General Science & Mathematics",
                    "2018 - 2019",
                    "2019",
                    "Completed with Distinction",
                    "Muzaffarnagar, Uttar Pradesh",
                    "Completed Secondary School education with strong foundation in Science, Mathematics, English, and Logical Reasoning."
                )
            );
            educationRepository.saveAll(educationList);
            log.info("Education records seeded: {}", educationList.size());
        }
    }

    private void seedCertifications() {
        if (certificationRepository.count() < 3) {
            certificationRepository.deleteAll();
            List<Certification> certs = List.of(
                new Certification(null, "Core Java Specialization", "Coursera", "2024", "https://coursera.org/verify/core-java", "amber"),
                new Certification(null, "MERN Stack Web Development", "Apna College", "2024", "https://apnacollege.in/verify/mern", "blue"),
                new Certification(null, "NBC Certificate", "National Board of Certification (NBC)", "2024", "https://example.com/nbc-verify", "emerald")
            );
            certificationRepository.saveAll(certs);
            log.info("Certifications seeded: {}", certs.size());
        }
    }

    private void seedJourneyGraph() {
        if (journeyNodeRepository.count() == 0) {
            List<JourneyNode> nodes = List.of(
                new JourneyNode("edu-coer", "B.Tech CS (COER)", "education", "Roorkee (2021-2025)", 50.0, 120.0, "educationNode", "GraduationCap", "#3b82f6"),
                new JourneyNode("edu-cdac", "PGCP-AC (C-DAC Pune)", "education", "Adv. Computing (Feb 2026)", 50.0, 360.0, "educationNode", "Award", "#8b5cf6"),
                new JourneyNode("skill-java", "Advanced Java (17+)", "skill", "Core, OOP, Streams, Concurrency", 380.0, 60.0, "skillNode", "Coffee", "#f59e0b"),
                new JourneyNode("skill-spring", "Spring Boot 3.x", "skill", "REST APIs, Data JPA, Security", 380.0, 180.0, "skillNode", "Leaf", "#10b981"),
                new JourneyNode("skill-react", "React.js 19 & JS", "skill", "Vite, Hooks, Tailwind", 380.0, 300.0, "skillNode", "Atom", "#06b6d4"),
                new JourneyNode("skill-db", "PostgreSQL & MySQL", "skill", "Relational DB, ACID, Queries", 380.0, 420.0, "skillNode", "Database", "#6366f1"),
                new JourneyNode("skill-devops", "Docker & Maven", "skill", "Containers, Pipelines, Builds", 380.0, 540.0, "skillNode", "Box", "#ec4899"),
                new JourneyNode("proj-ecolift", "ECOLIFT", "project", "Smart Carpooling Platform (Spring Boot + React)", 740.0, 160.0, "projectNode", "Car", "#10b981"),
                new JourneyNode("proj-wanderlust", "WANDERLUST", "project", "Travel Web App (Node + Mongo + Maps)", 740.0, 380.0, "projectNode", "Compass", "#0ea5e9")
            );
            journeyNodeRepository.saveAll(nodes);

            List<JourneyEdge> edges = List.of(
                new JourneyEdge("e-coer-java", "edu-coer", "skill-java", "Foundation", true, "#3b82f6"),
                new JourneyEdge("e-coer-db", "edu-coer", "skill-db", "RDBMS", true, "#3b82f6"),
                new JourneyEdge("e-cdac-spring", "edu-cdac", "skill-spring", "Enterprise Java", true, "#8b5cf6"),
                new JourneyEdge("e-cdac-react", "edu-cdac", "skill-react", "Full-Stack Web", true, "#8b5cf6"),
                new JourneyEdge("e-cdac-devops", "edu-cdac", "skill-devops", "Deployment & CI", true, "#8b5cf6"),

                new JourneyEdge("e-java-ecolift", "skill-java", "proj-ecolift", "Core Engine", true, "#10b981"),
                new JourneyEdge("e-spring-ecolift", "skill-spring", "proj-ecolift", "REST Backend", true, "#10b981"),
                new JourneyEdge("e-react-ecolift", "skill-react", "proj-ecolift", "Ride Booking UI", true, "#10b981"),
                new JourneyEdge("e-db-ecolift", "skill-db", "proj-ecolift", "PostgreSQL Relational", true, "#10b981"),

                new JourneyEdge("e-react-wanderlust", "skill-react", "proj-wanderlust", "Frontend Views", true, "#0ea5e9"),
                new JourneyEdge("e-db-wanderlust", "skill-db", "proj-wanderlust", "Data Modeling", true, "#0ea5e9")
            );
            journeyEdgeRepository.saveAll(edges);
            log.info("Journey graph nodes and edges seeded.");
        }
    }
}
