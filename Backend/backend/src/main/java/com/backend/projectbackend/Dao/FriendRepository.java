package com.backend.projectbackend.Dao;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.backend.projectbackend.Models.Friend;
@Repository
public interface FriendRepository extends CrudRepository <Friend, Integer>{

}

    
