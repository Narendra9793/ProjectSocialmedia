package com.backend.projectbackend.Services;


import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.AccountStatus;
import com.backend.projectbackend.Models.Credentials;
import com.backend.projectbackend.Models.Status;
// import com.backend.projectbackend.Models.Status;
import com.backend.projectbackend.Models.User;
import java.util.ArrayList;



@Service
public class UserService {
  

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public String addUser(Credentials cred) {
        User u= new User();
        u.setStatus(Status.ONLINE);
        u.setAcStatus(AccountStatus.PRIVATE);
        u.setFirstName(cred.getFirstName());
        u.setLastName(cred.getLastName());
        u.setPassword(passwordEncoder.encode(cred.getPassword()));
        u.setEmail(cred.getEmail());
        u.setImageUrl("https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg");


        this.userRepository.save(u);
        return u.getFirstName() ;

    }

    // public void disconnect(User user){
    //     var storedUser = userRepository.findById(user.getUserId()).orElse(null);
    //     if ((storedUser != null)) {
    //         storedUser.setStatus(Status.OFFLINE);
    //         userRepository.save(storedUser);
    //     }
    // }

    // public java.util.List<User> findConnectUsers(){
    //     return userRepository.findAllByStatus(Status.ONLINE);

    // }


    

    
} 
