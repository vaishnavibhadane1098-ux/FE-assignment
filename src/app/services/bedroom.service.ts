import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bedroom } from '../models/bedroom.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BedroomService {
  private api = 'http://localhost:3001/api/bedrooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Bedroom[]> {
    return this.http.get<Bedroom[]>(this.api);
  }

  getById(id: number): Observable<Bedroom> {
    return this.http.get<Bedroom>(`${this.api}/${id}`);
  }

  create(bedroom: Partial<Bedroom>): Observable<Bedroom> {
    return this.http.post<Bedroom>(this.api, bedroom);
  }

  update(id: number, bedroom: Partial<Bedroom>): Observable<Bedroom> {
    return this.http.put<Bedroom>(`${this.api}/${id}`, bedroom);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
