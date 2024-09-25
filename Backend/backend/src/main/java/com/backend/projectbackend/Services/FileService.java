package com.backend.projectbackend.Services;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
@Service
public class FileService {
    public String uploadMedia(String path, MultipartFile file, int userID) throws Exception{
        //file name
        String fullName=file.getOriginalFilename();
        System.out.println("This is file name :"+ fullName );

        String[] name=fullName.split("\\.");

        String newFilename=name[0] + (int) (Math.random() * 100) + "." +name[1];
        //file path
        String filePath=path + newFilename;

        //create folder if not created
        File f=new File(path);
        if(!f.exists()){
            f.mkdirs();
        }

        //file copy
        Files.copy(file.getInputStream(), Paths.get(filePath));

        System.out.println(filePath);
        return "http://localhost:7070/All_media/"+ newFilename;
    }
    public void deleteFile(String path, String url) {
        String name = url.substring(32); // Extract file name from URL
        System.out.println(name);
        
        String filePath = path + name; // Construct full file path
        System.out.println(filePath);
        
        File file = new File(filePath); // Create File object
        
        if (file.exists()) { // Check if file exists
            if (file.delete()) { // Attempt to delete the file
                System.out.println("File deleted successfully.");
            } else {
                System.out.println("Failed to delete the file.");
            }
        } else {
            System.out.println("File does not exist at path: " + filePath);
        }
    }
    
} 