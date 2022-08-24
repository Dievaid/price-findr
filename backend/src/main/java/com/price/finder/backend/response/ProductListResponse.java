package com.price.finder.backend.response;

import com.price.finder.backend.models.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ProductListResponse extends Response {
    private List<Product> products;
}
