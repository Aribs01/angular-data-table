import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../schemas/User';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<any>(this.getBaseApiUrl()+'users/70R0l0YsR7OV667')
  }

  markPaid(data: any): Observable<any> {
    return this.http.patch<any>(this.getBaseApiUrl() + 'mark-paid/' + data.id, data);
  }

  private getBaseApiUrl(): string {
    return isDevMode() ? environment.apiBaseUrl : environment.apiBaseUrl;
  }
}
