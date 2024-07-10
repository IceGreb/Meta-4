package com.nikoverg.DB.backend.entities;

import java.util.List;

public class SequenceFeature {

    private InterproGroup interproGroup;
    private String database;
    private String databaseId;
    private List<Location> locations;

    public SequenceFeature() {
    }

    public SequenceFeature(InterproGroup interproGroup, String database, String databaseId, List<Location> locations) {
        this.interproGroup = interproGroup;
        this.database = database;
        this.databaseId = databaseId;
        this.locations = locations;
    }

    public InterproGroup getInterproGroup() {
        return interproGroup;
    }

    public void setInterproGroup(InterproGroup interproGroup) {
        this.interproGroup = interproGroup;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getDatabaseId() {
        return databaseId;
    }

    public void setDatabaseId(String databaseId) {
        this.databaseId = databaseId;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }
}
