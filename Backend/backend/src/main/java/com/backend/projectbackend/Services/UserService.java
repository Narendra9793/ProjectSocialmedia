package com.backend.projectbackend.Services;


import org.hibernate.mapping.List;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.projectbackend.Dao.UserRepository;
import com.backend.projectbackend.Models.AccountStatus;
import com.backend.projectbackend.Models.Credentials;
import com.backend.projectbackend.Models.Status;
import com.backend.projectbackend.Models.UpdatedUserDetails;
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
        u.setAccountStatus(AccountStatus.PRIVATE);
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


    public String UpdateUserProfile(UpdatedUserDetails updatedDetails, User user){
        user.setNickName(updatedDetails.getNickName());
        user.setDob(updatedDetails.getDob());
        user.setMaritalStatus(updatedDetails.getMaritalStatus());
        user.setPhoneNumber(updatedDetails.getPhoneNumber());
        user.setAddress(updatedDetails.getAddress());

        user.setFatherName(updatedDetails.getFatherName());
        user.setMotherName(updatedDetails.getMotherName());
        user.setSiblings(updatedDetails.getSiblings());

        user.setHighestEducation(updatedDetails.getHighestEducation());

        user.setEmployerName(updatedDetails.getEmployerName());
        user.setAnnualIncome(updatedDetails.getAnnualIncome());

        user.setHeight(updatedDetails.getHeight());
        user.setComplexion(updatedDetails.getComplexion());
        user.setBodyType(updatedDetails.getBodyType());

        user.setReligion(updatedDetails.getReligion());

        user.setDrinkingHabit(updatedDetails.getDrinkingHabit());
        user.setLoveToEat(updatedDetails.getLoveToEat());
        user.setSmokingHabit(updatedDetails.getSmokingHabit());

        user.setActivitiesTheyEnjoy(updatedDetails.getActivitiesTheyEnjoy());
        user.setHobbiesAndInterests(updatedDetails.getHobbiesAndInterests());

        user.setLeastAge(updatedDetails.getLeastAge());
        user.setMostAge(updatedDetails.getMostAge());
        user.setPreferredQualification(updatedDetails.getPreferredQualification());
        user.setPreferredOccupation(updatedDetails.getPreferredOccupation());
        user.setPreferredPlace(updatedDetails.getPreferredPlace());
        

        user.setAboutMyself(updatedDetails.getAboutMyself());

        user.setPreferredModeOfContact(updatedDetails.getPreferredModeOfContact());
        user.setPreferredTimeForContact(updatedDetails.getPreferredTimeForContact());

       
        this.userRepository.save(user);

        return "User with name "+user.getFirstName()+ "has updated profile.";
    }

    
} 
