import {  Component, OnInit, AfterViewInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProteinService } from '@services/protein.service';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var pdbViewer: any;

@Component({
  selector: 'app-protein-details',
  templateUrl: './protein-details.component.html',
  styleUrls: ['./protein-details.component.scss']
})
export class ProteinDetailsComponent implements OnInit, AfterViewInit {
  protein: any;
  uniParcId: string = '';
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private proteinService: ProteinService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uniParcId = params['uniParcId'];
      this.fetchProteinDetails();
      if (this.router.url.includes('/edit/')) {
        this.isEditing = true;
      }
    });
  }

  
  ngAfterViewInit(): void {
    setTimeout(() => {
        const viewerContainer = document.getElementById('pdbViewer');
        if (viewerContainer) {
            console.log('Viewer container found');
            const modelPath = `assets/pdb_test/pdb/${this.uniParcId}.pdb`;
            console.log('Initializing viewer with modelPath:', modelPath);
            pdbViewer(modelPath);  // Ensure this calls correctly

            // Log a message after the call
            console.log('Viewer initialized with path:', modelPath);
        } else {
            console.error('Viewer container not found');
        }
    }, 1000);  // Increase timeout to 1000ms
}


  

  fetchProteinDetails(): void {
    this.proteinService.getProteinByUniParcId(this.uniParcId).subscribe(
      data => {
        this.protein = data;
      },
      error => console.error('Error fetching protein details', error)
    );
  }

  enableEditing(): void {
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.fetchProteinDetails();
  }

  onSubmit(): void {
    if (this.protein) {
      this.proteinService.updateProtein(this.protein.uniParcId, this.protein).subscribe(
        response => {
          this.snackBar.open('Protein Updated Successfully!', 'Close', { duration: 3000 });
          this.isEditing = false;
          this.fetchProteinDetails();
        },
        error => {
          console.error('Error updating protein', error);
          this.snackBar.open('An error occurred while updating the protein.', 'Close', { duration: 3000 });
        }
      );
    }
  }
}
