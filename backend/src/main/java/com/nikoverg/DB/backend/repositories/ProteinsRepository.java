package com.nikoverg.DB.backend.repositories;

import com.nikoverg.DB.backend.entities.Protein;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProteinsRepository extends MongoRepository<Protein, String>, CustomProteinRepository {    // Custom query methods can be added here if needed
    Optional<Protein> findByUniParcId(String uniParcId);
}
