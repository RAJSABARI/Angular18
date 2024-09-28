import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NumberValidationDirectiveDirectiveDirective } from '../derivative/number-validation-directive-directive.directive';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [AddService, HttpClient],
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,HttpClientModule,NumberValidationDirectiveDirectiveDirective]
})
export class AddComponent implements OnInit {
  studentForm!: FormGroup;
  showme: boolean = false;

  constructor(private service: AddService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      rollno: ['', Validators.required],
      name: ['', Validators.required],
      mark: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],  // Number validation
      gender: ['', Validators.required],
      age: ['', Validators.required],
      addLaptop: [false],
      laptops: this.fb.array([]),  // Laptop array initialized as empty
    });
  }

  get laptops(): FormArray {
    return this.studentForm.get('laptops') as FormArray;
  }

  // Function to handle form submission
  submitStudent() {
    if (this.studentForm.invalid) {
      console.log('Form is invalid', this.studentForm.errors);
      return;
    }

    // Map laptops to the required structure
    const laptops = this.laptops.controls.map(laptop => ({
      lname: laptop.get('lname')?.value,
      serialno: laptop.get('serialno')?.value,
    }));

    // Create student object
    const studentToSubmit = {
      ...this.studentForm.value,
      laptops: laptops,
    };

    console.log('Submitting student:', studentToSubmit);

    this.service.postStudent(studentToSubmit).subscribe({
      next: (response) => {
        console.log('Student added successfully', response);
        alert('Student added successfully!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding student!', error);
        alert('Error adding student!');
      }
    });
  }

  // Reset form
  resetForm() {
    this.studentForm.reset();
    this.laptops.clear();
    this.showme = false;
    this.studentForm.get('addLaptop')?.setValue(false);  // Uncheck 'Add Laptop' checkbox
  }

  // Add a new laptop FormGroup
  addLaptop() {
    const laptopGroup = this.fb.group({
      lname: ['', Validators.required],
      serialno: ['', Validators.required],
    });
    this.laptops.push(laptopGroup);
  }

  // Remove a laptop from the array
  removeLaptop(index: number) {
    if (this.laptops.length > 0) {
      this.laptops.removeAt(index);
    }
  }

  // Toggle laptop section visibility
  toggleLaptopSection(event?: Event) {
    if (event) {
      const checkbox = event.target as HTMLInputElement;
      this.showme = checkbox.checked;
    } else {
      this.showme = this.studentForm.get('addLaptop')?.value || false;
    }

    if (!this.showme) {
      this.laptops.clear();
    }
  }
}
