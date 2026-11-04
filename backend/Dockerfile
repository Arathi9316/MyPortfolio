# ===================================================================
# Multi-stage Dockerfile for Spring Boot 3.4.0 (Java 17)
# ===================================================================

# 1. Build Stage
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /workspace

# Cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy sources and build executable jar
COPY src ./src
RUN mvn clean package -DskipTests

# 2. Runtime Stage
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Non-root user for cloud security
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

COPY --from=builder /workspace/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
