package com.okta.developer.blog.domain;

import java.util.UUID;

public class TagTestSamples {

    public static Tag getTagSample1() {
        return new Tag().id("id1").name("name1");
    }

    public static Tag getTagSample2() {
        return new Tag().id("id2").name("name2");
    }

    public static Tag getTagRandomSampleGenerator() {
        return new Tag().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString());
    }
}
