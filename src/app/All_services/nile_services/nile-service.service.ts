import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NileServiceService {
     private apiUrl = `${ environment.apiUrl}/nile`;

  constructor(private http: HttpClient) { }

  getNile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }


}


