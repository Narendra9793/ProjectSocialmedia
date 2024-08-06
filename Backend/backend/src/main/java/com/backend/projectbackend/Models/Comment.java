package com.backend.projectbackend.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;


@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "comment_Id")
    private Long commentId;

    private int ownerId;
    private String commentBody;

    @JoinColumn(name = "post_id")
    private int  post_id;

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public String getCommentBody() {
        return commentBody;
    }

    public void setCommentBody(String commentBody) {
        this.commentBody = commentBody;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    public Comment() {
        // Initialize any necessary fields or perform setup if needed
    }

    public Comment(Long commentId, int ownerId, String commentBody, int post_id) {
        this.commentId = commentId;
        this.ownerId = ownerId;
        this.commentBody = commentBody;
        this.post_id = post_id;
    }

    @Override
    public String toString() {
        return "Comment [commentId=" + commentId + ", ownerId=" + ownerId + ", commentBody=" + commentBody
                + ", post_id=" + post_id + "]";
    }

}
