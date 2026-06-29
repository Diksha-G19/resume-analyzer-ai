package com.diksha.resumeanalyzer.service;

import com.diksha.resumeanalyzer.entity.Resume;
import com.diksha.resumeanalyzer.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.diksha.resumeanalyzer.entity.User;
import com.diksha.resumeanalyzer.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;

@Service
public class ResumeService {

    private final String uploadDir = "uploads/";

    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    public ResumeService(ResumeRepository resumeRepository,
                         UserRepository userRepository) {

        this.resumeRepository = resumeRepository;
        this.userRepository = userRepository;
    }

    public String uploadResume(MultipartFile file) throws IOException {

        Path path = Paths.get(uploadDir);

        if (!Files.exists(path)) {
            Files.createDirectories(path);
        }

        Path filePath = path.resolve(file.getOriginalFilename());

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        String extractedText = extractTextFromPDF(filePath);


        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        Resume resume = new Resume();

        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(filePath.toString());
        resume.setUploadTime(LocalDateTime.now());
        resume.setExtractedText(extractedText);

        resume.setUser(user);

        resumeRepository.save(resume);
        System.out.println(resume.getExtractedText().substring(0,100));

        return file.getOriginalFilename();
    }
    private String extractTextFromPDF(Path filePath) throws IOException {

        try (PDDocument document = Loader.loadPDF(filePath.toFile())) {

            PDFTextStripper stripper = new PDFTextStripper();

            return stripper.getText(document);
        }
    }
}
