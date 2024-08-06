package com.backend.projectbackend.Models;



import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Entity
public class SendedRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int SendRequestId;
    private int receiverId;

    @JsonBackReference
    @ManyToOne
    private User user;

    public SendedRequest() {
    }

    
    

   

}
