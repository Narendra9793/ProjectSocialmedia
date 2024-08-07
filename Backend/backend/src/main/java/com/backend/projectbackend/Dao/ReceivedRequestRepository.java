package com.backend.projectbackend.Dao;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.backend.projectbackend.Models.ReceivedRequest;

@Repository
public interface ReceivedRequestRepository extends CrudRepository <ReceivedRequest, Integer>{



    
}