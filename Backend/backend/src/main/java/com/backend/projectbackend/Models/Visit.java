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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "visitId")
public class Visit {

    public Visit() {
        this.visitDate=new Date();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer visitId;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "visitTo")
    private User visitTo;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "visitBy")
    private User visitBy;

    @Temporal(TemporalType.TIMESTAMP)
    private Date visitDate;

    public boolean isExpired() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_YEAR, -3);
        return visitDate != null && visitDate.before(cal.getTime());
    }


}