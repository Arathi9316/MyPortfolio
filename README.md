# Ashish Rathi - Full-Stack Portfolio Application

A modern, production-grade portfolio web application featuring an interactive **React Flow Skills & Journey Knowledge Map**, built with **React 19**, **Tailwind CSS**, **Spring Boot 3.4.0**, and **MySQL**.

---

## 🚀 Tech Stack

- **Frontend**:
  - **React 19** with **Vite**
  - **@xyflow/react** (React Flow 12+ for React 19) for interactive node-based journey graph
  - **Tailwind CSS 3.4** for styling and animations
  - **Lucide React** for icons
  - **Axios** with API client & resilience fallbacks

- **Backend**:
  - **Java 17+** (Java 17 LTS / Java 21)
  - **Spring Boot 3.4.0**
  - **Spring Web** (RESTful APIs)
  - **Spring Data JPA & Hibernate**
  - **MySQL Connector/J** (Port 3306)
  - **H2 Database** (Optional embedded in-memory profile for instant testing)
  - **Jakarta Validation**

- **Database**:
  - **MySQL 8.0+** on `localhost:3306` (Database: `portfolio_db`)
  - Automatic database creation via `createDatabaseIfNotExist=true`
  - Automated seeding via `data.sql` and `DataInitializer.java`

---

## 📂 Project Structure

```
d:\Anti/
├── backend/
│   ├── pom.xml                                  # Maven dependencies & build config
│   ├── mvnw & mvnw.cmd                          # Maven wrapper executables
│   ├── .mvn/wrapper/                            # Maven wrapper properties
│   └── src/
│       ├── main/
│       │   ├── java/com/ashish/portfolio/
│       │   │   ├── PortfolioApplication.java    # Spring Boot Main Application
│       │   │   ├── config/                      # CORS & DataInitializer
│       │   │   ├── controller/                  # REST Controllers (/api/*)
│       │   │   ├── dto/                         # DTOs & ApiResponse
│       │   │   ├── entity/                      # JPA Entities (Profile, Project, etc.)
│       │   │   ├── repository/                  # Spring Data JPA Repositories
│       │   │   └── service/                     # Portfolio & Contact Services
│       │   └── resources/
│       │       ├── application.properties       # MySQL connection (Port 3306)
│       │       ├── application-h2.properties    # H2 in-memory test profile
│       │       ├── data.sql                     # Initial seed data
│       │       └── schema.sql                   # MySQL DDL table schema
│       └── test/                                # JUnit & Spring Boot Tests
│
├── frontend/
│   ├── package.json                             # Dependencies (React 19, @xyflow/react, etc.)
│   ├── vite.config.js                           # Vite bundler & /api proxy configuration
│   ├── tailwind.config.js                       # Theme colors, fonts & keyframe glows
│   ├── postcss.config.js                        # Tailwind PostCSS plugin
│   ├── index.html                               # HTML5 entry with Google Fonts
│   └── src/
│       ├── main.jsx                             # React 19 root
│       ├── App.jsx                              # Master layout & state orchestrator
│       ├── index.css                            # Tailwind base & React Flow styles
│       ├── components/
│       │   ├── Navbar.jsx                       # Glassmorphism header with navigation
│       │   ├── Hero.jsx                         # Hero intro & code snippet card
│       │   ├── About.jsx                        # Detailed bio & core competencies
│       │   ├── JourneyFlow.jsx                  # Interactive React Flow Knowledge Map
│       │   ├── CustomNodes.jsx                  # Custom styled nodes (Edu, Skill, Project)
│       │   ├── Projects.jsx                     # ECOLIFT & WANDERLUST project showcase
│       │   ├── Skills.jsx                       # Categorized skills & proficiency bars
│       │   ├── EducationCertifications.jsx      # C-DAC Pune, COER & Verified Badges
│       │   ├── Contact.jsx                      # Working contact form (POST /api/contact)
│       │   └── Footer.jsx                       # Footer with back-to-top action
│       └── services/
│           └── api.js                           # Axios service with smart fallbacks
│
├── start-all.bat                                # Windows 1-click launcher
├── start-backend.bat                            # Backend launcher
├── start-frontend.bat                           # Frontend launcher
└── portfolio-ashish-rathi.zip                   # Downloadable ZIP package
```

---

## ⚡ Quick Start Guide

### Step 1: Start the Backend (Spring Boot)

#### Option A: Running with MySQL (Default)
1. Ensure your local MySQL server is running on port **3306** (default user `root`, password `root` or update `backend/src/main/resources/application.properties`).
2. Open a terminal in `backend/` and run:
   ```bash
   mvn spring-boot:run
   ```
   *(or use `./mvnw.cmd spring-boot:run` on Windows, `./mvnw spring-boot:run` on Linux/macOS)*

#### Option B: Running with H2 In-Memory (No MySQL needed)
If you haven't started MySQL yet and want to run immediately:
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```

The Spring Boot backend will start on **`http://localhost:8080`**.
- Verify backend health: [http://localhost:8080/api/profile](http://localhost:8080/api/profile)
- Verify Journey Graph API: [http://localhost:8080/api/journey/graph](http://localhost:8080/api/journey/graph)

---

### Step 2: Start the Frontend (React 19 + Vite)

1. Open a new terminal in `frontend/`:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. Open your browser and navigate to:
   **`http://localhost:5173`**

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/profile` | Fetches Ashish Rathi's profile details & summary |
| `GET` | `/api/projects` | Returns all featured projects (ECOLIFT, WANDERLUST) |
| `GET` | `/api/projects/{id}` | Returns a single project by ID |
| `GET` | `/api/skills` | Returns all technical skills with categories and levels |
| `GET` | `/api/education` | Returns education history (C-DAC Pune, COER) |
| `GET` | `/api/certifications`| Returns certifications (Coursera, Apna College) |
| `GET` | `/api/journey/graph` | Returns nodes & animated edges for **React Flow** |
| `POST`| `/api/contact` | Submits a contact inquiry to the database |

---

## 🎯 React Flow "Skills & Journey" Map Features

- **Draggable Custom Nodes**:
  - **Education Nodes**: C-DAC Pune (PGCP-AC) & COER (B.Tech CSE).
  - **Skill Nodes**: Advanced Java, Spring Boot 3.x, React 19, MySQL, PostgreSQL, Docker, Maven.
  - **Project Nodes**: ECOLIFT (Smart Carpooling Platform) and WANDERLUST (Travel Web App).
- **Animated Edges**: Glowing, animated paths connecting foundational education to specialized skills, and skills to live projects.
- **Interactive Controls**: MiniMap, Zoom/Pan controls, Reset layout, and interactive details drawer on node click.
- **Dynamic Category Filters**: Filter nodes by *All*, *Education*, *Skills*, or *Projects*.

---

## 👤 Resume Data Injected

- **Name**: Ashish Rathi
- **Role**: Java Full-Stack Developer
- **Contact**: Pune, Maharashtra | +91 7037283879 | rathiashish7079@gmail.com
- **Education**:
  - **C-DAC Pune**: PGCP-AC in Advanced Computing (Feb 2026)
  - **College of Engineering Roorkee (COER)**: B.Tech CSE (2021-2025)
- **Projects**:
  - **ECOLIFT**: Smart Carpooling Platform (Java 17, Spring Boot 3.4.0, React 19, PostgreSQL, Map API).
  - **WANDERLUST**: Travel Web Application (Node.js, Express, MongoDB Atlas, Map API).
- **Certifications**:
  - Core Java Specialization (Coursera)
  - MERN Stack Web Development (Apna College)
