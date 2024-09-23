import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewAllLaptopsService {
  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }
  getLaptop(){
    return this.http.get(`${this.apiUrl}/getAllLaptops`)
  }
}
