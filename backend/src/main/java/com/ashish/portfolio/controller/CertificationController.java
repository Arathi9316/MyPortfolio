package com.ashish.portfolio.controller;

import com.ashish.portfolio.dto.ApiResponse;
import com.ashish.portfolio.entity.Certification;
import com.ashish.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    private final PortfolioService portfolioService;

    public CertificationController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Certification>>> getAllCertifications() {
        List<Certification> certifications = portfolioService.getAllCertifications();
        return ResponseEntity.ok(ApiResponse.ok("Certifications fetched successfully", certifications));
    }
}
