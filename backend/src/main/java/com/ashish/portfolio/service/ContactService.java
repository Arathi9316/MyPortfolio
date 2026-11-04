package com.ashish.portfolio.service;

import com.ashish.portfolio.dto.ContactRequest;
import com.ashish.portfolio.entity.ContactMessage;
import com.ashish.portfolio.repository.ContactMessageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public ContactService(ContactMessageRepository contactMessageRepository, EmailService emailService) {
        this.contactMessageRepository = contactMessageRepository;
        this.emailService = emailService;
    }

    public ContactMessage saveMessage(ContactRequest request) {
        // 1. Save to MySQL database for permanent record
        ContactMessage message = new ContactMessage();
        message.setName(request.getName());
        message.setEmail(request.getEmail());
        message.setSubject(request.getSubject() != null && !request.getSubject().isBlank() ? request.getSubject() : "Portfolio Contact Inquiry");
        message.setMessage(request.getMessage());
        message.setCreatedAt(LocalDateTime.now());
        ContactMessage saved = contactMessageRepository.save(message);

        // 2. Dispatch real-time email notification asynchronously
        try {
            emailService.sendContactNotification(request);
        } catch (Exception e) {
            log.error("Failed to trigger email notification: {}", e.getMessage());
        }

        return saved;
    }
}
