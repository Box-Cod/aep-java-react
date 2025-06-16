package com.example.java_jwt.service;

import com.example.java_jwt.config.SecurityConfig;
import com.example.java_jwt.dto.CreateUserDTO;
import com.example.java_jwt.dto.LoginUserDTO;
import com.example.java_jwt.dto.RecoveryJwtTokenDTO;
import com.example.java_jwt.model.Role;
import com.example.java_jwt.model.User;
import com.example.java_jwt.model.enums.UserRoleEnum;
import com.example.java_jwt.repository.UserRepository;
import com.example.java_jwt.security.UserDetailsImplt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.BeanDefinitionDsl;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenService jwtTokenService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SecurityConfig securityConfig;

    public RecoveryJwtTokenDTO authenticateUser(LoginUserDTO loginUserDTO) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                new UsernamePasswordAuthenticationToken(loginUserDTO.email(), loginUserDTO.password());

        Authentication authentication = authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        UserDetailsImplt userDetails = (UserDetailsImplt) authentication.getPrincipal();

        return new RecoveryJwtTokenDTO(jwtTokenService.generateToken(userDetails));
    }

    public void createUser(CreateUserDTO createUserDTO) {
        User newUser = User.builder()
            .email(createUserDTO.email())
            .password(securityConfig.passwordEncoder().encode(createUserDTO.password()))
            .roles(List.of(Role.builder().name(createUserDTO.role()).build()))
            .build();

        userRepository.save(newUser);
    }

}
