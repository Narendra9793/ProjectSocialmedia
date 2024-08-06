package com.backend.projectbackend.Models;

public class PostData {
    private String postImageUrl;
    private String postDescription;
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
    public PostData(String postImageUrl, String postDescription) {
        this.postImageUrl = postImageUrl;
        this.postDescription = postDescription;
    }
    @Override
    public String toString() {
        return "PostData [postImageUrl=" + postImageUrl + ", postDescription=" + postDescription + "]";
    }

    
 

    
}
