import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:3000/api'
  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post(`${this.url}/login`, data)
  }
}
