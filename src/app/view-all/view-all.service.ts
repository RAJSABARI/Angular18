import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewAllService {
  private apiUrl='http://localhost:8080/api';
  constructor(private http:HttpClient) { }
  getStudent(){
    return this.http.get(`${this.apiUrl}/getAllStudents`)
  }
  getLaptop(){
    return this.http.get(`${this.apiUrl}/getAllLaptops`)
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
}
