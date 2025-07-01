package com.backend.projectbackend.DTOs;

import com.backend.projectbackend.Models.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private int userId;
    private String firstName;
    private String lastName;
    private String nickName;
    private String imageUrl;

    public UserDTO(User user){
        this.userId=user.getUserId();
        this.firstName=user.getFirstName();
        this.lastName=user.getLastName();
        this.nickName=user.getNickName();
        this.imageUrl=user.getImageUrl();
    }
}
