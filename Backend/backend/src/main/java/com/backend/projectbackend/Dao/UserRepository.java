package com.backend.projectbackend.Dao;


import java.util.Optional;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.projectbackend.Models.AccountStatus;
import com.backend.projectbackend.Models.User;


@Repository
public interface UserRepository extends CrudRepository <User, Integer>{

    @Query("SELECT u FROM User u WHERE u.email = :email ")
    public User getUserByUserName(@Param("email")String email);

    Optional<User> findOneByEmailAndPassword(String email, String password);


    List<User> findByAccountStatus(AccountStatus accountStatus );

    public Page<User> findAll(Pageable p);
    

}
