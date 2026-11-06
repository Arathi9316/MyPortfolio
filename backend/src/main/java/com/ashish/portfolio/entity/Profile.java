package com.ashish.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "user_profile")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String title;

    private String location;
    private String phone;
    private String email;

    @Column(length = 2000)
    private String summary;

    private String githubUrl;
    private String linkedinUrl;
    private String resumeUrl;

    public Profile() {}

    public Profile( String fullName, String title, String location, String phone, 
                   String email, String summary, String githubUrl, String linkedinUrl, String resumeUrl) {
        this.fullName = fullName;
        this.title = title;
        this.location = location;
        this.phone = phone;
        this.email = email;
        this.summary = summary;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.resumeUrl = resumeUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getGithubUrl() { return githubUrl; }
    public void setGithubUrl(String githubUrl) { this.githubUrl = githubUrl; }

    public String getLinkedinUrl() { return linkedinUrl; }
    public void setLinkedinUrl(String linkedinUrl) { this.linkedinUrl = linkedinUrl; }

    public String getResumeUrl() { return resumeUrl; }
    public void setResumeUrl(String resumeUrl) { this.resumeUrl = resumeUrl; }
}
