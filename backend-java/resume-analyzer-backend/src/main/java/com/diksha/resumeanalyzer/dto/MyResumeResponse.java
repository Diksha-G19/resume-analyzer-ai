package com.diksha.resumeanalyzer.dto;

import java.time.LocalDateTime;

public class MyResumeResponse {

    private Long id;
    private String fileName;
    private LocalDateTime uploadTime;

    public MyResumeResponse() {
    }

    public MyResumeResponse(Long id, String fileName, LocalDateTime uploadTime) {
        this.id = id;
        this.fileName = fileName;
        this.uploadTime = uploadTime;
    }

    public Long getId() {
        return id;
    }

    public String getFileName() {
        return fileName;
    }

    public LocalDateTime getUploadTime() {
        return uploadTime;
    }
}
