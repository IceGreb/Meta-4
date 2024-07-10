import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCriterion } from '@models/search-criterion';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      criteria: this.fb.array([this.createCriterion()]),
      keyword: ['']
    });
  }

  get criteria(): FormArray {
    return this.searchForm.get('criteria') as FormArray;
  }

  createCriterion(): FormGroup {
    return this.fb.group({
      logic: '', // Initialize as empty string
      field: '',
      value: ''
    });
  }

  addCriterion(): void {
    this.criteria.push(this.createCriterion());
  }

  removeCriterion(index: number): void {
    this.criteria.removeAt(index);
  }

  onSubmit(): void {
    const criteriaList: SearchCriterion[] = this.searchForm.value.criteria.map((criterion: any) => ({
      ...criterion,
      type: this.getFieldType(criterion.field)
    }));

    // Add keyword criterion
    const keyword = this.searchForm.value.keyword;
    if (keyword) {
      criteriaList.push({
        field: 'interproGroup.name',
        logic: '',
        value: keyword,
        type: 'string',
        operator: 'regex'
      });
    }

    console.log('Submitting criteria:', criteriaList); // Log criteria
    this.router.navigate(['/search-results'], { queryParams: { criteria: JSON.stringify(criteriaList) } });
  }

  // Helper method to determine the type based on the field
  getFieldType(field: string): string {
    switch (field) {
      case 'sequence.length':
      case 'sequence.molWeight':
        return 'number';
      default:
        return 'string';
    }
  }
}
