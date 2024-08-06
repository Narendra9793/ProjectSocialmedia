// package com.backend.projectbackend.Controllers;


// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import com.backend.projectbackend.Services.FaceRecognitionService;

// import java.util.List;

// @RestController
// @RequestMapping("/api/auth")
// public class FaceRecognitionController {

//     @Autowired
//     private FaceRecognitionService faceRecognitionService;
//     // http://localhost:7070/api/auth/recognize
//     @PostMapping("/recognize")
//     public List<String> recognizeFace(@RequestParam("file") MultipartFile file) {
//         System.out.println("We are in recognize method!");
//         return faceRecognitionService.recognizeFace(file);
//     }
// }
