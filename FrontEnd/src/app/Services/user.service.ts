import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://127.0.0.1:3000/api'
  constructor(private http: HttpClient) { }

  registerUser(data){
    return this.http.post(`${this.url}/register`, data)
  }

  login(data) {
    return this.http.post(`${this.url}/login`, data)
  }

  getUserByid(userId) {
    return this.http.get(`${this.url}/userID/${userId}`)
  }

  editUser(email, name, imagePath:File, id){
    const fd = new FormData()
    fd.append('name', name)
    fd.append('email', email)
    fd.append('imagePath', imagePath)
    console.log(fd);
    
    return this.http.put(`${this.url}/update/${id}`, fd)
  }
}
