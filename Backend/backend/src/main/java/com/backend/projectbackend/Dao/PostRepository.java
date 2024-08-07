package com.backend.projectbackend.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.projectbackend.Models.Post;
@Repository
public interface PostRepository extends CrudRepository <Post, Integer>{


    Post findPostBypostId(@Param("postId")int postId);
}
