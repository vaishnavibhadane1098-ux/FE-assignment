import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentData } from '../models/environment.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
  private baseUrl = 'http://localhost:3001/api/bedrooms';

  constructor(private http: HttpClient) {}

  getAll(bedroomId: number): Observable<EnvironmentData[]> {
    return this.http.get<EnvironmentData[]>(`${this.baseUrl}/${bedroomId}/environment`);
  }

  create(bedroomId:any, data: Partial<EnvironmentData>): Observable<EnvironmentData> {
    return this.http.post<EnvironmentData>(`${this.baseUrl}/${bedroomId}/environment`, data);
  }

  update(bedroomId: number, envId: number, data: Partial<EnvironmentData>): Observable<EnvironmentData> {
    return this.http.put<EnvironmentData>(`${this.baseUrl}/${bedroomId}/environment/${envId}`, data);
  }

  delete(bedroomId: number, envId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/environment/${envId}`);
  }
}
