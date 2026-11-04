package com.ashish.portfolio.controller;

import com.ashish.portfolio.dto.ApiResponse;
import com.ashish.portfolio.dto.GraphResponse;
import com.ashish.portfolio.service.PortfolioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/journey")
@CrossOrigin(origins = "*")
public class JourneyGraphController {

    private final PortfolioService portfolioService;

    public JourneyGraphController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/graph")
    public ResponseEntity<ApiResponse<GraphResponse>> getJourneyGraph() {
        GraphResponse graph = portfolioService.getJourneyGraph();
        return ResponseEntity.ok(ApiResponse.ok("Journey graph loaded successfully", graph));
    }
}
