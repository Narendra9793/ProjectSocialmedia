package com.backend.projectbackend.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;

@Entity
public class Likes {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int likeId;

    private int userId;

    @JoinColumn(name = "post_id")
    private int postId;

    public Likes(){
        // Default constructor for hibernate
    }

    public int getLikeId() {
        return likeId;
    }

    public void setLikeId(int likeId) {
        this.likeId = likeId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }

    public Likes(int likeId, int userId, int postId) {
        this.likeId = likeId;
        this.userId = userId;
        this.postId = postId;
    }

    @Override
    public String toString() {
        return "Likes [likeId=" + likeId + ", userId=" + userId + ", postId=" + postId + "]";
    }

}
