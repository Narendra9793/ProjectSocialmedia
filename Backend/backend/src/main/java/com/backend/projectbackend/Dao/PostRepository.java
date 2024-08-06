package com.backend.projectbackend.Dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.backend.projectbackend.Models.Post;

public interface PostRepository extends CrudRepository <Post, Integer>{


    Post findPostBypostId(@Param("postId")int postId);
}
