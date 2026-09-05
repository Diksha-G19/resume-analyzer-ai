package com.diksha.resumeanalyzer.dto;

public class UploadResponse {

    private String fileName;
    private String message;
    private Long resumeId;

    public UploadResponse() {
    }

    public UploadResponse(String fileName, String message, Long resumeId) {
        this.fileName = fileName;
        this.message = message;
        this.resumeId = resumeId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }
}