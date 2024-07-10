//package com.nikoverg.DB.backend.controllers;
//
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/v1")
//public class LoginController {
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication.isAuthenticated()) {
//            return ResponseEntity.ok("{\"message\": \"Login successful\"}");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"message\": \"Login failed\"}");
//        }
//    }
//}
