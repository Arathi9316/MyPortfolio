package com.ashish.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PortfolioApplication {

    public static void main(String[] args) {
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("=================================================================");
        System.out.println("  Ashish Rathi - Full-Stack Developer Portfolio Backend Started  ");
        System.out.println("  API URL: http://localhost:8080/api/profile                      ");
        System.out.println("  Swagger/Endpoints: /api/projects, /api/skills, /api/journey/graph");
        System.out.println("=================================================================");
    }
}
