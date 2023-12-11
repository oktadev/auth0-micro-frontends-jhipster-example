package com.okta.developer.blog.domain;

import java.util.UUID;

public class PostTestSamples {

    public static Post getPostSample1() {
        return new Post().id("id1").title("title1");
    }

    public static Post getPostSample2() {
        return new Post().id("id2").title("title2");
    }

    public static Post getPostRandomSampleGenerator() {
        return new Post().id(UUID.randomUUID().toString()).title(UUID.randomUUID().toString());
    }
}
