package com.ashish.portfolio.controller;

import com.ashish.portfolio.dto.ApiResponse;
import com.ashish.portfolio.entity.Profile;
import com.ashish.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final PortfolioService portfolioService;

    public ProfileController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Profile>> getProfile() {
        return portfolioService.getProfile()
            .map(profile -> ResponseEntity.ok(ApiResponse.ok(profile)))
            .orElseGet(() -> ResponseEntity.ok(ApiResponse.ok(new Profile(
                "Ashish Rathi",
                "Java Full-Stack Developer",
                "Pune, Maharashtra",
                "+91 7037283879",
                "rathiashish7079@gmail.com",
                "Java Full-Stack Developer with a PGCP-AC in Advanced Computing from C-DAC Pune and a B.Tech in CS. Experienced in RESTful APIs, React.js, Spring Boot, and PostgreSQL/MySQL.",
                "https://github.com",
                "https://linkedin.com",
                "/Ashish_Resume.pdf"
            ))));
    }
}
