package com.backend.projectbackend.Models;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class UpdatedUserDetails {


    private String maritalStatus;


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

    private String Dob;
}
