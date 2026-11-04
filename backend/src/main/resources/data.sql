-- ===================================================================
-- Initial Seed Data for Ashish Rathi Portfolio Database
-- ===================================================================

-- Profile (Table: user_profile)
INSERT IGNORE INTO user_profile (id, full_name, title, location, phone, email, summary, github_url, linkedin_url, resume_url)
VALUES (1, 
    'Ashish Rathi', 
    'Java Full-Stack Developer', 
    'Pune, Maharashtra', 
    '+91 7037283879', 
    'rathiashish7079@gmail.com', 
    'Java Full-Stack Developer with a PGCP-AC in Advanced Computing from C-DAC Pune and a B.Tech in CS. Experienced in RESTful APIs, React.js, Spring Boot, and PostgreSQL/MySQL.', 
    'https://github.com', 
    'https://linkedin.com', 
    '/Ashish_Resume.pdf'
);

-- Skills
INSERT IGNORE INTO skill (id, name, category, proficiency, icon, description) VALUES
(1, 'Advanced Java', 'Backend', 95, 'java', 'Java 17+, Multithreading, Streams, Collections, Memory Management'),
(2, 'Spring Boot', 'Backend', 90, 'spring', 'Spring Boot 3.x, Spring Data JPA, Spring Web, Microservices'),
(3, 'Spring Security', 'Backend', 85, 'shield', 'Authentication, Authorization, JWT, Role-based Access Control'),
(4, 'React.js 19', 'Frontend', 88, 'react', 'Modern React 19, Hooks, Vite, State Management, Component Design'),
(5, 'JavaScript', 'Frontend', 85, 'js', 'ES6+, Asynchronous Programming, DOM Manipulation, Promises'),
(6, 'MySQL', 'Database', 88, 'database', 'Relational Schemas, Complex Joins, Indexing, Query Optimization'),
(7, 'PostgreSQL', 'Database', 85, 'database', 'Advanced SQL, Transactions, Constraints, ACID Compliance'),
(8, 'Docker', 'DevOps & Tools', 80, 'docker', 'Containerization, Multi-stage Dockerfiles, Docker Compose'),
(9, 'Maven', 'DevOps & Tools', 88, 'tool', 'Project Lifecycle, Dependency Management, Build Pipelines');

-- Projects
INSERT IGNORE INTO project (id, title, subtitle, description, tech_stack, key_features, github_url, live_demo_url, image_url, status) VALUES
(1, 
 'ECOLIFT', 
 'Smart Carpooling Platform', 
 'A scalable, smart carpooling platform engineered to connect commuters traveling along similar routes, reducing carbon footprint and travel expenses.', 
 'Java 17, Spring Boot 3.4.0, React 19, PostgreSQL, Map API, Docker, Tailwind CSS', 
 'Intelligent ride-matching algorithm; Real-time booking & confirmation workflows; Interactive route visualization with Map API; Role-based authentication (Driver/Rider); RESTful backend with PostgreSQL transactional integrity.', 
 'https://github.com/ashishrathi/ecolift', 
 'https://ecolift-demo.example.com', 
 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=80', 
 'Completed'
),
(2, 
 'WANDERLUST', 
 'Travel & Homestay Web Application', 
 'A comprehensive travel lodging and exploration web application featuring dynamic listings, location mapping, interactive guest reviews, and image uploads.', 
 'Node.js, Express, MongoDB Atlas, Map API, Cloudinary, EJS/React', 
 'Full-stack CRUD for destinations & stays; Geocoding and interactive Map integration; User authentication, authorization, and secure reviews; Image hosting with Cloudinary and responsive UI.', 
 'https://github.com/ashishrathi/wanderlust', 
 'https://wanderlust-demo.example.com', 
 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80', 
 'Completed'
);

-- Education
INSERT IGNORE INTO education (id, institution, degree, field_of_study, duration, completion_date, grade_or_status, location, description) VALUES
(1, 
 'C-DAC Pune', 
 'Post Graduate Certificate Programme in Advanced Computing (PGCP-AC)', 
 'Advanced Computing', 
 '2025 - 2026', 
 'Feb 2026', 
 'Pursuing / In Progress', 
 'Pune, Maharashtra', 
 'Rigorous curriculum encompassing Advanced Java, Enterprise Spring Boot Architecture, Microservices, Cloud Technologies, Relational/NoSQL Databases, and Modern Web Systems.'
),
(2, 
 'College of Engineering Roorkee (COER)', 
 'Bachelor of Technology (B.Tech)', 
 'Computer Science and Engineering', 
 '2021 - 2025', 
 '2025', 
 'First Class with Distinction', 
 'Roorkee, Uttarakhand', 
 'Core Computer Science foundation: Data Structures & Algorithms, Object-Oriented Software Engineering, Database Management Systems, Computer Networks, and Operating Systems.'
),
(3, 
 'Senior Secondary School', 
 'Higher Secondary Certificate (Class XII / 12th)', 
 'Science (Physics, Chemistry, Mathematics - PCM)', 
 '2019 - 2021', 
 '2021', 
 'Completed with First Division', 
 'Roorkee, Uttarakhand', 
 'Completed Higher Secondary Education focusing on advanced Mathematics, Physics, Chemistry, and Computer Applications.'
),
(4, 
 'High School', 
 'Secondary School Certificate (Class X / 10th)', 
 'General Science & Mathematics', 
 '2018 - 2019', 
 '2019', 
 'Completed with Distinction', 
 'Roorkee, Uttarakhand', 
 'Completed Secondary School education with strong foundation in Science, Mathematics, English, and Logical Reasoning.'
);

-- Certifications
INSERT IGNORE INTO certification (id, title, issuer, issue_date, credential_url, badge_color) VALUES
(1, 'Core Java Specialization', 'Coursera', '2024', 'https://coursera.org/verify/core-java', 'amber'),
(2, 'MERN Stack Web Development', 'Apna College', '2024', 'https://apnacollege.in/verify/mern', 'blue'),
(3, 'NBC Certificate', 'National Board of Certification (NBC)', '2024', 'https://example.com/nbc-verify', 'emerald');

-- Journey Nodes (React Flow)
INSERT IGNORE INTO journey_node (node_id, label, category, sub_label, x_pos, y_pos, node_type, icon_name, color) VALUES
-- Education Hub & Nodes
('edu-coer', 'B.Tech CS (COER)', 'education', 'Roorkee (2021-2025)', 50.0, 100.0, 'educationNode', 'GraduationCap', '#3b82f6'),
('edu-cdac', 'PGCP-AC (C-DAC Pune)', 'education', 'Adv. Computing (Feb 2026)', 50.0, 320.0, 'educationNode', 'Award', '#8b5cf6'),

-- Skill Nodes (Center Layer)
('skill-java', 'Advanced Java (17+)', 'skill', 'Core, OOP, Streams, Concurrency', 360.0, 60.0, 'skillNode', 'Coffee', '#f59e0b'),
('skill-spring', 'Spring Boot 3.x', 'skill', 'REST APIs, Data JPA, Security', 360.0, 180.0, 'skillNode', 'Leaf', '#10b981'),
('skill-react', 'React.js 19 & JS', 'skill', 'Vite, Hooks, Tailwind', 360.0, 300.0, 'skillNode', 'Atom', '#06b6d4'),
('skill-db', 'PostgreSQL & MySQL', 'skill', 'Relational DB, ACID, Queries', 360.0, 420.0, 'skillNode', 'Database', '#6366f1'),
('skill-devops', 'Docker & Maven', 'skill', 'Containers, Pipelines, Builds', 360.0, 540.0, 'skillNode', 'Box', '#ec4899'),

-- Project Nodes (Right Layer)
('proj-ecolift', 'ECOLIFT', 'project', 'Smart Carpooling (Java 17, Spring Boot, React 19)', 720.0, 160.0, 'projectNode', 'Car', '#10b981'),
('proj-wanderlust', 'WANDERLUST', 'project', 'Travel Web App (Node, Express, MongoDB)', 720.0, 380.0, 'projectNode', 'Compass', '#0ea5e9');

-- Journey Edges (React Flow)
INSERT IGNORE INTO journey_edge (edge_id, source_node_id, target_node_id, label, animated, style_color) VALUES
('e-coer-java', 'edu-coer', 'skill-java', 'Foundation', TRUE, '#3b82f6'),
('e-coer-db', 'edu-coer', 'skill-db', 'RDBMS', TRUE, '#3b82f6'),
('e-cdac-spring', 'edu-cdac', 'skill-spring', 'Enterprise Java', TRUE, '#8b5cf6'),
('e-cdac-react', 'edu-cdac', 'skill-react', 'Full-Stack Web', TRUE, '#8b5cf6'),
('e-cdac-devops', 'edu-cdac', 'skill-devops', 'Deployment & CI', TRUE, '#8b5cf6'),

('e-java-ecolift', 'skill-java', 'proj-ecolift', 'Core Logic', TRUE, '#10b981'),
('e-spring-ecolift', 'skill-spring', 'proj-ecolift', 'REST Backend', TRUE, '#10b981'),
('e-react-ecolift', 'skill-react', 'proj-ecolift', 'Interactive UI', TRUE, '#10b981'),
('e-db-ecolift', 'skill-db', 'proj-ecolift', 'PostgreSQL Schema', TRUE, '#10b981'),

('e-react-wanderlust', 'skill-react', 'proj-wanderlust', 'Frontend UI', TRUE, '#0ea5e9'),
('e-db-wanderlust', 'skill-db', 'proj-wanderlust', 'Data Modeling', TRUE, '#0ea5e9');
