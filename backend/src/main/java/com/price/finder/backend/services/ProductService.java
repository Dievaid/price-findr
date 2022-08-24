package com.price.finder.backend.services;

import com.price.finder.backend.jwt.JwtTokenUtil;
import com.price.finder.backend.models.Product;
import com.price.finder.backend.models.User;
import com.price.finder.backend.repositories.ProductRepository;
import com.price.finder.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;

    public boolean addProductToUser(String token, Product product) {
        String email = jwtTokenUtil.getUsernameFromToken(token);
        User dbUser = userService.findUserByEmail(email);
        if (dbUser == null) {
            return false;
        } else {
            product.setPriceHistory(new ArrayList<>());
            product.setPriceHistoryDates(new ArrayList<>());
            dbUser.addProduct(product);
            userRepository.save(dbUser);
            System.out.println(dbUser);
        }
        return true;
    }

    public boolean updateProduct(String token, Product product) {
        String email = jwtTokenUtil.getUsernameFromToken(token);
        User dbUser = userService.findUserByEmail(email);
        if (dbUser == null) {
            return false;
        }

        Product dbProduct = productRepository.findById(product.getId()).orElse(null);
        if (dbProduct == null) {
            return false;
        }

        // Update the retrieved product
        dbProduct.setPrice(product.getPrice());
        dbProduct.setRequestDate(product.getRequestDate());

        // Calculate new stats
        dbProduct.withStatsCalculated();
        // Update the product in database
        dbUser.updateProduct(dbProduct);
        userRepository.save(dbUser);
        return true;
    }

    public boolean deleteProduct(String token, Long id) {
        String email = jwtTokenUtil.getUsernameFromToken(token);
        User dbUser = userService.findUserByEmail(email);
        if (dbUser == null) {
            return false;
        }
        Product dbProduct = productRepository.findById(id).orElse(null);
        if (dbProduct == null) {
            return false;
        }
        dbUser.removeProduct(dbProduct);
        productRepository.deleteById(id);
        return true;
    }

    public List<Product> getProducts(String token) {
        String email = jwtTokenUtil.getUsernameFromToken(token);
        User dbUser = userService.findUserByEmail(email);

        if (dbUser == null) {
            return new ArrayList<>(0);
        }

        return dbUser.getTrackedProducts();
    }
    public void deleteProducts(String token, List<Long> ids) throws ResourceAccessException {
        String email = jwtTokenUtil.getUsernameFromToken(token);
        User dbUser = userService.findUserByEmail(email);

        if (dbUser != null) {
            productRepository.deleteAllById(ids);
        } else {
            throw new ResourceAccessException("Not valid jwt token");
        }
    }
}
