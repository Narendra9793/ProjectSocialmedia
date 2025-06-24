package com.backend.projectbackend.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.User;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")

public class HomeController {

    @Autowired
    private UserRepository userRepository;



    @GetMapping("/ping")
    public ResponseEntity<?> ping(){
        return ResponseEntity.ok("This is Ping Response");
    }
    
}
