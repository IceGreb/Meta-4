package com.nikoverg.DB.backend.repositories;

import com.nikoverg.DB.backend.entities.Protein;
import java.util.List;

public interface CustomProteinRepository {
    List<Protein> findAllByCollection(String collection);
    Protein findByUniParcId(String collection, String uniParcId);
}
