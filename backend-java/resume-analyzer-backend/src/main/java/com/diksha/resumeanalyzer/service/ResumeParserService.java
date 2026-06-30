package com.diksha.resumeanalyzer.service;

import com.diksha.resumeanalyzer.dto.ParsedResume;
import org.springframework.stereotype.Service;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.diksha.resumeanalyzer.entity.Resume;
import com.diksha.resumeanalyzer.repository.ResumeRepository;
import java.util.*;



@Service
public class ResumeParserService {
    private final ResumeRepository resumeRepository;

    public ResumeParserService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    public ParsedResume parseResume(String text) {

        ParsedResume parsedResume = new ParsedResume();

        parsedResume.setName(extractName(text));
        parsedResume.setEmail(extractEmail(text));
        parsedResume.setPhone(extractPhone(text));
        parsedResume.setSkills(extractSkills(text));
        parsedResume.setEducation(
                extractSection(text, "education"));

        parsedResume.setProjects(
                extractSection(text, "projects", "academic projects"));

        parsedResume.setExperience(
                extractSection(text,
                        "experience",
                        "work experience",
                        "professional experience"));

        parsedResume.setInternships(
                extractSection(text,
                        "internships",
                        "internship"));

        parsedResume.setCertifications(
                extractSection(text,
                        "certifications",
                        "certificates"));

        parsedResume.setSummary(
                extractSection(text,
                        "summary",
                        "professional summary",
                        "profile",
                        "objective"));


        return parsedResume;
    }
    public ParsedResume parseResumeById(Long id) {

        Resume resume = resumeRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Resume not found"));

        return parseResume(resume.getExtractedText());
    }


    private String extractName(String text) {

        String[] lines = text.split("\\R");

        for (String line : lines) {

            line = line.trim();

            if (line.isEmpty()) {
                continue;
            }

            if (line.contains("@")
                    || line.matches(".*\\d.*")
                    || line.toLowerCase().contains("linkedin")
                    || line.toLowerCase().contains("github")) {

                continue;
            }

            String[] words = line.split("\\s+");

            if (words.length >= 2 && words.length <= 4) {
                return line;
            }
        }

        return "";
    }

    private String extractEmail(String text) {

        String regex =
                "[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+";

        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group();
        }

        return "";
    }

    private String extractPhone(String text) {

        String regex =
                "(\\+91[- ]?)?[6-9]\\d{9}";

        Pattern pattern = Pattern.compile(regex);

        Matcher matcher = pattern.matcher(text);

        if (matcher.find()) {
            return matcher.group();
        }

        return "";
    }

    private static final List<String> SKILL_DICTIONARY = List.of(

            // Programming Languages
            "Java",
            "Python",
            "C",
            "C++",

            // Frameworks
            "Spring",
            "Spring Boot",
            "Hibernate",

            // Databases
            "MySQL",
            "PostgreSQL",
            "MongoDB",

            // Version Control
            "Git",
            "GitHub",

            // Operating Systems
            "Linux",

            // Cloud & DevOps
            "Docker",
            "Kubernetes",
            "AWS",
            "Azure",

            // Frontend
            "HTML",
            "CSS",
            "JavaScript",
            "React",

            // Backend
            "Node.js",
            "REST API",

            // Data Science
            "Machine Learning",
            "Deep Learning",
            "TensorFlow",
            "PyTorch",

            // Analytics
            "Power BI",
            "Tableau"
    );

    private List<String> extractSkills(String text) {

        List<String> skills = new ArrayList<>();

        String lowerText = text.toLowerCase();

        for (String skill : SKILL_DICTIONARY) {

            if (lowerText.contains(skill.toLowerCase())) {
                skills.add(skill);
            }
        }

        return skills;
    }


    private String extractSection(String text, String... headings) {

        String[] lines = text.split("\\R");

        boolean collecting = false;

        StringBuilder section = new StringBuilder();

        Set<String> headingSet = new HashSet<>();

        for (String heading : headings) {
            headingSet.add(heading.toLowerCase());
        }

        Set<String> allHeadings = Set.of(

                "education",

                "experience",
                "work experience",
                "professional experience",

                "internship",
                "internships",

                "projects",
                "academic projects",

                "skills",
                "technical skills",

                "summary",
                "professional summary",
                "profile",
                "objective",

                "certification",
                "certifications",
                "certificates",
                "certifications & achievements",

                "achievements",

                "languages",

                "interests",

                "position of responsibility",
                "positions of responsibility"
        );

        for (String line : lines) {

            String clean = line.trim().toLowerCase();

            clean = clean.replace(":", "");

            if (!collecting) {

                if (isHeading(clean, headingSet)) {
                    collecting = true;
                    continue;
                }

            } else {

                if (isHeading(clean, allHeadings)) {
                    break;
                }

                section.append(line).append("\n");
            }
        }

        return section.toString().trim();
    }
    private boolean isHeading(String line, Set<String> headings) {

        String clean = line.toLowerCase()
                .replace(":", "")
                .trim();

        for (String heading : headings) {
            if (clean.startsWith(heading)) {
                return true;
            }
        }

        return false;
    }
}
