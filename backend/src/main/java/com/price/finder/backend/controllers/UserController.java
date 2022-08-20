package com.price.finder.backend.controllers;

import com.price.finder.backend.config.SecurityConfig;
import com.price.finder.backend.jwt.JwtTokenUtil;
import com.price.finder.backend.models.User;
import com.price.finder.backend.response.ErrorResponse;
import com.price.finder.backend.response.Response;
import com.price.finder.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(path = "/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/private/all")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PostMapping("/public/create")
    public void createUser(@RequestBody User user) {
        userService.createUser(user);
    }

    @PostMapping("/public/login")
    public ResponseEntity<? extends Response> login(@RequestBody User user, HttpSession session) {
        var searchedUser = userService.findUserByEmail(user.getEmail());
        if (searchedUser == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("There is no account with this email"));
        }
        if (SecurityConfig
                .passwordEncoder()
                .matches(
                        user.getPassword(),
                        searchedUser.getPassword()
                )
        ) {
            session.setAttribute("email", user.getEmail());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(jwtTokenUtil.generateToken(searchedUser));
        }
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("The password is wrong"));
    }
}
