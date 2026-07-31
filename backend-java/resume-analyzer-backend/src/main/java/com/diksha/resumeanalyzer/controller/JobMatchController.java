package com.diksha.resumeanalyzer.controller;

import com.diksha.resumeanalyzer.dto.JobMatchRequest;
import com.diksha.resumeanalyzer.dto.JobMatchResponse;
import com.diksha.resumeanalyzer.service.JobMatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/job-match")
@RequiredArgsConstructor

public class JobMatchController {
    private final JobMatchService jobMatchService;

    @PostMapping
    public ResponseEntity<JobMatchResponse> matchResume(
            @RequestBody JobMatchRequest request) {

        JobMatchResponse response = jobMatchService.matchResume(request);

        return ResponseEntity.ok(response);
    }
}
