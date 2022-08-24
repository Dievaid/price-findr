package com.price.finder.backend.controllers;

import com.price.finder.backend.dto.ProductDto;
import com.price.finder.backend.response.ErrorResponse;
import com.price.finder.backend.response.Response;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

import static java.lang.Double.parseDouble;

@RestController
@CrossOrigin
@RequestMapping("/scrape")
public class ScrapingController {
    @GetMapping("/emag")
    public ResponseEntity<? extends Response> scrapeEmag(@RequestParam String url) {
        try {
            Document document = Jsoup.connect(url).get();
            Element product = document.selectFirst(".page-title");
            Element price = document.selectFirst(".product-new-price");

            assert product != null;
            assert price != null;

            Double priceAsNumber = parseDouble(price.text().split(" Lei")[0].replace(",", "."));
            Date requestDate = new Date();
            LocalDate localDate = requestDate
                    .toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            String dateString = String.format("%d %s %d", localDate.getDayOfMonth(), localDate.getMonth(), localDate.getYear());
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ProductDto(product.text(), priceAsNumber, "Lei", dateString, url)
            );
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("Not a valid url"));
        }
    }
}
