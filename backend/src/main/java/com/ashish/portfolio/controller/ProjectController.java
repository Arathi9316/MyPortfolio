package com.ashish.portfolio.controller;

import com.ashish.portfolio.dto.ApiResponse;
import com.ashish.portfolio.entity.Project;
import com.ashish.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    private final PortfolioService portfolioService;

    public ProjectController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Project>>> getAllProjects() {
        List<Project> projects = portfolioService.getAllProjects();
        return ResponseEntity.ok(ApiResponse.ok("Projects fetched successfully", projects));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> getProjectById(@PathVariable Long id) {
        return portfolioService.getProjectById(id)
            .map(project -> ResponseEntity.ok(ApiResponse.ok(project)))
            .orElseGet(() -> ResponseEntity.status(404).body(ApiResponse.error("Project not found with id " + id)));
    }
}
