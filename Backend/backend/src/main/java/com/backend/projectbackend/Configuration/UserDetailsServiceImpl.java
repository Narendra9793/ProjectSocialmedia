package com.backend.projectbackend.Configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.User;



public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user= (User)userRepository.getUserByUserName(username);
        if(user == null){
            throw new UsernameNotFoundException("Invalid username or password");
        }
        CustomUserDetails customUserDetails=new CustomUserDetails((com.backend.projectbackend.Models.User) user);
        return  customUserDetails;
    }
    
}
