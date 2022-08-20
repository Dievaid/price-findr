package com.price.finder.backend.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SuccessResponse extends Response {
    private String message;
}
