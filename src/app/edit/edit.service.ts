import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Laptop } from '../model/laptop.model';

@Injectable({
  providedIn: 'root'
})
export class EditService {

  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }
  updateLaptop(lno:number|any, laptop: Laptop){
    return this.http.put(`${this.apiUrl}/updatelaptop/${lno}`, laptop );
  }
  getSpecificLaptop(lno:number){
    return this.http.get(`${this.apiUrl}/laptopById/${lno}`)
  }
}
