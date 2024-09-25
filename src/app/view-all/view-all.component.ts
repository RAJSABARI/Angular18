import { Component } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { Student } from '../model/student.model';
import { ViewAllService } from './view-all.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddService } from '../add/add.service';
import { ViewLaptopComponent } from "../view-laptop/view-laptop.component";
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-view-all',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterOutlet, HttpClientModule, ViewLaptopComponent, TableModule],
  templateUrl: './view-all.component.html',
  styleUrl: './view-all.component.css',
  providers: [ViewAllService, HttpClient]
})
export class ViewAllComponent {

  isSelectStudentId: boolean = false;  //check the student id where it present or not
  constructor(private service: ViewAllService, private router:Router) { }     

  students: Student[] = [];  // Full list of students
  filteredStudents: Student[] = [];  // List for filtered students
  minMark: number = 0;
  maxMark: number = 100;

  searchTerm: string = '';//used to take input and send to filterstudent method

  filterStudentss() {
    if (this.searchTerm) {
      this.filteredStudents = this.students.filter(student =>
        student.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  ngOnInit(): void {
    this.loadAllStudents();  // Load all students on initialization
  }

  // Load all students from the backend (initial data load)
  loadAllStudents(): void {
    this.service.getStudent().subscribe({
      next:(data:any)=> {
      this.students = data;
      this.filteredStudents = data;
     } // Initialize filteredStudents with all students
    });
  }

  deleteStudent(rollno: number | undefined) {
    if (confirm("Are you sure you want to delete this student?")) {
      this.service.deleteStudent(rollno).subscribe(() => {
        this.students = this.students?.filter(stu => stu.rollno !== rollno);
        this.loadAllStudents();
        alert("Student deleted successfully!");

      }, error => {
        alert("Error deleting student!");
        console.error(error);
      });
    }

  }
  selectStudentId: number | undefined;  //used to store the student id

  viewLaptop(rollno: number | undefined) { //used to view the specific laptop with the help of student id
    this.selectStudentId = rollno; 
    this.isSelectStudentId = true; 
  }
  closeModalFromParent() { //used to close the laptop popup
    this.isSelectStudentId = false;
  }
  editStudent(rollno: any | undefined) {
    this.router.navigate(["/editpersonComponent",rollno]);
  }

  filterTable(): void {  //used to filter the mark and display in table
    if (this.minMark !== undefined && this.maxMark !== undefined) {
      this.service.getStudentsByMarks(this.minMark, this.maxMark).subscribe(
        (data: Student[]) => {
          this.filteredStudents = data;
          console.log(this.filteredStudents);
        },
        (error) => {
          console.error('Error filtering students:', error);
        }
      );
    }
  }

  // Reset table to show all students
  resetTable(): void {
    this.filteredStudents = this.students;  // Reset filtered students to all students
    this.minMark = 0;
    this.maxMark = 0;
  }
}
