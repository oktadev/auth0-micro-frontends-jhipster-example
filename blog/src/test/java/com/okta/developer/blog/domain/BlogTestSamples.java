package com.okta.developer.blog.domain;

import java.util.UUID;

public class BlogTestSamples {

    public static Blog getBlogSample1() {
        return new Blog().id("id1").name("name1").handle("handle1");
    }

    public static Blog getBlogSample2() {
        return new Blog().id("id2").name("name2").handle("handle2");
    }

    public static Blog getBlogRandomSampleGenerator() {
        return new Blog().id(UUID.randomUUID().toString()).name(UUID.randomUUID().toString()).handle(UUID.randomUUID().toString());
    }
}
