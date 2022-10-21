import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  url = 'http://127.0.0.1:3000/api'
  constructor(private http: HttpClient) { }

  getAllStores(){
    return this.http.get(`${this.url}/stores`)
  }

  getStoreById(id){
    return this.http.get(`${this.url}/store/${id}`)
  }

  addStore(store){
    return this.http.post(`${this.url}/addStore`, store)
  }

  addProduct(product, id){
    return this.http.post(`${this.url}/addProductStore/${id}`, product)
  }
}
