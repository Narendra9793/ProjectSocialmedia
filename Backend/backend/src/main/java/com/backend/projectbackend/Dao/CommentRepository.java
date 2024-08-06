package com.backend.projectbackend.Dao;


import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.backend.projectbackend.Models.Comment;


public interface CommentRepository extends CrudRepository <Comment, Integer>{


    Comment findCommentBycommentId(@Param("commentId")int commentId);

   
}
