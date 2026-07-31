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

        String url = "http://127.0.0.1:8000/analyze";

        ParsedResume parsed = resumeParserService.parseResume(resumeText);
        AIRequest request = new AIRequest();

        request.setName(parsed.getName());
        request.setSummary(parsed.getSummary());
        request.setSkills(parsed.getSkills());

        request.setEducation(parsed.getEducation());
        request.setProjects(parsed.getProjects());
        request.setExperience(parsed.getExperience());
        request.setInternships(parsed.getInternships());
        request.setCertifications(parsed.getCertifications());


        return restTemplate.postForObject(
                url,
                request,
                AIResponse.class
        );
    }
    public AIResponse analyzeResumeById(Long resumeId) {

        Resume resume = resumeRepository.findById(resumeId)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

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
