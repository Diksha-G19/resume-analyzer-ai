package com.diksha.resumeanalyzer.service;

import com.diksha.resumeanalyzer.dto.JobMatchRequest;
import com.diksha.resumeanalyzer.dto.JobMatchResponse;
import com.diksha.resumeanalyzer.entity.Resume;
import com.diksha.resumeanalyzer.repository.ResumeRepository;
import org.springframework.stereotype.Service;

@Service
public class JobMatchService {

    private final ResumeRepository resumeRepository;
    private final AIService aiService;

    public JobMatchService(ResumeRepository resumeRepository,
                           AIService aiService) {
        this.resumeRepository = resumeRepository;
        this.aiService = aiService;
    }

    public JobMatchResponse matchResume(JobMatchRequest request) {

        Resume resume = resumeRepository.findById(request.getResumeId())
                .orElseThrow(() -> new RuntimeException("Resume not found"));

        return aiService.matchResume(
                resume.getExtractedText(),
                request.getJobDescription()
        );
    }
}
