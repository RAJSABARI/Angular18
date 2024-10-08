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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


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
        console.log(data);
      this.students = data;
      this.filteredStudents = data;
    } // Initialize filteredStudents with all students
  });
}

deleteStudent(id: number | undefined) {
  if (confirm("Are you sure you want to delete this student?")) {
    this.service.deleteStudent(id).subscribe(() => {
      this.students = this.students?.filter(stu => stu.id !== id);
      this.loadAllStudents();
      alert("Student deleted successfully!");
      
      }, error => {
        alert("Error deleting student!");
        console.error(error);
      });
    }
    
  }
  selectStudentId: number | undefined;  //used to store the student id
  
  viewLaptop(id: number | undefined) { //used to view the specific laptop with the help of student id
    this.selectStudentId = id; 
    this.isSelectStudentId = true; 
  }
  closeModalFromParent() { //used to close the laptop popup
    this.isSelectStudentId = false;
  }
  editStudent(id: number | undefined) {
    console.log(id);
    this.router.navigate(["/editpersonComponent",id]);
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
  generatePDF() { //generate pdf // Install jspdf and jspdf-autotable in Angular
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Student Details with Laptops', 14, 10);
    
    const columns = [
      { header: 'Roll No', dataKey: 'rollnumber' },
      { header: 'Name', dataKey: 'name' },
      { header: 'Mark', dataKey: 'mark' },
      { header: 'Gender', dataKey: 'gender' },
      { header: 'Age', dataKey: 'age' },
      { header: 'Laptop SerialNo', dataKey: 'serialno' },
      { header: 'Laptop Name', dataKey: 'lname' }
    ];


    const rows: { rollnumber: string | undefined; name: string | undefined; mark: number | undefined; gender: string | undefined; age: number | undefined; LaptopSerialno: string | undefined; lname: string | undefined; }[]=[]
    this.students.forEach(student => {
      student.laptops.forEach(laptop => {
        rows.push({
          rollnumber:student.rollno,
          name: student.name,
          mark: student.mark,
          gender: student.gender,
          age: student.age,
          LaptopSerialno: laptop.serialno,
          lname: laptop.lname
        });
      });
    //  console.log(student.id);
    });


    (doc as any).autoTable({
      head: [columns.map(col => col.header)],
      body: rows.map(row => Object.values(row)),
      theme: 'striped',
      headStyles: { fillColor: [44, 62, 80], textColor: [255, 255, 255] },
      styles: { fontSize: 10, cellPadding: 3 },
      startY: 20 // Starts the table after the title
    });
      doc.save('student-laptop-details.pdf');
  }

  generateExcel() { // Install the xlsx Library
    const data: any[] = [];
    this.students.forEach(student => {
      student.laptops.forEach(laptop => {
        data.push({
          'Roll No': student.rollno,
          'Name': student.name,
          'Mark': student.mark,
          'Gender': student.gender,
          'Age': student.age,
          'Laptop No': laptop.serialno,
          'Laptop Name': laptop.lname
        });
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
     // Create a workbook and add the worksheet
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'StudentLaptops');
 
     // Export the workbook to Excel
     XLSX.writeFile(wb, 'student-laptop-details.xlsx');
  }
}
