import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProteinService } from '@services/protein.service';
import { Protein } from '@models/protein';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-protein-create',
  templateUrl: './protein-create.component.html',
  styleUrls: ['./protein-create.component.scss']
})
export class ProteinCreateComponent {
  protein: Protein = {
    uniParcId: '',
    uniParcCrossReferences: [],
    sequence: {
      value: '',
      length: 0,
      molWeight: 0,
      crc64: '',
      md5: ''
    },
    sequenceFeatures: [],
    oldestCrossRefCreated: '',
    mostRecentCrossRefUpdated: ''
  };
  collection = '';

  constructor(
    private proteinService: ProteinService,
    private router: Router,
    private snackBar: MatSnackBar 
  ) {}

  onSubmit(): void {
    this.proteinService.createProtein(this.collection, this.protein).subscribe(
      response => {
        this.snackBar.open('Protein Submitted!', 'Close', {
          duration: 3000
        });
        this.router.navigate([`/proteins/${this.collection}`]);
      },
      error => {
        console.error('Error submitting protein', error);
        this.snackBar.open('An error occurred while submitting the protein.', 'Close', {
          duration: 3000
        });
      }
    );
  }
}
