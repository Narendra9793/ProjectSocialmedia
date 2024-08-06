package com.backend.projectbackend.Models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;


@Entity
@Table(name="POST")

public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int postId;

    private int ownerId;
    private String postImageUrl;
    private String postDescription;




    @JsonBackReference
    @ManyToOne
    private User user;


    public int getOwnerId() {
        return ownerId;
    }
    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }

    

    @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    List<Likes> likes=new ArrayList<>();

    // @JsonManagedReference
    @OneToMany(cascade = CascadeType.ALL)
    List<Comment> comments=new ArrayList<>();

    public int getPostId() {
        return postId;
    }
    public void setPostId(int postId) {
        this.postId = postId;
    }
    public String getPostImageUrl() {
        return postImageUrl;
    }
    public void setPostImageUrl(String postImageUrl) {
        this.postImageUrl = postImageUrl;
    }
    public String getPostDescription() {
        return postDescription;
    }
    public void setPostDescription(String postDescription) {
        this.postDescription = postDescription;
    }
    public List<Likes> getLikes() {
        return likes;
    }
    public void setLikes(List<Likes> likes) {
        this.likes = likes;
    }
    public List<Comment> getComments() {
        return comments;
    }
    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    public Post(){
        //Default constructor for hibernate
    }
    public void addLike(List<Likes> likes, Likes like){
        this.likes.add(like);
    }

    public Post(String postImageUrl, String postDescription){
        this.postImageUrl=postImageUrl;
        this.postDescription=postDescription;
    }
    

    public Post(int postId, String postImageUrl, String postDescription, List<Likes> likes, List<Comment> comments) {
        this.postId = postId;
        this.postImageUrl = postImageUrl;
        this.postDescription = postDescription;
        this.likes = likes;
        this.comments = comments;
    }
    public void addComment(List<Comment> comments, Comment comment){
        this.comments.add(comment);

    }
    // @Override
    // public String toString() {
    //     return "Post [postId=" + postId + ", ownerId=" + ownerId + ", postImageUrl=" + postImageUrl
    //             + ", postDescription=" + postDescription + ", user=" + user + ", likes=" + likes + ", comments="
    //             + comments + "]";
    // }

    
    



}
