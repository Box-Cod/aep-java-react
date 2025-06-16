package com.example.java_jwt.service;

import com.example.java_jwt.model.User;
import com.example.java_jwt.repository.UserRepository;
import com.example.java_jwt.security.UserDetailsImplt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsImpltService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new RuntimeException("Usuário não encontrado.")
        );
        return new UserDetailsImplt(user);
    }

}
