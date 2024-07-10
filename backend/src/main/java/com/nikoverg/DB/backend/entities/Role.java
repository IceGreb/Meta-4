package com.nikoverg.DB.backend.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Role {
    @Id
    private String id;

    @Setter
    @Getter
    private String name;

    // Other getters and setters if needed
}
