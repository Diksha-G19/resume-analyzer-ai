package com.diksha.resumeanalyzer.controller;

import com.diksha.resumeanalyzer.dto.ai.AIResponse;
import com.diksha.resumeanalyzer.service.AIService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @GetMapping("/api/ai/analyze/{id}")
    public AIResponse analyzeResume(@PathVariable Long id) {

        return aiService.analyzeResumeById(id);
    }
}