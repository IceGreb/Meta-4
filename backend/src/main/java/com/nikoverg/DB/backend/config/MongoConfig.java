package com.nikoverg.DB.backend.config;

import com.mongodb.client.MongoClients;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackages = "com.nikoverg.DB.backend.repositories")
public class MongoConfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "backend";
    }

    @Bean
    public MongoTemplate mongoTemplate() {
        return new MongoTemplate(MongoClients.create("mongodb://localhost:27017"), getDatabaseName());
    }
}
