import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProteinListComponent } from './components/protein-list/protein-list.component';
import { ProteinDetailsComponent } from './components/protein-details/protein-details.component';
import { ProteinCreateComponent } from './components/protein-create/protein-create.component';
import { ProteinUpdateComponent } from './components/protein-update/protein-update.component';
import { DomainListComponent } from './components/domain-list/domain-list.component';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'proteins', component: ProteinListComponent },  
  { path: 'proteins/:collection', component: ProteinListComponent},
  { path: 'search/:uniParcId', component: ProteinDetailsComponent },
  { path: 'create', component: ProteinCreateComponent, canActivate: [AuthGuard] },
  { path: 'advanced-search', component: AdvancedSearchComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'domains', component: DomainListComponent },
  { path: 'update/:id', component: ProteinUpdateComponent, canActivate: [AuthGuard] },
  { path: 'edit/:uniParcId', component: ProteinDetailsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
