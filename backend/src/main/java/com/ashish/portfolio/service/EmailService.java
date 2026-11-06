package com.ashish.portfolio.service;

import com.ashish.portfolio.dto.ContactRequest;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String mailUsername;

    @Value("${portfolio.contact.recipient-email:rathiashish7079@gmail.com}")
    private String recipientEmail;

    @Value("${portfolio.email.web3forms-key:${WEB3FORMS_KEY:}}")
    private String web3formsKey;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Async
    public void sendContactNotification(ContactRequest request) {
        if (mailUsername == null || mailUsername.trim().isEmpty()) {
            log.info("--------------------------------------------------------------------------------");
            log.info("[CONTACT INQUIRY RECEIVED & STORED IN MYSQL]");
            log.info("From: {} <{}>", request.getName(), request.getEmail());
            log.info("Subject: {}", request.getSubject());
            log.info("Message: {}", request.getMessage());
            log.info("NOTE: Live SMTP dispatch skipped because 'spring.mail.username' is not set.");
            log.info("--------------------------------------------------------------------------------");
            sendViaHttpRelay(request);
            return;
        }

        try {
            log.info(">>> [EMAIL DISPATCH] Initiating email transmission via smtp.gmail.com for inquiry from: {} <{}>", request.getName(), request.getEmail());
            // 1. Send Notification Email to Ashish
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailUsername, "Ashish Portfolio Inquiries");
            helper.setTo(recipientEmail);
            helper.setReplyTo(request.getEmail(), request.getName());
            helper.setSubject("⚡ New Portfolio Inquiry: " + (request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Message") + " (from " + request.getName() + ")");

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a"));

            String htmlBody = String.format("""
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

            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info(">>> [EMAIL SUCCESS] Notification email successfully delivered to recipient: {}", recipientEmail);

            // 2. Send instant confirmation email back to the visitor
            sendConfirmationToVisitor(request);
        } catch (Exception e) {
            log.error(">>> [EMAIL ERROR] Failed to send contact notification email via SMTP: {}", e.getMessage(), e);
            log.info(">>> [EMAIL FALLBACK] Attempting HTTPS email relay fallback (Port 443)...");
            sendViaHttpRelay(request);
        }
    }

    private void sendConfirmationToVisitor(ContactRequest request) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(mailUsername, "Ashish Rathi | Full-Stack Developer");
            helper.setTo(request.getEmail());
            helper.setSubject("Thanks for reaching out, " + request.getName() + "!");

            String confirmationBody = String.format("""
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

            helper.setText(confirmationBody, true);
            mailSender.send(message);
            log.info("Confirmation email sent to visitor: {}", request.getEmail());
        } catch (Exception e) {
            log.warn("Could not dispatch confirmation email to visitor {}: {}", request.getEmail(), e.getMessage());
        }
    }

    private void sendViaHttpRelay(ContactRequest request) {
        if (web3formsKey == null || web3formsKey.isBlank()) {
            log.warn(">>> [HTTP RELAY NOTICE] No WEB3FORMS_KEY configured in environment. If your cloud host (e.g. Render) blocks outbound SMTP ports 587/465, configure WEB3FORMS_KEY to send emails via standard HTTPS (Port 443).");
            return;
        }

        try {
            log.info(">>> [HTTP RELAY] Sending inquiry email via Web3Forms HTTPS API (Port 443)...");
            java.net.http.HttpClient client = java.net.http.HttpClient.newBuilder()
                    .connectTimeout(java.time.Duration.ofSeconds(10))
                    .build();

            String jsonPayload = String.format("""
                {
                  "access_key": "%s",
                  "name": "%s",
                  "email": "%s",
                  "subject": "⚡ New Portfolio Inquiry: %s",
                  "message": "%s",
                  "from_name": "Ashish Portfolio Inquiry"
                }
                """,
                escapeJson(web3formsKey),
                escapeJson(request.getName()),
                escapeJson(request.getEmail()),
                escapeJson(request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Message"),
                escapeJson(request.getMessage())
            );

            java.net.http.HttpRequest httpRequest = java.net.http.HttpRequest.newBuilder()
                    .uri(java.net.URI.create("https://api.web3forms.com/submit"))
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .timeout(java.time.Duration.ofSeconds(15))
                    .POST(java.net.http.HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            java.net.http.HttpResponse<String> response = client.send(httpRequest, java.net.http.HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() >= 200 && response.statusCode() < 300) {
                log.info(">>> [HTTP RELAY SUCCESS] Inquiry email successfully dispatched to inbox via HTTPS API!");
            } else {
                log.error(">>> [HTTP RELAY ERROR] Web3Forms API returned status {}: {}", response.statusCode(), response.body());
            }
        } catch (Exception ex) {
            log.error(">>> [HTTP RELAY FAILED] Exception during HTTPS email relay: {}", ex.getMessage());
        }
    }

    private String escapeJson(String input) {
        if (input == null) return "";
        return input.replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\b", "\\b")
                    .replace("\f", "\\f")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r")
                    .replace("\t", "\\t");
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
