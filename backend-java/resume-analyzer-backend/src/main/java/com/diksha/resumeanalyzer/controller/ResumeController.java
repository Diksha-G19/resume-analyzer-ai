package com.diksha.resumeanalyzer.controller;


import com.diksha.resumeanalyzer.dto.UploadResponse;
import com.diksha.resumeanalyzer.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadResume(
            @RequestParam("file") MultipartFile file) {

        try {

            String fileName = resumeService.uploadResume(file);

            return ResponseEntity.ok(
                    new UploadResponse(fileName,
                            "Resume uploaded successfully")
            );

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(
                    new UploadResponse("", e.getMessage())
            );
        }
    }
}