import { Component, OnInit } from '@angular/core';
import { ProteinService } from '@services/protein.service';

@Component({
  selector: 'app-domain-list',
  templateUrl: './domain-list.component.html',
  styleUrls: ['./domain-list.component.scss']
})
export class DomainListComponent implements OnInit {
  domains: { name: string, count: number }[] = [];

  constructor(private proteinService: ProteinService) {}

  ngOnInit(): void {
    this.getDomainsCount();
  }

  getDomainsCount(): void {
    const domainNames = [
      'Cocaine Esterases',
      'Feruloyl Esterases',
      'Nattokinases',
      'Petases Pet Hydrolases'
    ];

    const domainObservables = domainNames.map(domain =>
      this.proteinService.getProteinsCount(domain).toPromise().then(count => ({
        name: domain,
        count: count || 0 
      }))
    );

    Promise.all(domainObservables).then(domainCounts => {
      this.domains = domainCounts.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
