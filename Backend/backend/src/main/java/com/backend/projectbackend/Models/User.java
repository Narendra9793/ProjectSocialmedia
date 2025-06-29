package com.backend.projectbackend.Models;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`USER`")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    // Personal Information
    @NotBlank(message = "First name cannot be blank.")
    @Size(min = 2, max = 20, message = "First name must be between 2 and 20 characters.")
    private String firstName;

    @NotBlank(message = "Last name cannot be blank.")
    @Size(min = 2, max = 20, message = "Last name must be between 2 and 20 characters.")
    private String lastName;

    private String nickName;

    @NotBlank(message = "Gender cannot be blank.")
    private String gender;

    @NotBlank(message = "Date of birth cannot be blank.")
    private String dob;

    @NotBlank(message = "Marital status cannot be blank.")
    private String maritalStatus;

    // Contact Information
    @NotBlank(message = "Email cannot be blank.")
    @Column(unique = true)
    private String email;

    private String password;
    private Long phoneNumber;
    private String address;

    // Family Background
    private String motherName;
    private String fatherName;
    private int siblings;

    // Educational Background
    private String highestEducation;

    // Professional Information
    private String employerName;
    private int annualIncome;

    // Physical Attributes
    private double height;
    private String complexion;
    private String bodyType;

    // Religious and Cultural Information
    private String religion;

    // Lifestyle Habits
    private String smokingHabit;
    private String drinkingHabit;
    private String loveToEat;

    // Hobbies and Interests
    private String hobbiesAndInterests;
    private String activitiesTheyEnjoy;

    // Desired Partner Preferences
    private int leastAge;
    private int mostAge;
    private String preferredQualification;
    private String preferredOccupation;
    private String preferredPlace;

    // Photographs
    private String imageUrl;

    // About Me / Introduction
    private String aboutMyself;

    // Contact and Communication Preferences
    private String preferredModeOfContact;
    private String preferredTimeForContact;

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL,  fetch = FetchType.LAZY, mappedBy = "user",  orphanRemoval = true)
    private List<Friend> friends = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "user", orphanRemoval = true)
    List<Post> posts = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "visitTo", orphanRemoval = true)
    List<Visit> visitors = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(mappedBy = "visitBy", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Visit> visitMade = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    List<SendedRequest> sentRequests = new ArrayList<>();

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user", orphanRemoval = true)
    List<ReceivedRequest> receivedRequests = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private Status status;

    @Enumerated(EnumType.STRING)
    private AccountStatus accountStatus;


    @PreRemove
    private void preRemove() {
        for (Visit v : new ArrayList<>(visitMade)) {
            v.setVisitTo(null);
        }
        for (Visit v : new ArrayList<>(visitors)) {
            v.setVisitBy(null);
        }
    }

    public List<Friend> getFriends(){
        return friends;
    }

}
