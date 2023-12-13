package com.okta.developer.store.domain;

import java.util.UUID;

public class ProductTestSamples {

    public static Product getProductSample1() {
        return new Product().id("id1").title("title1");
    }

    public static Product getProductSample2() {
        return new Product().id("id2").title("title2");
    }

    public static Product getProductRandomSampleGenerator() {
        return new Product().id(UUID.randomUUID().toString()).title(UUID.randomUUID().toString());
    }
}
