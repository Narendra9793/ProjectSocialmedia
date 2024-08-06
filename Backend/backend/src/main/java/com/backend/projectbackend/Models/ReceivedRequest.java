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
public class ReceivedRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int ReceiveRequestId;

    private int senderId;

    @JsonBackReference
    @ManyToOne
    private User user;

    public ReceivedRequest() {
        //TODO Auto-generated constructor stub
    }

   
    

}
