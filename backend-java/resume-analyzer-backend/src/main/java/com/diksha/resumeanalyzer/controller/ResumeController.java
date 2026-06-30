package com.diksha.resumeanalyzer.controller;


import com.diksha.resumeanalyzer.dto.UploadResponse;
import com.diksha.resumeanalyzer.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.diksha.resumeanalyzer.dto.ParsedResume;
import com.diksha.resumeanalyzer.service.ResumeParserService;
import com.diksha.resumeanalyzer.dto.ATSResponse;
import com.diksha.resumeanalyzer.service.ATSScoreService;

@RestController
@RequestMapping("/api/resume")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;
    @Autowired
    private ResumeParserService resumeParserService;

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

    @GetMapping("/parse/{id}")
    public ResponseEntity<ParsedResume> parseResume(
            @PathVariable Long id) {

        ParsedResume parsedResume =
                resumeParserService.parseResumeById(id);

        return ResponseEntity.ok(parsedResume);
    }

    @Autowired
    private ATSScoreService atsScoreService;

    @GetMapping("/score/{id}")
    public ResponseEntity<ATSResponse> scoreResume(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                atsScoreService.calculateScoreByResumeId(id));
    }
}