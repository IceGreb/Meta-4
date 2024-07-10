package com.nikoverg.DB.backend.services;

import com.nikoverg.DB.backend.dtos.SearchCriterion;
import com.nikoverg.DB.backend.entities.Protein;
import com.nikoverg.DB.backend.repositories.ProteinsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Update;

import java.util.ArrayList;
import java.util.List;


@Service
public class ProteinsService {

    @Autowired
    private ProteinsRepository proteinsRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Protein> getAllProteinsFromAllCollections() {
        List<Protein> allProteins = new ArrayList<>();
        List<String> collections = List.of("Cocaine Esterases", "Petases Pet Hydrolases", "Feruloyl Esterases", "Nattokinases");

        for (String collection : collections) {
            allProteins.addAll(proteinsRepository.findAllByCollection(collection));
        }

        return allProteins;
    }

    public List<Protein> findAllByCollection(String collection) {
        return proteinsRepository.findAllByCollection(collection);
    }

    public Protein getProteinByUniParcId(String uniParcId) {
        Query query = new Query(Criteria.where("uniParcId").is(uniParcId));
        List<Protein> proteins = new ArrayList<>();
        proteins.addAll(mongoTemplate.find(query, Protein.class, "Cocaine Esterases"));
        proteins.addAll(mongoTemplate.find(query, Protein.class, "Petases Pet Hydrolases"));
        proteins.addAll(mongoTemplate.find(query, Protein.class, "Feruloyl Esterases"));
        proteins.addAll(mongoTemplate.find(query, Protein.class, "Nattokinases"));
        return proteins.isEmpty() ? null : proteins.get(0);
    }

    public long countCollection(String collection) {
        Query query = new Query();
        return mongoTemplate.count(query, Protein.class, collection);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Protein createProtein(String collection, Protein protein) {
        switch (collection) {
            case "Cocaine Esterases":
            case "Petases Pet Hydrolases":
            case "Feruloyl Esterases":
            case "Nattokinases":
                return mongoTemplate.save(protein, collection);
            default:
                throw new IllegalArgumentException("Invalid collection name: " + collection);
        }
    }



    public List<Protein> searchProteins(List<SearchCriterion> criteriaList) {
        if (criteriaList == null || criteriaList.isEmpty()) {
            return new ArrayList<>();
        }

        List<Criteria> criteriaChain = new ArrayList<>();
        Criteria currentCriteria = null;
        String collectionName = null;

        // Separate logic to determine the collection name
        for (SearchCriterion criterion : criteriaList) {
            if ("domain".equalsIgnoreCase(criterion.getField())) {
                collectionName = criterion.getValue();
                break;
            }
        }

        // Process the rest of the criteria
        for (SearchCriterion criterion : criteriaList) {
            if ("domain".equalsIgnoreCase(criterion.getField())) {
                continue;
            }

            Criteria mongoCriteria;
            if ("number".equalsIgnoreCase(criterion.getType())) {
                mongoCriteria = Criteria.where(criterion.getField()).is(Double.parseDouble(criterion.getValue()));
            } else if ("sequence.value".equalsIgnoreCase(criterion.getField())) {
                mongoCriteria = Criteria.where(criterion.getField()).regex(criterion.getValue(), "i"); // Case-insensitive regex
            } else if ("Keyword".equalsIgnoreCase(criterion.getField())) {
                mongoCriteria = Criteria.where("sequenceFeatures.interproGroup.name").regex(criterion.getValue(), "i");
            } else {
                mongoCriteria = Criteria.where(criterion.getField()).is(criterion.getValue());
            }

            if ("NOT".equalsIgnoreCase(criterion.getLogic())) {
                mongoCriteria = Criteria.where(criterion.getField()).ne(criterion.getValue());
            }

            if (currentCriteria == null) {
                currentCriteria = mongoCriteria;
            } else {
                switch (criterion.getLogic().toUpperCase()) {
                    case "AND":
                        currentCriteria = new Criteria().andOperator(currentCriteria, mongoCriteria);
                        break;
                    case "OR":
                        criteriaChain.add(currentCriteria);
                        criteriaChain.add(mongoCriteria);
                        currentCriteria = new Criteria().orOperator(criteriaChain.toArray(new Criteria[0]));
                        criteriaChain.clear();
                        break;
                    case "NOT":
                        currentCriteria = new Criteria().andOperator(currentCriteria, mongoCriteria);
                        break;
                    default:
                        break;
                }
            }
        }

        Query query = new Query(currentCriteria);
        List<Protein> results = new ArrayList<>();

        if (collectionName != null) {
            results.addAll(mongoTemplate.find(query, Protein.class, collectionName));
        } else {
            List<String> collections = List.of("Cocaine Esterases", "Petases Pet Hydrolases", "Feruloyl Esterases", "Nattokinases");
            for (String collection : collections) {
                results.addAll(mongoTemplate.find(query, Protein.class, collection));
            }
        }

        return results;
    }










    public void deleteProtein(String uniParcId) {
        Query query = new Query(Criteria.where("uniParcId").is(uniParcId));
        mongoTemplate.remove(query, Protein.class, "Cocaine Esterases");
        mongoTemplate.remove(query, Protein.class, "Petases Pet Hydrolases");
        mongoTemplate.remove(query, Protein.class, "Feruloyl Esterases");
        mongoTemplate.remove(query, Protein.class, "Nattokinases");
    }

    public Protein updateProtein(String uniParcId, Protein protein) {
        // Find the collection where the protein exists
        String collection = null;
        Protein existingProtein = getProteinByUniParcId(uniParcId);
        if (existingProtein == null) {
            throw new IllegalArgumentException("Protein with UniParc ID " + uniParcId + " not found");
        }

        // Determine the collection from the existing protein
        if (mongoTemplate.exists(new Query(Criteria.where("uniParcId").is(uniParcId)), Protein.class, "Cocaine Esterases")) {
            collection = "Cocaine Esterases";
        } else if (mongoTemplate.exists(new Query(Criteria.where("uniParcId").is(uniParcId)), Protein.class, "Petases Pet Hydrolases")) {
            collection = "Petases Pet Hydrolases";
        } else if (mongoTemplate.exists(new Query(Criteria.where("uniParcId").is(uniParcId)), Protein.class, "Feruloyl Esterases")) {
            collection = "Feruloyl Esterases";
        } else if (mongoTemplate.exists(new Query(Criteria.where("uniParcId").is(uniParcId)), Protein.class, "Nattokinases")) {
            collection = "Nattokinases";
        }

        if (collection != null) {
            Query query = new Query(Criteria.where("uniParcId").is(uniParcId));
            Update update = new Update()
                    .set("uniParcCrossReferences", protein.getUniParcCrossReferences())
                    .set("sequence", protein.getSequence())
                    .set("sequenceFeatures", protein.getSequenceFeatures())
                    .set("oldestCrossRefCreated", protein.getOldestCrossRefCreated())
                    .set("mostRecentCrossRefUpdated", protein.getMostRecentCrossRefUpdated());

            mongoTemplate.findAndModify(query, update, Protein.class, collection);
        }

        return protein;
    }



}
