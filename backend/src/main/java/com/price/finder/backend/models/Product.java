package com.price.finder.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Products")
public class Product {
    @Id
    @SequenceGenerator(name = "prod_seq", allocationSize = 1)
    @GeneratedValue(generator = "prod_seq", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String productName;
    private Double price;
    private String currency;
    private String requestDate;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ElementCollection
    private List<Double> priceHistory;

    private Double highestPriceOfAllTime;
    private Double lowestPriceOfAllTime;
    private String highestPriceDate;
    private String lowestPriceDate;
}
