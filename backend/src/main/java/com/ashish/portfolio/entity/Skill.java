package com.ashish.portfolio.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String category; // Backend, Frontend, Database, DevOps & Tools
    private Integer proficiency; // 1-100
    private String icon;
    private String description;

    public Skill() {}

    public Skill(Long id, String name, String category, Integer proficiency, String icon, String description) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.proficiency = proficiency;
        this.icon = icon;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Integer getProficiency() { return proficiency; }
    public void setProficiency(Integer proficiency) { this.proficiency = proficiency; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
