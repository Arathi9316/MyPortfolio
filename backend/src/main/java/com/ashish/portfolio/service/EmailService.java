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
            log.info("NOTE: Live email dispatch is disabled because 'spring.mail.username' is not set.");
            log.info("To receive real emails in your inbox, set MAIL_USERNAME and MAIL_PASSWORD in application.properties or environment variables.");
            log.info("--------------------------------------------------------------------------------");
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
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
                    <div style="background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 20px; border-radius: 12px; color: #ffffff; text-align: center;">
                        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">⚡ New Portfolio Message</h2>
                        <p style="margin: 6px 0 0; font-size: 13px; opacity: 0.9;">Received on %s</p>
                    </div>

                    <div style="padding: 24px 8px;">
                        <div style="margin-bottom: 16px;">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Sender Information</span>
                            <p style="margin: 0; font-size: 15px; font-weight: 600; color: #0f172a;">%s</p>
                            <a href="mailto:%s" style="font-size: 14px; color: #4f46e5; text-decoration: none;">%s</a>
                        </div>

                        <div style="margin-bottom: 16px;">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Subject</span>
                            <p style="margin: 0; font-size: 15px; font-weight: 500; color: #0f172a;">%s</p>
                        </div>

                        <div style="margin-top: 20px;">
                            <span style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">Message</span>
                            <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">%s</div>
                        </div>

                        <div style="margin-top: 24px; text-align: center;">
                            <a href="mailto:%s?subject=Re: %s" style="display: inline-block; background-color: #4f46e5; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600;">Reply to %s</a>
                        </div>
                    </div>

                    <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
                        Ashish Rathi Full-Stack Developer Portfolio • Stored in MySQL
                    </div>
                </div>
                """,
                timestamp,
                escapeHtml(request.getName()),
                escapeHtml(request.getEmail()),
                escapeHtml(request.getEmail()),
                escapeHtml(request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "General Inquiry"),
                escapeHtml(request.getMessage()),
                escapeHtml(request.getEmail()),
                escapeHtml(request.getSubject() != null ? request.getSubject() : "Your inquiry"),
                escapeHtml(request.getName())
            );

            helper.setText(htmlBody, true);
            mailSender.send(message);
            log.info(">>> [EMAIL SUCCESS] Notification email successfully delivered to recipient: {}", recipientEmail);

            // 2. Send instant confirmation email back to the visitor
            sendConfirmationToVisitor(request);
        } catch (Exception e) {
            log.error(">>> [EMAIL ERROR] Failed to send contact notification email: {}", e.getMessage(), e);
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
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
                    <div style="background: linear-gradient(135deg, #10b981, #06b6d4); padding: 18px; border-radius: 12px; color: #ffffff; text-align: center;">
                        <h2 style="margin: 0; font-size: 18px; font-weight: 700;">Message Received!</h2>
                    </div>

                    <div style="padding: 20px 8px;">
                        <p style="font-size: 15px; line-height: 1.6; color: #334155;">Hi <strong>%s</strong>,</p>
                        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                            Thank you for reaching out via my portfolio website. I have received your message regarding "<strong>%s</strong>" and will review your inquiry and get back to you as soon as possible.
                        </p>

                        <div style="background-color: #f8fafc; border-left: 3px solid #10b981; padding: 12px 16px; border-radius: 8px; margin: 18px 0; font-size: 13px; color: #64748b; font-style: italic;">
                            "%s"
                        </div>

                        <p style="font-size: 14px; line-height: 1.6; color: #334155;">
                            Best regards,<br/>
                            <strong style="color: #0f172a;">Ashish Rathi</strong><br/>
                            <span style="font-size: 12px; color: #64748b;">Java Full-Stack Developer | C-DAC Pune & COER</span>
                        </p>
                    </div>

                    <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; text-align: center; font-size: 12px; color: #94a3b8;">
                        Pune, Maharashtra | +91 7037283879 | rathiashish7079@gmail.com
                    </div>
                </div>
                """,
                escapeHtml(request.getName()),
                escapeHtml(request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Your inquiry"),
                escapeHtml(request.getMessage())
            );

            helper.setText(confirmationBody, true);
            mailSender.send(message);
            log.info("Confirmation email sent to visitor: {}", request.getEmail());
        } catch (Exception e) {
            log.warn("Could not dispatch confirmation email to visitor {}: {}", request.getEmail(), e.getMessage());
        }
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
