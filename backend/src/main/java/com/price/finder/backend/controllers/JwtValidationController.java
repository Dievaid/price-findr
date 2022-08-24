package com.price.finder.backend.controllers;

import com.price.finder.backend.dto.JwtDto;
import com.price.finder.backend.jwt.JwtTokenUtil;
import com.price.finder.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/jwt")
@RequiredArgsConstructor
public class JwtValidationController {
    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    @PostMapping("/validate")
    public boolean validateJwtToken(@RequestBody JwtDto token) {
        if (token.getToken() == null) {
            return false;
        }
        var email = jwtTokenUtil.getUsernameFromToken(token.getToken());
        var dbUser = userService.findUserByEmail(email);

        if (dbUser == null) {
            return false;
        }

        return jwtTokenUtil.validateToken(token.getToken(), dbUser);
    }
}
