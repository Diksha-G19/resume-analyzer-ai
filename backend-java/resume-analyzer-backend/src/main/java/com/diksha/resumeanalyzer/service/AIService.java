package com.diksha.resumeanalyzer.service;

import com.diksha.resumeanalyzer.dto.ai.AIRequest;
import com.diksha.resumeanalyzer.dto.ai.AIResponse;
import com.diksha.resumeanalyzer.repository.ResumeRepository;
import com.diksha.resumeanalyzer.dto.ai.JobMatchAIRequest;
import com.diksha.resumeanalyzer.dto.JobMatchResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.diksha.resumeanalyzer.entity.Resume;
import com.diksha.resumeanalyzer.dto.ParsedResume;

@Service
public class AIService {

    private final ResumeRepository resumeRepository;
    private final ResumeParserService resumeParserService;
    private final RestTemplate restTemplate;


    public AIService(RestTemplate restTemplate,
                     ResumeRepository resumeRepository,
                     ResumeParserService resumeParserService) {

        this.restTemplate = restTemplate;
        this.resumeRepository = resumeRepository;
        this.resumeParserService = resumeParserService;
    }

    public AIResponse analyzeResume(String resumeText) {

        System.out.println("=== AI ANALYSIS STARTED ===");

        String url = "http://127.0.0.1:8000/analyze";

        System.out.println("Parsing resume...");

        ParsedResume parsed = resumeParserService.parseResume(resumeText);

        System.out.println("Resume parsed successfully.");
        System.out.println("Name: " + parsed.getName());
        System.out.println("Skills: " + parsed.getSkills());

        AIRequest request = new AIRequest();

        request.setName(parsed.getName());
        request.setSummary(parsed.getSummary());
        request.setSkills(parsed.getSkills());
        request.setEducation(parsed.getEducation());
        request.setProjects(parsed.getProjects());
        request.setExperience(parsed.getExperience());
        request.setInternships(parsed.getInternships());
        request.setCertifications(parsed.getCertifications());

        System.out.println("Sending request to FastAPI...");

        AIResponse response = restTemplate.postForObject(
                url,
                request,
                AIResponse.class
        );

        System.out.println("FastAPI response received.");

        if (response == null) {
            System.out.println("WARNING: FastAPI returned null response.");
        } else {
            System.out.println("Strengths: " + response.getStrengths());
            System.out.println("Weaknesses: " + response.getWeaknesses());
            System.out.println("Suggestions: " + response.getSuggestions());
        }

        System.out.println("=== AI ANALYSIS FINISHED ===");

        return response;
    }

    public AIResponse analyzeResumeById(Long resumeId) {

        System.out.println("Analyzing resume ID: " + resumeId);

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        System.out.println("Resume found: " + resume.getFileName());

        return analyzeResume(resume.getExtractedText());
    }

    public JobMatchResponse matchResume(String resumeText,
                                        String jobDescription) {

        String url = "http://127.0.0.1:8000/match";

        ParsedResume parsed = resumeParserService.parseResume(resumeText);

        JobMatchAIRequest request = new JobMatchAIRequest();
        request.setResume(parsed);
        request.setJobDescription(jobDescription);

        return restTemplate.postForObject(
                url,
                request,
                JobMatchResponse.class
        );
    }
}
