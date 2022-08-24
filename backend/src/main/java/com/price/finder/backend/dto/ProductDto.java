package com.price.finder.backend.dto;

import com.price.finder.backend.response.Response;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ProductDto extends Response {
    private String productName;
    private Double price;
    private String currency;
    private String requestDate;
    private String url;
}
