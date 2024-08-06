package com.backend.projectbackend.Dao;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import com.backend.projectbackend.Models.SendedRequest;

public interface SendedRequestRepository extends CrudRepository <SendedRequest, Integer>{
    Optional<SendedRequest> findByReceiverId(int receiverId);
}