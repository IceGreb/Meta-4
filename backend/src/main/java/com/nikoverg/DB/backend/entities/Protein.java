package com.nikoverg.DB.backend.entities;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Builder
@Data
@Getter
@Setter
@Document(collection = "proteins")
public class Protein {

    @Id
    private String id;
    private List<UniParcCrossReference> uniParcCrossReferences;
    private List<SequenceFeature> sequenceFeatures;
    private Sequence sequence;
    private String uniParcId;
    private String database;
    private String organism;
    private String length;
    private String domain;
    private String oldestCrossRefCreated;
    private String mostRecentCrossRefUpdated;


    // Default constructor
    public Protein() {}

    // Constructor with all fields
    public Protein(String id, List<UniParcCrossReference> uniParcCrossReferences,List<SequenceFeature> sequenceFeatures, Sequence sequence, String uniParcId, String database, String organism, String length, String domain, String oldestCrossRefCreated, String mostRecentCrossRefUpdated) {
        this.id = id;
        this.uniParcCrossReferences = uniParcCrossReferences;
        this.sequenceFeatures = sequenceFeatures;
        this.sequence = sequence;
        this.uniParcId = uniParcId;
        this.database = database;
        this.organism = organism;
        this.length = length;
        this.domain = domain;
        this.oldestCrossRefCreated = oldestCrossRefCreated;
        this.mostRecentCrossRefUpdated = mostRecentCrossRefUpdated;
    }

    // Getters and Setters
    public List<UniParcCrossReference> getUniParcCrossReferences() {
        return uniParcCrossReferences;
    }

    public void setUniParcCrossReferences(List<UniParcCrossReference> uniParcCrossReferences) {
        this.uniParcCrossReferences = uniParcCrossReferences;
    }

    public Sequence getSequence() {
        return sequence;
    }

    public void setSequence(Sequence sequence) {
        this.sequence = sequence;
    }

    public String getUniParcId() {
        return uniParcId;
    }

    public void setUniParcId(String uniParcId) {
        this.uniParcId = uniParcId;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getOrganism() {
        return organism;
    }

    public void setOrganism(String organism) {
        this.organism = organism;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getOldestCrossRefCreated() {
        return oldestCrossRefCreated;
    }

    public void setOldestCrossRefCreated(String oldestCrossRefCreated) {
        this.oldestCrossRefCreated = oldestCrossRefCreated;
    }

    public String getMostRecentCrossRefUpdated() {
        return mostRecentCrossRefUpdated;
    }

    public void setMostRecentCrossRefUpdated(String mostRecentCrossRefUpdated) {
        this.mostRecentCrossRefUpdated = mostRecentCrossRefUpdated;
    }

    public List<SequenceFeature> getSequenceFeatures() {
        return sequenceFeatures;
    }

    public void setSequenceFeatures(List<SequenceFeature> sequenceFeatures) {
        this.sequenceFeatures = sequenceFeatures;
    }

    @Override
    public String toString() {
        return "Protein{" +
                "id='" + id + '\'' +
                ", uniParcCrossReferences=" + uniParcCrossReferences + '\'' +
                ", sequence=" + sequence + '\'' +
                ", length='" + length + '\'' +
                ", Protein_ID='" + uniParcId + '\'' +
                ", Database='" + database + '\'' +
                ", organism='" + organism + '\'' +
                ", domain='" + domain + '\'' +
                ", oldestCrossRefCreated='" + oldestCrossRefCreated + '\'' +
                ", mostRecentCrossRefUpdated='" + mostRecentCrossRefUpdated + '\'' +
                ", sequenceFeatures=" + sequenceFeatures +
                '}';
    }
}
