package com.ashish.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@SpringBootApplication
@EnableAsync
public class PortfolioApplication {

    public static void main(String[] args) {
        loadDotenv();
        SpringApplication.run(PortfolioApplication.class, args);
        System.out.println("=================================================================");
        System.out.println("  Ashish Rathi - Full-Stack Developer Portfolio Backend Started  ");
        System.out.println("  API URL: http://localhost:8080/api/profile                      ");
        System.out.println("  Swagger/Endpoints: /api/projects, /api/skills, /api/journey/graph");
        System.out.println("=================================================================");
    }

    private static void loadDotenv() {
        String[] searchPaths = { ".env", "backend/.env", "../.env", "../backend/.env" };
        for (String path : searchPaths) {
            File envFile = new File(path);
            if (envFile.exists() && envFile.isFile()) {
                System.out.println(">>> [.env] Detected environment file at: " + envFile.getAbsolutePath());
                try (BufferedReader reader = new BufferedReader(new FileReader(envFile))) {
                    String line;
                    int count = 0;
                    while ((line = reader.readLine()) != null) {
                        line = line.trim();
                        if (line.isEmpty() || line.startsWith("#") || !line.contains("=")) {
                            continue;
                        }
                        int eqIdx = line.indexOf('=');
                        String key = line.substring(0, eqIdx).trim();
                        String value = line.substring(eqIdx + 1).trim();

                        // Strip wrapping quotes
                        if ((value.startsWith("\"") && value.endsWith("\"")) ||
                            (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.substring(1, value.length() - 1);
                        }

                        // Google App Passwords often contain spaces (e.g. 'yaba wdzj sugv mxep') - strip spaces for SMTP AUTH
                        if ("MAIL_PASSWORD".equalsIgnoreCase(key)) {
                            value = value.replaceAll("\\s+", "");
                        }

                        // Inject into System properties so Spring Boot resolves ${KEY} placeholders
                        if (System.getProperty(key) == null && System.getenv(key) == null) {
                            System.setProperty(key, value);
                            count++;
                        }
                    }
                    System.out.println(">>> [.env] Successfully loaded " + count + " variables into Spring Boot environment.");
                } catch (IOException e) {
                    System.err.println(">>> [.env] Warning: Failed to read .env file: " + e.getMessage());
                }
                break;
            }
        }
    }
}
