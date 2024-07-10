package com.nikoverg.DB.backend.controllers;

import com.nikoverg.DB.backend.dtos.SearchCriterion;
import com.nikoverg.DB.backend.entities.Protein;
import com.nikoverg.DB.backend.services.ProteinsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ProteinsController {

    @Autowired
    private ProteinsService proteinsService;

    @GetMapping("/allCollections")
    public List<Protein> getAllProteinsFromAllCollections() {
        return proteinsService.getAllProteinsFromAllCollections();
    }

    @GetMapping("/{collection}/all")
    public List<Protein> getAllProteinsByCollection(@PathVariable String collection) {
        return proteinsService.findAllByCollection(collection);
    }



    @GetMapping("/count/{collection}")
    public long countCollection(@PathVariable String collection) {
        return proteinsService.countCollection(collection);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/create/{collection}/")
    public Protein createProtein(@PathVariable String collection, @RequestBody Protein protein) {
        return proteinsService.createProtein(collection, protein);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/delete/{uniParcId}")
    public ResponseEntity<Void> deleteProtein(@PathVariable String uniParcId) {
        proteinsService.deleteProtein(uniParcId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/proteins/{uniParcId}")
    public ResponseEntity<Protein> updateProtein(@PathVariable String uniParcId, @RequestBody Protein protein) {
        Protein updatedProtein = proteinsService.updateProtein(uniParcId, protein);
        return ResponseEntity.ok(updatedProtein);
    }

    @GetMapping("/proteins/{uniParcId}")
    public Protein getProteinByUniParcId(@PathVariable String uniParcId) {
        return proteinsService.getProteinByUniParcId(uniParcId);
    }




    @PostMapping("/search")
    public List<Protein> searchProteins(@RequestBody List<SearchCriterion> criteriaList) {
        System.out.println("Received search criteria: " + criteriaList);
        List<Protein> results = proteinsService.searchProteins(criteriaList);
        System.out.println("Search results: " + results);
        return results;
    }
}
