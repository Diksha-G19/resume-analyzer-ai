package com.diksha.resumeanalyzer.dto.ai;

import com.diksha.resumeanalyzer.dto.ParsedResume;

public class JobMatchAIRequest {

    private ParsedResume resume;
    private String jobDescription;

    public JobMatchAIRequest() {
    }

    public JobMatchAIRequest(ParsedResume resume, String jobDescription) {
        this.resume = resume;
        this.jobDescription = jobDescription;
    }

    public ParsedResume getResume() {
        return resume;
    }

    public void setResume(ParsedResume resume) {
        this.resume = resume;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}
