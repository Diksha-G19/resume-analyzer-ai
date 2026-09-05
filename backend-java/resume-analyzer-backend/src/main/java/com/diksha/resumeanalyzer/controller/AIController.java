package com.diksha.resumeanalyzer.controller;

import com.diksha.resumeanalyzer.dto.ai.AIResponse;
import com.diksha.resumeanalyzer.dto.JobMatchResponse;
import com.diksha.resumeanalyzer.service.AIService;
import com.diksha.resumeanalyzer.repository.ResumeRepository;
import com.diksha.resumeanalyzer.entity.Resume;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;
    private final ResumeRepository resumeRepository;

    public AIController(
            AIService aiService,
            ResumeRepository resumeRepository) {

        this.aiService = aiService;
        this.resumeRepository = resumeRepository;
    }

    // Resume Analysis
    @GetMapping("/analyze/{id}")
    public AIResponse analyzeResume(@PathVariable Long id) {

        return aiService.analyzeResumeById(id);
    }


    // Job Match
    @PostMapping("/match/{id}")
    public JobMatchResponse matchResume(
            @PathVariable Long id,
            @RequestBody String jobDescription) {

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return aiService.matchResume(
                resume.getExtractedText(),
                jobDescription
        );
    }
}