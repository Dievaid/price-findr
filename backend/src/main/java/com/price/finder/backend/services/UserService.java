package com.price.finder.backend.services;

import com.price.finder.backend.models.User;
import com.price.finder.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void createUser(User user) {
        var searchedUser = userRepository.findByEmail(user.getEmail());
        if (searchedUser != null) {
            throw new HttpServerErrorException(HttpStatus.BAD_REQUEST);
        }
        userRepository.save(user.withEncodedPassword());
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
