package com.diksha.resumeanalyzer.dto.ai;

import java.util.List;

public class AIResponse {

    private List<String> strengths;
    private List<String> weaknesses;
    private List<String> suggestions;

    public AIResponse() {}

    public List<String> getStrengths() {
        return strengths;
    }

    public void setStrengths(List<String> strengths) {
        this.strengths = strengths;
    }

    public List<String> getWeaknesses() {
        return weaknesses;
    }

    public void setWeaknesses(List<String> weaknesses) {
        this.weaknesses = weaknesses;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
}
