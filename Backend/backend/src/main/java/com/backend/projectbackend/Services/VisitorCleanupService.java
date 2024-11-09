package com.backend.projectbackend.Services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.User;
import com.backend.projectbackend.Models.Visitors;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Iterator;
import java.util.List;

@Service
public class VisitorCleanupService {
    @Autowired
    private UserRepository userRepository;

    @Transactional  // Ensure this is a transactional method
    @Scheduled(fixedRate = 600000)  // Runs every minute
    public void removeExpiredVisitors() {
        System.out.println("I am from visitorCleanUpservice");
        List<User> users = (List<User>) userRepository.findAll();  // Using List<User> for easier handling

        for (User user : users) {
            // Ensure visitors are loaded into the context to be modified
            List<Visitors> visitors = user.getVisitors();  // Use getter to load collection

            Iterator<Visitors> iterator = visitors.iterator();
            while (iterator.hasNext()) {
                Visitors visitor = iterator.next();
                if (visitor.isExpired()) {
                    System.out.println(visitor.getVisitor().getFirstName()); // Log for debugging
                    iterator.remove();  // Remove expired visitor from the list
                }
            }

            // Explicitly set the modified visitors list back into the user object
            user.setVisitors(visitors);

            // Save and flush the changes
            userRepository.save(user);  
        }
    }
}