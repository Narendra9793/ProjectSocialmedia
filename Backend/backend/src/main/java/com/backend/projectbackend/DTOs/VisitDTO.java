package com.backend.projectbackend.DTOs;

import java.util.Date;

import com.backend.projectbackend.Models.Visit;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VisitDTO {

    private Integer visitId;
    private UserDTO visitTo;
    private UserDTO visitBy;
    private Date visitDate;

    public VisitDTO(Visit visit) {
        this.visitId=visit.getVisitId();
        this.visitDate=visit.getVisitDate();
        this.visitTo=new UserDTO(visit.getVisitTo());
        this.visitBy=new UserDTO(visit.getVisitBy());
    }
}
