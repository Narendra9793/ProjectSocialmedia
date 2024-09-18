package com.backend.projectbackend.Models;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtResponse {
    private String jwtToken;
    private String username;
    private Integer userId;
}
