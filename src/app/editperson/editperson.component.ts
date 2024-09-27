import { Component } from '@angular/core';
import { Student } from '../model/student.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { EditpersonService } from './editperson.service';

@Component({
  selector: 'app-editperson',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ButtonModule, InputTextModule, DropdownModule, CheckboxModule, ReactiveFormsModule],
  templateUrl: './editperson.component.html',
  styleUrls: ['./editperson.component.css'],
  providers: [EditpersonService, HttpClient]
})
export class EditpersonComponent {
  rollno?: number;
  updateForm!: FormGroup; 
  newPerson: Student | any = {
    rollno: 0,
    mark: 0,
    name: '',
    gender: '',
    age: 0
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private editpersonService: EditpersonService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rollno = +params['rollno']; // Get roll number from route
      this.getPersonDetails(this.rollno);
    });

    // Initialize the form
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      mark: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      gender: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  // Fetch specific student details
  getPersonDetails(rollno: number): void {
    this.editpersonService.getSepecificPerson(rollno).subscribe({
      next: (data) => {
        this.newPerson = data;

        // Patch the form with the data
        //it is used to bind in input box it will not have value in updatedform 
        this.updateForm.patchValue({
          name: this.newPerson.name,
          mark: this.newPerson.mark,
          gender: this.newPerson.gender,
          age: this.newPerson.age
        });
      }
    });
  }

 
  updateSpecificPerson(): void {
    if (this.updateForm.valid) {
        // Prepare the updated student data
        const updatedPerson = {
          // updateperson method used to match the jsons with the help of spreadoperator this.newperson empty entity updateform
          // which contain the value with the help of spreadoperator it match the json and store to updatedperosn and send to editperosn and save to database 
            ...this.newPerson, // Existing data 
            ...this.updateForm.value // New form values
        };

        this.editpersonService.updatespecificPerson(this.rollno, updatedPerson).subscribe({ //here we pass updateperson 
            next: (data) => {
                console.log('Student updated successfully', data);
                this.router.navigate(['/viewtable']);
            },
            error: (error) => {
                console.error('There was an error updating the student!', error);
            }
        });
    }
}

}
