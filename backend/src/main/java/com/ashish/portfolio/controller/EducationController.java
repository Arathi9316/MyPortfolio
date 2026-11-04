package com.ashish.portfolio.controller;

import com.ashish.portfolio.dto.ApiResponse;
import com.ashish.portfolio.entity.Education;
import com.ashish.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    private final PortfolioService portfolioService;

    public EducationController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Education>>> getAllEducation() {
        List<Education> educationList = portfolioService.getAllEducation();
        return ResponseEntity.ok(ApiResponse.ok("Education records fetched successfully", educationList));
    }
}
