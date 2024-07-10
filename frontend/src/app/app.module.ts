import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProteinListComponent } from './components/protein-list/protein-list.component';
import { ProteinDetailsComponent } from './components/protein-details/protein-details.component';
import { ProteinCreateComponent } from './components/protein-create/protein-create.component';
import { ProteinUpdateComponent } from './components/protein-update/protein-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { ProteinBrowseComponent } from './components/protein-browse/protein-browse.component';
import { HomeComponent } from './components/home/home.component';
import { DomainListComponent } from './components/domain-list/domain-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AdvancedSearchComponent } from './components/advanced-search/advanced-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LoginComponent } from './components/login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 

const appRoutes: Routes = [
  { path: '', component: ProteinListComponent },
  { path: 'create', component: ProteinCreateComponent },
  { path: 'update/:id', component: ProteinUpdateComponent },
  { path: 'details/:id', component: ProteinDetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ProteinListComponent,
    DomainListComponent,
    ProteinDetailsComponent,
    ProteinCreateComponent,
    ProteinUpdateComponent,
    ProteinBrowseComponent,
    HomeComponent,
    AdvancedSearchComponent,
    SearchResultsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
