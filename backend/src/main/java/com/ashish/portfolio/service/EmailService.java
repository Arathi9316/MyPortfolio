package com.ashish.portfolio.service;

import com.ashish.portfolio.dto.ContactRequest;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    private static final String BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

    @Value("${brevo.api.key:${BREVO_API_KEY:}}")
    private String brevoApiKey;

    @Value("${brevo.sender.email:${BREVO_SENDER_EMAIL:rathiashish7079@gmail.com}}")
    private String senderEmail;

    @Value("${brevo.sender.name:${BREVO_SENDER_NAME:Ashish Rathi Portfolio}}")
    private String senderName;

    @Value("${portfolio.contact.recipient-email:${CONTACT_RECIPIENT_EMAIL:rathiashish7079@gmail.com}}")
    private String recipientEmail;

    // Optional legacy SMTP fallback
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(12))
            .build();

    public EmailService(@Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendContactNotification(ContactRequest request) {
        // Priority 1: Brevo HTTPS REST API (Port 443 - Cloud & Render Safe)
        if (brevoApiKey != null && !brevoApiKey.trim().isEmpty()) {
            sendViaBrevoApi(request);
            return;
        }

        // Priority 2: Standard SMTP (if configured)
        if (mailSender != null && mailUsername != null && !mailUsername.trim().isEmpty()) {
            sendViaSmtp(request);
            return;
        }

        // Informative log if neither is configured
        log.info("--------------------------------------------------------------------------------");
        log.info("[CONTACT INQUIRY RECEIVED & STORED IN DATABASE]");
        log.info("From: {} <{}>", request.getName(), request.getEmail());
        log.info("Subject: {}", request.getSubject());
        log.info("Message: {}", request.getMessage());
        log.info("NOTE: Live email dispatch skipped. Please set BREVO_API_KEY in your .env or cloud environment.");
        log.info("Get a free API key at https://app.brevo.com -> SMTP & API -> API Keys");
        log.info("--------------------------------------------------------------------------------");
    }

    private void sendViaBrevoApi(ContactRequest request) {
        try {
            log.info(">>> [BREVO API] Dispatching portfolio inquiry from '{}' <{}> via Brevo HTTPS API...", request.getName(), request.getEmail());

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"));
            String subject = "⚡ New Portfolio Inquiry: " + (request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Message") + " (from " + request.getName() + ")";
            String htmlContent = buildInquiryHtml(request, timestamp);

            // Construct Brevo v3 JSON payload
            String payload = String.format("""
                {
                  "sender": {
                    "name": "%s",
                    "email": "%s"
                  },
                  "to": [
                    {
                      "email": "%s",
                      "name": "Ashish Rathi"
                    }
                  ],
                  "replyTo": {
                    "email": "%s",
                    "name": "%s"
                  },
                  "subject": "%s",
                  "htmlContent": "%s"
                }
                """,
                escapeJson(senderName),
                escapeJson(senderEmail),
                escapeJson(recipientEmail),
                escapeJson(request.getEmail()),
                escapeJson(request.getName()),
                escapeJson(subject),
                escapeJson(htmlContent)
            );

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(BREVO_API_URL))
                    .header("api-key", brevoApiKey.trim())
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(15))
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info(">>> [BREVO API SUCCESS] Inquiry notification delivered to {}! Response: {}", recipientEmail, response.body());
                // Send auto-reply to visitor
                sendVisitorConfirmationViaBrevo(request);
            } else {
                log.error(">>> [BREVO API ERROR] Brevo returned HTTP {}: {}", response.statusCode(), response.body());
                if (mailSender != null && mailUsername != null && !mailUsername.trim().isEmpty()) {
                    log.info(">>> [BREVO FALLBACK] Attempting SMTP fallback...");
                    sendViaSmtp(request);
                }
            }
        } catch (Exception e) {
            log.error(">>> [BREVO API FAILED] Exception calling Brevo API: {}", e.getMessage(), e);
            if (mailSender != null && mailUsername != null && !mailUsername.trim().isEmpty()) {
                sendViaSmtp(request);
            }
        }
    }

    private void sendVisitorConfirmationViaBrevo(ContactRequest request) {
        try {
            String subject = "Thanks for reaching out, " + request.getName() + "!";
            String confirmationHtml = buildConfirmationHtml(request);

            String payload = String.format("""
                {
                  "sender": {
                    "name": "%s",
                    "email": "%s"
                  },
                  "to": [
                    {
                      "email": "%s",
                      "name": "%s"
                    }
                  ],
                  "subject": "%s",
                  "htmlContent": "%s"
                }
                """,
                escapeJson("Ashish Rathi | Full-Stack Developer"),
                escapeJson(senderEmail),
                escapeJson(request.getEmail()),
                escapeJson(request.getName()),
                escapeJson(subject),
                escapeJson(confirmationHtml)
            );

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(BREVO_API_URL))
                    .header("api-key", brevoApiKey.trim())
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .timeout(Duration.ofSeconds(15))
                    .POST(HttpRequest.BodyPublishers.ofString(payload))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info(">>> [BREVO API SUCCESS] Confirmation email delivered to visitor: {}", request.getEmail());
            } else {
                log.warn(">>> [BREVO VISITOR AUTO-REPLY WARN] Status {}: {}", response.statusCode(), response.body());
            }
        } catch (Exception e) {
            log.warn("Could not send visitor auto-reply via Brevo: {}", e.getMessage());
        }
    }

    private void sendViaSmtp(ContactRequest request) {
        try {
            log.info(">>> [SMTP DISPATCH] Initiating email transmission via SMTP for inquiry from: {} <{}>", request.getName(), request.getEmail());
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailUsername, senderName);
            helper.setTo(recipientEmail);
            helper.setReplyTo(request.getEmail(), request.getName());
            helper.setSubject("⚡ New Portfolio Inquiry: " + (request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Message") + " (from " + request.getName() + ")");

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"));
            helper.setText(buildInquiryHtml(request, timestamp), true);

            mailSender.send(message);
            log.info(">>> [SMTP SUCCESS] Notification email successfully delivered to recipient: {}", recipientEmail);

            sendConfirmationToVisitorViaSmtp(request);
        } catch (Exception e) {
            log.error(">>> [SMTP ERROR] Failed to send contact notification email via SMTP: {}", e.getMessage(), e);
        }
    }

    private void sendConfirmationToVisitorViaSmtp(ContactRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailUsername, "Ashish Rathi | Full-Stack Developer");
            helper.setTo(request.getEmail());
            helper.setSubject("Thanks for reaching out, " + request.getName() + "!");
            helper.setText(buildConfirmationHtml(request), true);

            mailSender.send(message);
            log.info("Confirmation email sent to visitor via SMTP: {}", request.getEmail());
        } catch (Exception e) {
            log.warn("Could not dispatch confirmation email to visitor via SMTP {}: {}", request.getEmail(), e.getMessage());
        }
    }

    private String buildInquiryHtml(ContactRequest request, String timestamp) {
        return String.format("""
            <div style="margin: 0; padding: 24px 12px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                    <!-- Glowing Header Banner -->
                    <div style="background: linear-gradient(135deg, #4f46e5 0%%, #7c3aed 50%%, #2563eb 100%%); padding: 30px 24px; text-align: left;">
                        <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            ⚡ New Portfolio Inquiry
                        </span>
                        <h1 style="margin: 12px 0 4px; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                            %s sent you a message
                        </h1>
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.85); font-size: 12px;">
                            Received on %s &bull; Stored in Database
                        </p>
                    </div>

                    <!-- Card Body -->
                    <div style="padding: 24px;">
                        <!-- Sender Meta Box -->
                        <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                            <div style="margin-bottom: 12px;">
                                <span style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Sender Name</span>
                                <span style="font-size: 16px; font-weight: 600; color: #f8fafc;">%s</span>
                            </div>
                            <div style="margin-bottom: 12px;">
                                <span style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Email Address</span>
                                <a href="mailto:%s" style="font-size: 14px; font-weight: 600; color: #818cf8; text-decoration: none;">%s</a>
                            </div>
                            <div>
                                <span style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">Subject</span>
                                <span style="font-size: 14px; font-weight: 500; color: #38bdf8;">%s</span>
                            </div>
                        </div>

                        <!-- Message Box -->
                        <div style="margin-bottom: 26px;">
                            <span style="font-size: 11px; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Message Content</span>
                            <div style="background-color: #090d16; border-left: 4px solid #6366f1; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; border-bottom: 1px solid #1e293b; padding: 18px; border-radius: 10px; font-size: 14px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap;">%s</div>
                        </div>

                        <!-- Action CTA -->
                        <div style="text-align: center; margin: 28px 0 12px;">
                            <a href="mailto:%s?subject=Re: %s" style="display: inline-block; background: linear-gradient(135deg, #4f46e5 0%%, #7c3aed 100%%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 12px; font-size: 14px; font-weight: 700; box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);">
                                Reply to %s &rarr;
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #090d16; border-top: 1px solid #1e293b; padding: 16px; text-align: center; font-size: 11px; color: #64748b;">
                        Ashish Rathi &bull; Full-Stack Developer Portfolio &bull; Pune, MH
                    </div>
                </div>
            </div>
            """,
            escapeHtml(request.getName()),
            timestamp,
            escapeHtml(request.getName()),
            escapeHtml(request.getEmail()),
            escapeHtml(request.getEmail()),
            escapeHtml(request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "General Inquiry"),
            escapeHtml(request.getMessage()),
            escapeHtml(request.getEmail()),
            escapeHtml(request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Your inquiry"),
            escapeHtml(request.getName())
        );
    }

    private String buildConfirmationHtml(ContactRequest request) {
        return String.format("""
            <div style="margin: 0; padding: 24px 12px; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #0f172a; border: 1px solid #1e293b; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
                    <!-- Header Banner -->
                    <div style="background: linear-gradient(135deg, #10b981 0%%, #06b6d4 100%%); padding: 28px 24px; text-align: left;">
                        <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(8px); color: #ffffff; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            &bull; Message Received
                        </span>
                        <h1 style="margin: 12px 0 4px; color: #ffffff; font-size: 22px; font-weight: 800; letter-spacing: -0.3px;">
                            Thanks for reaching out, %s!
                        </h1>
                        <p style="margin: 0; color: rgba(255, 255, 255, 0.9); font-size: 13px;">
                            I have received your message and will review it promptly.
                        </p>
                    </div>

                    <!-- Card Body -->
                    <div style="padding: 24px;">
                        <p style="font-size: 15px; line-height: 1.6; color: #cbd5e1; margin-top: 0;">
                            Hi <strong style="color: #f8fafc;">%s</strong>,
                        </p>
                        <p style="font-size: 14px; line-height: 1.6; color: #94a3b8;">
                            Thank you for getting in touch through my portfolio. Here is a summary of what you submitted:
                        </p>

                        <!-- Quoted Message -->
                        <div style="background-color: #090d16; border-left: 4px solid #10b981; border-top: 1px solid #1e293b; border-right: 1px solid #1e293b; border-bottom: 1px solid #1e293b; padding: 18px; border-radius: 10px; margin: 18px 0; font-size: 14px; line-height: 1.6; color: #e2e8f0; font-style: italic;">
                            "%s"
                        </div>

                        <!-- Developer Signature Box -->
                        <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 18px; margin-top: 24px;">
                            <table width="100%%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td>
                                        <strong style="color: #f8fafc; font-size: 16px; display: block;">Ashish Rathi</strong>
                                        <span style="color: #38bdf8; font-size: 13px; font-weight: 500; display: block; margin-top: 2px;">
                                            Java Full-Stack Developer &bull; C-DAC Pune (PGCP-AC) &amp; COER
                                        </span>
                                        <p style="margin: 10px 0 0; font-size: 12px; color: #94a3b8;">
                                                Pune, Maharashtra &bull; +91 7037283879 &bull; <a href="mailto:rathiashish7079@gmail.com" style="color: #818cf8; text-decoration: none;">rathiashish7079@gmail.com</a>
                                        </p>
                                        <div style="margin-top: 12px;">
                                            <a href="https://github.com/Arathi9316" style="display: inline-block; background-color: #334155; color: #ffffff; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600; margin-right: 6px;">GitHub</a>
                                            <a href="https://www.linkedin.com/in/ashish-rathi-428237226/" style="display: inline-block; background-color: #334155; color: #ffffff; text-decoration: none; padding: 6px 12px; border-radius: 6px; font-size: 11px; font-weight: 600;">LinkedIn</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color: #090d16; border-top: 1px solid #1e293b; padding: 14px; text-align: center; font-size: 11px; color: #64748b;">
                        This is an automated confirmation sent from Ashish Rathi's portfolio system.
                    </div>
                </div>
            </div>
            """,
            escapeHtml(request.getName()),
            escapeHtml(request.getName()),
            escapeHtml(request.getMessage())
        );
    }

    private String escapeJson(String input) {
        if (input == null) return "";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < input.length(); i++) {
            char ch = input.charAt(i);
            switch (ch) {
                case '"' -> sb.append("\\\"");
                case '\\' -> sb.append("\\\\");
                case '\b' -> sb.append("\\b");
                case '\f' -> sb.append("\\f");
                case '\n' -> sb.append("\\n");
                case '\r' -> sb.append("\\r");
                case '\t' -> sb.append("\\t");
                default -> {
                    if (ch < ' ') {
                        String hex = Integer.toHexString(ch);
                        sb.append("\\u").append("0".repeat(4 - hex.length())).append(hex);
                    } else {
                        sb.append(ch);
                    }
                }
            }
        }
        return sb.toString();
    }

    private String escapeHtml(String input) {
        if (input == null) return "";
        return input.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("\"", "&quot;")
                    .replace("'", "&#39;");
    }
}