import { Component, OnInit } from '@angular/core';
import { ProteinService } from '../../services/protein.service';
import { Protein } from '../../models/protein';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-protein-browse',
  templateUrl: './protein-browse.component.html',
  styleUrls: ['./protein-browse.component.scss']
})
export class ProteinBrowseComponent implements OnInit {
  proteins: Protein[] = [];
  domain: string = ''; // Default to 'proteins' collection
  collection: string ='';

  constructor(private proteinService: ProteinService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.domain = params['domain'];
      this.collection = params['collection'] || 'proteins';
      this.fetchProteinsByDomain();
    });
  }

  fetchProteinsByDomain(): void {
    this.proteinService.getProteins(this.domain).subscribe(
      (data) => {
        this.proteins = data;
      },
      (error) => {
        console.error('Error fetching proteins', error);
      }
    );
  }

  

  deleteProtein(uniParcId: string): void {
    if (confirm('Are you sure you want to delete this protein?')) {
      this.proteinService.deleteProtein(uniParcId).subscribe(
        () => {
          this.fetchProteinsByDomain(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting protein', error);
        }
      );
    }
  }
}
