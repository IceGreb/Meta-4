package com.nikoverg.DB.backend.dtos;

import lombok.*;

import jakarta.validation.constraints.NotNull;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Getter
@Setter

public class ProteinsDto {

    private String id;
    @NotNull
    private String database;

    @NotNull
    private String identifier;

    @NotNull
    private String organism;

    @NotNull
    private String domain;

}
