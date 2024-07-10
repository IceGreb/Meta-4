package com.nikoverg.DB.backend.dtos;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SearchCriterion {
    private String field;
    private String logic;
    private String operator;
    private String value;
    private String type;

    public SearchCriterion() {}

    public SearchCriterion(String field, String logic, String operator, String value) {
        this.field = field;
        this.logic = logic;
        this.operator = operator;
        this.value = value;
        this.type = type;
    }

}
