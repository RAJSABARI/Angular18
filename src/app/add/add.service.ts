import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }
  postStudent(students:Student){
    console.log(students);
    return this.http.post(`${this.apiUrl}/post`,students)
  }

  dropDownLaptop(){
    return this.http.get(`${this.apiUrl}/getAllLaptops`)
  }
}
