import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class EditpersonService {


  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }
getSepecificPerson(id:number){
  return this.http.get(`${this.apiUrl}/studentById/${id}`)
}
updatespecificPerson(id:number|any,student:Student){
  return this.http.put(`${this.apiUrl}/updatestudent/${id}`,student);
}
}
