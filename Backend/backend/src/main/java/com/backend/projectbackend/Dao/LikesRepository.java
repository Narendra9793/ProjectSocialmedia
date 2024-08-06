package com.backend.projectbackend.Dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import com.backend.projectbackend.Models.Likes;

public interface LikesRepository extends CrudRepository <Likes, Integer>{


    Likes findLikesBylikeId(@Param("likeId")int likeId);

    @Query("SELECT l FROM Likes l WHERE l.userId = :userId AND l.postId = :postId ")
    Likes findLikeByuserIdAndpostId(@Param("userId") int userId, @Param("postId") int postId);
}
