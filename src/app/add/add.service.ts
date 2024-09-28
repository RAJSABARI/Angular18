import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddService {
  private apiUrl = 'http://localhost:8080/api'; // Base URL for the API

  constructor(private http: HttpClient) { }

  postStudent(student: Student): Observable<Student> {
    console.log('Student to post:', student);
    return this.http.post<Student>(`${this.apiUrl}/post`, student);
  }
  dropDownLaptop(){
    return this.http.get(`${this.apiUrl}/getAllLaptops`)
  }
}


  
