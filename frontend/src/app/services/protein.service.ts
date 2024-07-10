import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Protein } from '@models/protein';
import { SearchCriterion } from '@models/search-criterion';

@Injectable({
  providedIn: 'root'
})
export class ProteinService {
  private apiUrl = 'http://localhost:8081/api/v1';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAllProteins(): Observable<Protein[]> {
    return this.http.get<Protein[]>(`${this.apiUrl}/allCollections`);
  }

  getProteinsByCollection(collection: string): Observable<Protein[]> {
    collection = collection.replace(/\/$/, '');
    return this.http.get<Protein[]>(`${this.apiUrl}/${collection}/all`);
  }

  getProteins(collection: string): Observable<Protein[]> {
    collection = collection.replace(/\/$/, '');
    return this.http.get<Protein[]>(`${this.apiUrl}/${collection}/all`);
  }

  getProteinByUniParcId(uniParcId: string): Observable<Protein> {
    return this.http.get<Protein>(`${this.apiUrl}/proteins/${uniParcId}`);
  }
  
  updateProtein(id: string, protein: Protein): Observable<Protein> {
    const headers = this.getAuthHeaders();
    return this.http.put<Protein>(`${this.apiUrl}/proteins/${id}`, protein, { headers });
  }
  
  

  createProtein(collection: string, protein: Protein): Observable<Protein> {
    const headers = this.getAuthHeaders();
    collection = collection.replace(/\/$/, '');
    return this.http.post<Protein>(`${this.apiUrl}/create/${collection}/`, protein, { headers });
  }





  deleteProtein(uniParcId: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/delete/${uniParcId}`, { headers });
  }

  searchProteins(criteria: SearchCriterion[]): Observable<Protein[]> {
    return this.http.post<Protein[]>(`${this.apiUrl}/search`, criteria);
  }

  getProteinsCount(collection: string): Observable<number> {
    collection = collection.replace(/\/$/, '');
    return this.http.get<number>(`${this.apiUrl}/count/${collection}`);
  }
}
