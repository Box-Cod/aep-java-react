package com.example.java_jwt.dto;

import com.example.java_jwt.model.Role;
import com.example.java_jwt.model.enums.UserRoleEnum;

public record CreateUserDTO(String email, String password, UserRoleEnum role) {

}
