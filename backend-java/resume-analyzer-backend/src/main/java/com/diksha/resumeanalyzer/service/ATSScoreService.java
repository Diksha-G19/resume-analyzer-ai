package com.diksha.resumeanalyzer.service;

import com.diksha.resumeanalyzer.dto.ATSResponse;
import com.diksha.resumeanalyzer.entity.Resume;
import com.diksha.resumeanalyzer.repository.ResumeRepository;
import com.diksha.resumeanalyzer.dto.ParsedResume;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ATSScoreService {

    private final ResumeRepository resumeRepository;
    private final ResumeParserService resumeParserService;

    public ATSScoreService(ResumeRepository resumeRepository,
                           ResumeParserService resumeParserService) {

        this.resumeRepository = resumeRepository;
        this.resumeParserService = resumeParserService;
    }

    public ATSResponse calculateScore(ParsedResume resume) {

        ATSResponse response = new ATSResponse();

        List<String> suggestions = new ArrayList<>();

        // Individual Scores
        int contactScore = calculateContactScore(resume, suggestions);
        int summaryScore = calculateSummaryScore(resume, suggestions);
        int skillsScore = calculateSkillsScore(resume, suggestions);
        int educationScore = calculateEducationScore(resume, suggestions);
        int projectsScore = calculateProjectsScore(resume, suggestions);

        // Set Scores
        response.setContactScore(contactScore);
        response.setSummaryScore(summaryScore);
        response.setSkillsScore(skillsScore);
        response.setEducationScore(educationScore);
        response.setProjectsScore(projectsScore);

        // Overall Score
        int overall =
                (contactScore
                        + summaryScore
                        + skillsScore
                        + educationScore
                        + projectsScore) / 5;

        response.setOverallScore(overall);
        response.setSuggestions(suggestions);

        return response;
    }

    public ATSResponse calculateScoreByResumeId(Long id) {

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        ParsedResume parsedResume =
                resumeParserService.parseResume(
                        resume.getExtractedText());

        return calculateScore(parsedResume);
    }

    private int calculateContactScore(
            ParsedResume resume,
            List<String> suggestions) {

        int score = 0;

        if (!resume.getName().isBlank()) {
            score += 35;
        } else {
            suggestions.add("Add your full name.");
        }

        if (!resume.getEmail().isBlank()) {
            score += 35;
        } else {
            suggestions.add("Add a professional email address.");
        }

        if (!resume.getPhone().isBlank()) {
            score += 30;
        } else {
            suggestions.add("Add your phone number.");
        }

        return score;
    }

    private int calculateSummaryScore(
            ParsedResume resume,
            List<String> suggestions) {

        String summary = resume.getSummary();

        if (summary == null || summary.isBlank()) {

            suggestions.add("Add a professional summary.");

            return 0;
        }

        if (summary.length() < 80) {

            suggestions.add("Expand your professional summary.");

            return 60;
        }

        return 100;
    }

    private int calculateSkillsScore(
            ParsedResume resume,
            List<String> suggestions) {

        if (resume.getSkills() == null) {

            suggestions.add("Add technical skills.");

            return 0;
        }

        int count = resume.getSkills().size();

        if (count >= 10) {

            return 100;

        } else if (count >= 6) {

            return 80;

        } else if (count >= 3) {

            suggestions.add(
                    "Include more relevant technical skills.");

            return 60;
        }

        suggestions.add("Add more technical skills.");

        return 30;
    }

    private int calculateEducationScore(
            ParsedResume resume,
            List<String> suggestions) {

        String education = resume.getEducation();

        if (education == null || education.isBlank()) {

            suggestions.add("Add your education details.");

            return 0;
        }

        return 100;
    }

    private int calculateProjectsScore(
            ParsedResume resume,
            List<String> suggestions) {

        String projects = resume.getProjects();

        if (projects == null || projects.isBlank()) {

            suggestions.add("Add academic or personal projects.");

            return 0;
        }

        int lines = projects.split("\\R").length;

        if (lines > 8) {

            return 100;

        } else {

            suggestions.add(
                    "Describe your projects in more detail.");

            return 70;
        }
    }


}