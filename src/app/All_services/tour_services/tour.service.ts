import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TourService {
  private apiUrl = `${ environment.apiUrl}/tours`;

  constructor(private http: HttpClient) { }

  getAllTours(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getTourById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
