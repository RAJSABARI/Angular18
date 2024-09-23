import { Component } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { Student } from '../model/student.model';
import { ViewAllService } from './view-all.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddService } from '../add/add.service';
import { ViewLaptopComponent } from "../view-laptop/view-laptop.component";

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterOutlet, HttpClientModule, ViewLaptopComponent],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css',
  providers: [ViewAllService, HttpClient]
})
export class ViewAllComponent {
students?: Student[] = [];

  isSelectStudentId: boolean = false;
  showme: boolean = false;


  constructor(private service: ViewAllService) { }

  ngOnInit() {
    this.getStudents();

  }


  getStudents(): void {
    this.service.getStudent().subscribe({
      next: (data: any) => {
        this.students = data;
        console.log(data);
      }
    })
  }
  deleteStudent(rollno: number | undefined) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.service.deleteStudent(rollno).subscribe(() => {
        this.students = this.students?.filter(stu => stu.rollno !== rollno);
        alert("Student deleted successfully!");

      }, error => {
        alert("Error deleting student!");
        console.error(error);
      });
    }

  }
  selectStudentId: number | undefined;
  // laptopModel: boolean = false;


  viewLaptop(rollno: number | undefined) {
    this.selectStudentId = rollno;
    this.isSelectStudentId = true;
  }
  closeModalFromParent() {
    this.isSelectStudentId = false;
  }
}
