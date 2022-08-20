package com.price.finder.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.price.finder.backend.config.SecurityConfig;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Users")
@Getter
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

    @OneToMany
    private List<Product> trackedProducts;

    public User withEncodedPassword() {
        password = SecurityConfig.passwordEncoder().encode(password);
        return this;
    }
}
