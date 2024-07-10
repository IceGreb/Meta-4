import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProteinService } from '@services/protein.service';
import { Protein } from '@models/protein';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchCriterion } from '@models/search-criterion';
import { AuthService } from '@services/auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-protein-list',
  templateUrl: './protein-list.component.html',
  styleUrls: ['./protein-list.component.scss']
})
export class ProteinListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'uniParcId', 'databaseCrossReference', 'sequenceLength', 'oldestCrossRefCreated', 'mostRecentCrossRefUpdated', 'actions'];
  dataSource = new MatTableDataSource<Protein>();
  length = 0;
  pageSize = 10;
  currentPage = 0;
  proteins: Protein[] = [];
  collection: string = 'all';  
  criteria: SearchCriterion[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private proteinService: ProteinService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private snackBar: MatSnackBar 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.collection = params['collection'] || 'all';  
      this.route.queryParams.subscribe(queryParams => {
        if (queryParams['criteria']) {
          const criteriaStr = decodeURIComponent(queryParams['criteria']);
          this.criteria = JSON.parse(criteriaStr);
          this.searchProteins(this.criteria);
        } else {
          this.fetchProteins();
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  fetchProteins(): void {
    if (this.collection === 'all') {
      this.proteinService.getAllProteins().subscribe(
        data => {
          this.dataSource.data = data;
          this.length = data.length;
        },
        error => console.error('Error fetching proteins', error)
      );
    } else {
      this.proteinService.getProteinsByCollection(this.collection).subscribe(
        data => {
          this.dataSource.data = data;
          this.length = data.length;
        },
        error => console.error('Error fetching proteins', error)
      );
    }
  }

  searchProteins(criteria: SearchCriterion[]): void {
    this.proteinService.searchProteins(criteria).subscribe(
      data => {
        this.dataSource.data = data;
        this.length = data.length;
      },
      error => console.error('Error fetching search results', error)
    );
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchProteins();
  }

  editProtein(id: string): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/edit', id]);
    } else {
      this.snackBar.open('You are not authorized to perform this action.', 'Close', {
        duration: 3000
      });
    }
  }

  deleteProtein(id: string): void {
    console.log('Deleting protein with ID:', id);
    const token = this.authService.getToken();
    console.log('Token:', token);
    this.proteinService.deleteProtein(id).subscribe(
      () => {
        this.fetchProteins();
        this.snackBar.open('Protein deleted successfully.', 'Close', {
          duration: 3000
        });
      },
      error => {
        console.error('Error deleting protein', error);
        if (error.status === 403) {
          this.snackBar.open('You are not authorized to perform this action.', 'Close', {
            duration: 3000
          });
        } else {
          this.snackBar.open('An error occurred while deleting the protein.', 'Close', {
            duration: 3000
          });
        }
      }
    );
  }

  viewProteinDetails(uniParcId: string): void {
    this.router.navigate(['/search', uniParcId]);
  }
}
