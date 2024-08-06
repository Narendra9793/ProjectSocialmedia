// package com.backend.projectbackend.Services;

// import org.springframework.stereotype.Service;
// import org.springframework.util.LinkedMultiValueMap;
// import org.springframework.util.MultiValueMap;
// import org.springframework.web.client.RestTemplate;
// import org.springframework.core.io.Resource;
// import org.springframework.web.multipart.MultipartFile;

// import com.backend.projectbackend.Configuration.MultipartInputStreamFileResource;

// import org.springframework.http.ResponseEntity;
// import org.springframework.http.HttpEntity;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpMethod;
// import org.springframework.http.MediaType;

// import java.util.Collections;
// import java.util.List;

// @Service
// public class FaceRecognitionService {

//     private final RestTemplate restTemplate = new RestTemplate();

//     public List<String> recognizeFace(MultipartFile file) {
//         String pythonApiUrl = "http://localhost:5000/recognize";

//         try {
//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.MULTIPART_FORM_DATA);

//             MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
//             body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

//             HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

//             ResponseEntity<String[]> response = restTemplate.exchange(
//                     pythonApiUrl,
//                     HttpMethod.POST,
//                     requestEntity,
//                     String[].class
//             );

//             if (response.getStatusCode().is2xxSuccessful()) {
//                 return List.of(response.getBody());
//             } else {
//                 throw new RuntimeException("Failed to recognize face: " + response.getStatusCode().toString());
//             }
//         } catch (Exception e) {
//             throw new RuntimeException("Failed to call Python API", e);
//         }
//     }
// }

