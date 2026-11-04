-- ===================================================================
-- MySQL Database Schema for Ashish Rathi Portfolio
-- Database: portfolio_db
-- ===================================================================

CREATE DATABASE IF NOT EXISTS portfolio_db1 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portfolio_db;

-- 1. Profile Table (Named user_profile to avoid collision with MySQL system profiles)
CREATE TABLE IF NOT EXISTS user_profile (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    title VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    phone VARCHAR(50),
    email VARCHAR(100),
    summary TEXT,
    github_url VARCHAR(255),
    linkedin_url VARCHAR(255),
    resume_url VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skill (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    proficiency INT,
    icon VARCHAR(50),
    description VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS project (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    subtitle VARCHAR(200),
    description TEXT,
    tech_stack VARCHAR(500),
    key_features TEXT,
    github_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    image_url VARCHAR(500),
    status VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Education Table
CREATE TABLE IF NOT EXISTS education (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    institution VARCHAR(200) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(150),
    duration VARCHAR(50),
    completion_date VARCHAR(50),
    grade_or_status VARCHAR(100),
    location VARCHAR(100),
    description TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Certifications Table
CREATE TABLE IF NOT EXISTS certification (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    issuer VARCHAR(150) NOT NULL,
    issue_date VARCHAR(50),
    credential_url VARCHAR(255),
    badge_color VARCHAR(50)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Journey Graph Nodes (React Flow)
CREATE TABLE IF NOT EXISTS journey_node (
    node_id VARCHAR(50) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    sub_label VARCHAR(150),
    x_pos DOUBLE,
    y_pos DOUBLE,
    node_type VARCHAR(50),
    icon_name VARCHAR(50),
    color VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Journey Graph Edges (React Flow)
CREATE TABLE IF NOT EXISTS journey_edge (
    edge_id VARCHAR(50) PRIMARY KEY,
    source_node_id VARCHAR(50) NOT NULL,
    target_node_id VARCHAR(50) NOT NULL,
    label VARCHAR(100),
    animated BOOLEAN DEFAULT TRUE,
    style_color VARCHAR(20)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_message (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(150),
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
