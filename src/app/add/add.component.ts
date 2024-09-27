import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
import { AddService } from './add.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [AddService, HttpClient]
})
export class AddComponent {
  studentForm!: FormGroup;
  showme: boolean = false;

  constructor(private service: AddService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      mark: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
      laptops: this.fb.array([]), // FormArray for laptops
      addLaptop: [false] 
    });
  }

  get laptops(): FormArray {
    return this.studentForm.get('laptops') as FormArray;
  }

  submitStudent(studentData: any) {
    // Map laptops from form to the Laptop entities
    const laptops = studentData.laptops.map((laptopName: string) => {
      return { lname: laptopName }; // Assuming your Laptop entity has a `lname` field
    });

    // Create a new student object with mapped laptops
    const studentToSubmit = {
      ...studentData,
      laptops: laptops // Set the mapped laptops
    };

    this.service.postStudent(studentToSubmit).subscribe({
      next: (response) => {
        console.log('Student added successfully', response);
        alert('Student added successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('There was an error!', error);
        alert('Error adding student!');
      }
    });
  }

  resetForm() {
    this.studentForm.reset();
    this.laptops.clear(); // Clear the laptops array
    this.showme = false;   
    this.studentForm.get('addLaptop')?.setValue(false); // Reset the checkbox
  
  }

  addLaptop() {
    this.laptops.push(this.fb.control('')); // Add new FormControl to FormArray
    //when we click addlaptop it push the empty input box
    // 
  }

  removeLaptop(index: number) {
    if (this.laptops.length > 0) {
      this.laptops.removeAt(index); // Remove FormControl from FormArray
    }
  }

  toggleLaptopSection(event?: Event) {
    if (event) {
      const checkbox = event.target as HTMLInputElement;
      this.showme = checkbox.checked;
    } else {
      this.showme = this.studentForm.get('addLaptop')?.value || false;
    }
  
    if (!this.showme) {
      this.laptops.clear(); // Clear laptops if section is hidden
    }
  }
}
