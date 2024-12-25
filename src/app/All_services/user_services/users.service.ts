import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = `${ environment.apiUrl}/users`;

  constructor(private http: HttpClient, private authService: AuthService) { }


  getUserById(id: string): Observable<any> {

    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });


    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
