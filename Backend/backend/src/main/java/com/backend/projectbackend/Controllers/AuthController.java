package com.backend.projectbackend.Controllers;


import java.security.Principal;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.projectbackend.Dao.PostRepository;
import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.AccountStatus;
import com.backend.projectbackend.Models.Credentials;
import com.backend.projectbackend.Models.Friend;
import com.backend.projectbackend.Models.JwtRequest;
import com.backend.projectbackend.Models.JwtResponse;
import com.backend.projectbackend.Models.Post;
import com.backend.projectbackend.Models.ReceivedRequest;
import com.backend.projectbackend.Models.SendedRequest;
import com.backend.projectbackend.Models.Status;
import com.backend.projectbackend.Models.User;
import com.backend.projectbackend.Security.JwtHelper;
import com.backend.projectbackend.Services.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    // private Logger logger = LoggerFactory.getLogger(AuthController.class);

    //http://localhost:7070/api/auth/login
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) {
        System.out.println(request.getEmail());
        System.out.println(request.getPassword());
        this.doAuthenticate(request.getEmail(), request.getPassword());
        

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = this.helper.generateToken(userDetails);

        System.out.println("Token : " + token);
        //////////////////////////
        User loggedUser=this.userRepository.getUserByUserName(request.getEmail());
        loggedUser.setStatus(Status.ONLINE);
        this.userRepository.save(loggedUser);
        //////////////////////////
        JwtResponse response = JwtResponse.builder()
        .jwtToken(token)
        .username(userDetails.getUsername())
        .userId(loggedUser.getUserId())
        .build();
    
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // http://localhost:7070/api/auth/allusers
    @GetMapping("/allusers/{page}")
    public List<User> getUsers(@PathVariable Integer page) {
        Pageable p= PageRequest.of(page, 5);
        Page<User> allUsers = this.userRepository.findAll(p);

        return allUsers.getContent();
    }

    // http://localhost:7070/api/auth/allpublicpost
    @GetMapping("/allpublicpost")
    public List<Post> getPublicPost() {
        List<Post> publicPosts= new ArrayList<>();
        try {

            List<User> publicUsers=this.userRepository.findByAccountStatus(AccountStatus.PUBLIC );
            
            for (User pUser : publicUsers) {
                for(Post p : pUser.getPosts()){
                    publicPosts.add(p);
                }
            }
            
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return publicPosts;
    }



    //http://localhost:7070/api/auth/register
    @PostMapping("/register")
    public String register(@RequestBody Credentials cred){
        String str = this.userService.addUser(cred);
        return "User added with name " + str; 
    }

    private void doAuthenticate(String email, String password) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            
            System.out.println("Try Started=====>");
            System.out.println(authentication);
            manager.authenticate(authentication);
        } 
        catch (BadCredentialsException e) {
            System.out.println("Catch Started=====>");
            e.printStackTrace();

            throw new BadCredentialsException(" Invalid Username or Password  !!");
            
        }


    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }

}

