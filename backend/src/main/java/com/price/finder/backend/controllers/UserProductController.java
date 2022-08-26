package com.price.finder.backend.controllers;

import com.price.finder.backend.models.Product;
import com.price.finder.backend.response.ErrorResponse;
import com.price.finder.backend.response.ProductListResponse;
import com.price.finder.backend.response.Response;
import com.price.finder.backend.response.SuccessResponse;
import com.price.finder.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping(path = "user/private")
@CrossOrigin
@RequiredArgsConstructor
public class UserProductController {
    private final ProductService productService;

    @PostMapping("add_product")
    public ResponseEntity<? extends Response> addProductToUser(
            @RequestBody Product product,
            HttpServletRequest request) {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);

        try {
            return productService.addProductToUser(jwtToken, product) ?
                    ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse("Product added")) :
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("User not found or not valid jwt token"));
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Not valid jwt token"));
        }
    }

    @PutMapping("update_product")
    public ResponseEntity<? extends Response> updateProductOfUser(
            @RequestBody Product product,
            HttpServletRequest request
    ) {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);

        try {
            return productService.updateProduct(jwtToken, product) ?
                    ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse("Product updated")) :
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Non existing product or user"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Not valid jwt token"));
        }
    }

    @DeleteMapping("delete_product")
    public ResponseEntity<? extends Response> deleteProductOfUser(
            @RequestParam Long id,
            HttpServletRequest request
    ) {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);

        try {
            return productService.deleteProduct(jwtToken, id) ?
                    ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse("Product deleted")) :
                    ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Non existing product or user"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Not valid jwt token"));
        }
    }

    @GetMapping("/tracked")
    public ResponseEntity<? extends Response> getTrackedProducts(HttpServletRequest request) {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ProductListResponse(productService.getProducts(jwtToken)));
    }

    @DeleteMapping("/delete_list")
    public ResponseEntity<? extends Response> removeListOfProducts(
            @RequestBody List<Long> ids, HttpServletRequest request) {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);
        try {
            productService.deleteProducts(jwtToken, ids);
            return ResponseEntity.status(HttpStatus.OK).body(new SuccessResponse("Deleted"));
        }
        catch (ResourceAccessException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("Not valid jwt token"));
        }
    }

    @GetMapping("/get")
    public Product getProductById(@RequestParam Long id, HttpServletRequest request) {
        String requestTokenHeader = request.getHeader("Authorization");
        String jwtToken = requestTokenHeader.substring(7);

        return productService.getProductById(jwtToken, id);
    }
}
