package com.backend.projectbackend.Dao;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.backend.projectbackend.Models.SendedRequest;
@Repository
public interface SendedRequestRepository extends CrudRepository <SendedRequest, Integer>{
    Optional<SendedRequest> findByReceiverId(int receiverId);
}