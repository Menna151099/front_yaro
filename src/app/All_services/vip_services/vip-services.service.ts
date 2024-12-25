import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VipServicesService {

  private apiUrl = `${ environment.apiUrl}/vip`;

  constructor(private http: HttpClient) { }

  getVip(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

}
