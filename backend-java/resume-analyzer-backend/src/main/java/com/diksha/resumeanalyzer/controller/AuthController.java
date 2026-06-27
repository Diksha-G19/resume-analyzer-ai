package com.diksha.resumeanalyzer.controller;

import com.diksha.resumeanalyzer.dto.LoginRequest;
import com.diksha.resumeanalyzer.dto.RegisterRequest;
import com.diksha.resumeanalyzer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.diksha.resumeanalyzer.dto.LoginResponse;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {

        return userService.register(request);
    }
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        return userService.login(request);
    }
}
