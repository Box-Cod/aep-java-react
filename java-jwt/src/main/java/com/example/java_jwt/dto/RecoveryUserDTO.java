package com.example.java_jwt.dto;

import com.example.java_jwt.model.Role;

import java.util.List;

public record RecoveryUserDTO(Long id, String email, List<Role> roles) {

}
