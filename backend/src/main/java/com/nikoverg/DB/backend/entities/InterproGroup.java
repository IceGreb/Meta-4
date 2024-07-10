package com.nikoverg.DB.backend.entities;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InterproGroup {

    private String id;
    private String name;

    public InterproGroup() {
    }

    public InterproGroup(String id, String name) {
        this.id = id;
        this.name = name;
    }

}
