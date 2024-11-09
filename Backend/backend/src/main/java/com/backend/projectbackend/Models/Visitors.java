package com.backend.projectbackend.Models;

import java.util.Calendar;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Visitors {
    public Visitors() {
        
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "visited_user_id")
    private User visitedUser;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "visitor_id")
    private User visitor;

    @Temporal(TemporalType.TIMESTAMP)
    private Date visitDate;

    public boolean isExpired() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MINUTE, -1);
        return visitDate.before(cal.getTime());
    }


}