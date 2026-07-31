package com.diksha.resumeanalyzer.dto;

public class JobMatchRequest {

    private Long resumeId;
    private String jobDescription;

    public JobMatchRequest() {
    }

    public JobMatchRequest(Long resumeId, String jobDescription) {
        this.resumeId = resumeId;
        this.jobDescription = jobDescription;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}
