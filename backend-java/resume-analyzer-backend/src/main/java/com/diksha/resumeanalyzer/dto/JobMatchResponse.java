package com.diksha.resumeanalyzer.dto;

import java.util.List;

public class JobMatchResponse {

    private int matchPercentage;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private List<String> recommendations;

    public JobMatchResponse() {
    }

    public JobMatchResponse(int matchPercentage,
                            List<String> matchedSkills,
                            List<String> missingSkills,
                            List<String> recommendations) {
        this.matchPercentage = matchPercentage;
        this.matchedSkills = matchedSkills;
        this.missingSkills = missingSkills;
        this.recommendations = recommendations;
    }

    public int getMatchPercentage() {
        return matchPercentage;
    }

    public void setMatchPercentage(int matchPercentage) {
        this.matchPercentage = matchPercentage;
    }

    public List<String> getMatchedSkills() {
        return matchedSkills;
    }

    public void setMatchedSkills(List<String> matchedSkills) {
        this.matchedSkills = matchedSkills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<String> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<String> recommendations) {
        this.recommendations = recommendations;
    }
}