import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProteinService } from '@services/protein.service';
import { Protein } from '@models/protein';
import { SearchCriterion } from '@models/search-criterion';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  proteins: Protein[] = [];

  constructor(private route: ActivatedRoute, private proteinService: ProteinService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const criteria: SearchCriterion[] = JSON.parse(params['criteria']);
      console.log('Received criteria:', criteria); 
      this.proteinService.searchProteins(criteria).subscribe(
        data => this.proteins = data,
        error => console.error('Error fetching search results', error)
      );
    });
  }
}
