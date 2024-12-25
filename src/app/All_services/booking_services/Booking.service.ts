import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
     providedIn: 'root',
})
export class BookingService {
     private apiUrl = `${ environment.apiUrl}/booking`;

     constructor(private http: HttpClient) { }

     // Create a new booking
     createBooking(data: any): Observable<any> {
          return this.http.post(`${this.apiUrl}`, data, this.getAuthHeaders());
     }


     // Helper to get Authorization headers
     private getAuthHeaders(): { headers: HttpHeaders } {
          const token = localStorage.getItem('authToken');
          return {
               headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
               }),
          };
     }
}
