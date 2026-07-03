package com.diksha.resumeanalyzer.dto.ai;
import java.util.*;

public class AIRequest {

    private String name;
    private String summary;
    private List<String> skills;
    private String projects;
    private String experience;

    public String getInternships() {
        return internships;
    }

    public String getCertifications() {
        return certifications;
    }

    public void setCertifications(String certifications) {
        this.certifications = certifications;
    }

    public void setInternships(String internships) {
        this.internships = internships;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getProjects() {
        return projects;
    }

    public void setProjects(String projects) {
        this.projects = projects;
    }

    private String education;

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    private String internships;

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    private String certifications;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public AIRequest() {}


}