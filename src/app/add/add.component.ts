import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../model/student.model';
import { AddService } from './add.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Laptop } from '../model/laptop.model';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [AddService, HttpClient]
})
export class AddComponent {
  constructor(private service: AddService) { }
  
  avaiablelaptops: any[] = [];
 

  newStudent: Student = {
    name: '', mark: 0,
    gender:'',
    laptops: [],
    age:0
  };
  newLaptop: any = {
    laptops: [],
  };

  submitStudent(Student: any) {
    this.service.postStudent(Student)
      .subscribe({
        next: (response) => {
          console.log('Student added successfully', response);
          alert('Student added successfully!');
          // this.getStudents();
          this.resetForm();

        },
        error: (error) => {
          console.error('There was an error!', error);
          alert('Error adding student!');
        }
      });
  }
  resetForm() {
    this.newStudent = {
      name: '',
      mark: 0,
      laptops: [{ lname: '' }]
      // Clear laptop fields and initialize with one empty laptop field
    };
  }
  addLaptop() {
    this.newStudent.laptops.push({ lname: '' });
  }
  showme: boolean = false;

  removeLaptop(index: number) {
    if (this.newStudent.laptops.length > 0) {
      this.newStudent.laptops.splice(index, 1);
    }
  }
 
}
