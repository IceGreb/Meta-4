package com.nikoverg.DB.backend.repositories;

import com.nikoverg.DB.backend.entities.Protein;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;


public class CustomProteinRepositoryImpl implements CustomProteinRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public List<Protein> findAllByCollection(String collection) {
        return mongoTemplate.findAll(Protein.class, collection);
    }




    @Override
    public Protein findByUniParcId(String collection, String uniParcId) {
        Query query = new Query(Criteria.where("uniParcId").is(uniParcId));
        return mongoTemplate.findOne(query, Protein.class, collection);
    }
}
