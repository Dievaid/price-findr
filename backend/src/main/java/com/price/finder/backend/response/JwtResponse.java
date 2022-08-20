package com.price.finder.backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse extends Response {
    private String token;
}
