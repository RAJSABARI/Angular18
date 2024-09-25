import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';
import { Observable } from 'rxjs';
import { Laptop } from '../model/laptop.model';

@Injectable({
  providedIn: 'root'
})
export class ViewAllService {
  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }
  getStudent(){
    return this.http.get(`${this.apiUrl}/getAllStudents`)
  }
  
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/getAllStudents`);
  }
  deleteStudent(id:any){
    return this.http.delete(`${this.apiUrl}/deleteByStudentId/`+id)
  }
  loadLaptop(id?:number){
    return this.http.get(`${this.apiUrl}/sId/${id}`)
  }

deleteLaptop(id:any){
  return this.http.delete(`${this.apiUrl}/deleteByLaptopId/`+id)
}

getStudentsByMarks(minMark: number, maxMark: number): Observable<Student[]> {
  let params = new HttpParams().set('minMark', minMark).set('maxMark', maxMark);
  return this.http.get<Student[]>(`${this.apiUrl}/filter`, { params });
}

addnewLaptop(rollno:number|any, laptop: Laptop){
  return this.http.post(`${this.apiUrl}/createNewLaptopInExisting/${rollno}`, laptop );
}
}
