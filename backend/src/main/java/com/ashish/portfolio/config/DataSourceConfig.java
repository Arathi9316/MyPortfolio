package com.ashish.portfolio.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.net.URI;

@Configuration
public class DataSourceConfig {

    private static final Logger log = LoggerFactory.getLogger(DataSourceConfig.class);

    @Value("${spring.datasource.url}")
    private String rawUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Value("${spring.datasource.driver-class-name:com.mysql.cj.jdbc.Driver}")
    private String driverClassName;

    @Bean
    @Primary
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();

        String jdbcUrl = rawUrl;
        String user = username;
        String pass = password;

        // Auto-detect and parse cloud URIs like mysql://user:pass@host:port/database (TiDB Cloud, Aiven, Railway)
        if (rawUrl != null && (rawUrl.startsWith("mysql://") || rawUrl.startsWith("postgres://") || rawUrl.startsWith("postgresql://"))) {
            try {
                URI uri = new URI(rawUrl);
                String host = uri.getHost();
                int port = uri.getPort() != -1 ? uri.getPort() : 3306;
                String path = uri.getPath();

                // Prevent connecting to system maintenance database /sys
                if (path == null || path.isBlank() || path.equals("/") || path.equals("/sys")) {
                    path = "/test";
                }

                if (uri.getUserInfo() != null && !uri.getUserInfo().isBlank()) {
                    String[] userParts = uri.getUserInfo().split(":", 2);
                    user = userParts[0];
                    if (userParts.length > 1) {
                        pass = userParts[1];
                    }
                }

                // Build full JDBC URL with mandatory SSL/TLS parameters for TiDB Cloud & Cloud MySQL
                jdbcUrl = "jdbc:mysql://" + host + ":" + port + path 
                        + "?sslMode=VERIFY_IDENTITY&enabledTLSProtocols=TLSv1.2,TLSv1.3&useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true";

                log.info("Successfully converted cloud URI to JDBC URL: jdbc:mysql://{}:{}{}", host, port, path);
            } catch (Exception e) {
                log.warn("Could not parse cloud URI, adding jdbc: prefix: {}", e.getMessage());
                jdbcUrl = "jdbc:" + rawUrl;
            }
        } else if (rawUrl != null && !rawUrl.startsWith("jdbc:")) {
            jdbcUrl = "jdbc:" + rawUrl;
        }

        config.setJdbcUrl(jdbcUrl);
        config.setUsername(user);
        config.setPassword(pass);
        config.setDriverClassName(driverClassName);

        // Optimal pool tuning for cloud free-tiers
        config.setMaximumPoolSize(5);
        config.setMinimumIdle(1);
        config.setIdleTimeout(300000);
        config.setMaxLifetime(600000);
        config.setConnectionTimeout(30000);

        return new HikariDataSource(config);
    }
}
