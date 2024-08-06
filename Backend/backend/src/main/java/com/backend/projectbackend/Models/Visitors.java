package com.backend.projectbackend.Models;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="VISITOR")
public class Visitors {
    @Id
    private int visitorId;
    private Date visitedTime;

    @JsonBackReference
    @ManyToOne
    private User user;

    public Visitors() {
        // Default constructor body (if needed)
    }
    
    public int getvisitorId() {
        return visitorId;
    }
    public void setvisitorId(int visitorId) {
        this.visitorId = visitorId;
    }
    public Date getVisitedTime() {
        return visitedTime;
    }
    public void setVisitedTime(Date visitedTime) {
        this.visitedTime = visitedTime;
    }
    public Visitors(int visitorId, Date visitedTime) {
        this.visitorId = visitorId;
        this.visitedTime = visitedTime;
    }
    @Override
    public String toString() {
        return "Visitors [visitorId=" + visitorId + ", visitedTime=" + visitedTime + ", user=" + user + "]";
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public Visitors(User user) {
        this.user = user;
    }
    public Visitors(int visitorId, Date visitedTime, User user) {
        this.visitorId = visitorId;
        this.visitedTime = visitedTime;
        this.user = user;
    }

    
}
