package com.price.finder.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "Products")
@Getter
@Setter
public class Product {
    @Id
    @SequenceGenerator(name = "prod_seq", allocationSize = 1)
    @GeneratedValue(generator = "prod_seq", strategy = GenerationType.SEQUENCE)
    private Long id;

    private String productName;
    private Double price;
    private String currency;
    private String requestDate;

    @Column(unique = true)
    private String url;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ElementCollection
    private List<Double> priceHistory;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    @ElementCollection
    private List<String> priceHistoryDates;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Double highestPriceOfAllTime;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Double lowestPriceOfAllTime;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String highestPriceDate; // ISO String

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String lowestPriceDate; // Iso String

    public Product withStatsCalculated() {
        priceHistory.add(price);
        priceHistoryDates.add(requestDate);

        lowestPriceOfAllTime = priceHistory.stream().min(Double::compare).orElse(0.0);
        highestPriceOfAllTime = priceHistory.stream().max(Double::compare).orElse(0.0);
        lowestPriceDate = priceHistoryDates.get(priceHistory.indexOf(lowestPriceOfAllTime));
        highestPriceDate = priceHistoryDates.get(priceHistory.indexOf(highestPriceOfAllTime));
        return this;
    }
}
