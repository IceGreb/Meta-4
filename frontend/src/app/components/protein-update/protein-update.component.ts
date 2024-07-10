import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProteinService } from '../../services/protein.service';
import { Protein } from '../../models/protein';

@Component({
  selector: 'app-protein-update',
  templateUrl: './protein-update.component.html',
  styleUrls: ['./protein-update.component.scss']
})
export class ProteinUpdateComponent implements OnInit {
  protein: Protein | undefined;
  
  collection: string| undefined;
  uniParcId: string| undefined;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proteinService: ProteinService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.collection = params.get('collection') || undefined;
      this.uniParcId = params.get('uniParcId') || undefined;
      this.fetchProteinDetails();
    });
  }
  fetchProteinDetails(): void {
    if (this.collection && this.uniParcId) {
      this.proteinService.getProteinByUniParcId(this.uniParcId).subscribe(
        (data) => {
          this.protein = data;
        },
        (error) => {
          console.error('Error fetching protein details', error);
      }
    );
  }

  
}
}
