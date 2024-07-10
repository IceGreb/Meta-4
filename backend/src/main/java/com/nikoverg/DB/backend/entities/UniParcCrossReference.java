package com.nikoverg.DB.backend.entities;

import lombok.Data;

@Data
public class UniParcCrossReference {
    private String database;
    private String id;
    private int versionI;
    private int version;
    private boolean active;
    private String created;
    private String lastUpdated;
    private String geneName;
    private String proteinName;
    private Organism organism;
    private String proteomeId;
    private String component;

    // Inner class for organism details
    @Data
    public static class Organism {
        private String scientificName;
        private String commonName;
        private int taxonId;
    }
}
