package com.nikoverg.DB.backend.mappers;

import com.nikoverg.DB.backend.dtos.ProteinsDto;
import com.nikoverg.DB.backend.entities.Protein;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProteinsMapper {
    Protein toProteins(ProteinsDto proteinsDto);

    ProteinsDto toProteinsDto(Protein proteins);

    List<ProteinsDto> toProteinsDto(List<Protein> proteins);

    Protein toProteinsDto(ProteinsDto proteinsDto);
}

