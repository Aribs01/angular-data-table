import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../schemas/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUser() {
    return this.http.get<any>('assets/data.json')
    .toPromise()
    .then(res => <User[]>res.data).then(data => { return data; });
  }
}
