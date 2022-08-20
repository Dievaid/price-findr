package com.price.finder.backend.repositories;

import com.price.finder.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByProductName(@Param("productName") Product productName);
}
