package com.ashish.portfolio.controller;

import com.ashish.portfolio.dto.ApiResponse;
import com.ashish.portfolio.entity.Skill;
import com.ashish.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final PortfolioService portfolioService;

    public SkillController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Skill>>> getAllSkills() {
        List<Skill> skills = portfolioService.getAllSkills();
        return ResponseEntity.ok(ApiResponse.ok("Skills fetched successfully", skills));
    }
}
