package com.price.finder.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.price.finder.backend.config.SecurityConfig;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "Users")
@Getter
@ToString
public class User {
    @Id
    @SequenceGenerator(name = "user_seq", allocationSize = 1)
    @GeneratedValue(generator = "user_seq", strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(unique = true)
    @NotNull
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    private String password;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Product> trackedProducts = new ArrayList<>();

    public User withEncodedPassword() {
        password = SecurityConfig.passwordEncoder().encode(password);
        return this;
    }

    public void addProduct(Product product) {
        trackedProducts.add(product.withStatsCalculated());
        product.setUser(this);
    }

    public void removeProduct(Product product) {
        trackedProducts.removeIf((p) -> {
            if (Objects.equals(p.getId(), product.getId())) {
                product.setUser(null);
                return true;
            }
            return false;
        });
    }

    public void updateProduct(Product product) {
        Product tProduct = null;
        for (var _product : trackedProducts) {
            if (product.getId().equals(_product.getId())) {
                tProduct = _product;
                break;
            }
        }
        product.setUser(this);
    }
}
