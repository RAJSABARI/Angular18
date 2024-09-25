import { Component } from '@angular/core';
import { Student } from '../model/student.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { EditpersonService } from './editperson.service';

@Component({
  selector: 'app-editperson',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ButtonModule, InputTextModule, DropdownModule, CheckboxModule],
  templateUrl: './editperson.component.html',
  styleUrl: './editperson.component.css',
  providers: [EditpersonService, HttpClient]
})
export class EditpersonComponent {
  rollno?: number;
  newPerson: Student | any =
    {
      rollno: 0,
      mark: 0,
      name: '',
      gender: '',
      age: 0
    }
  constructor(private route: ActivatedRoute, private router: Router, private editpersonService: EditpersonService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.rollno = +params['rollno'];
      this.newPerson = this.editpersonService.getSepecificPerson(this.rollno).subscribe({
        next: (data) => {
          this.newPerson = data;
          console.log(this.newPerson)
        }
      })
    });

  }

  updateSpecificPerson() {
    this.editpersonService.updatespecificPerson(this.rollno, this.newPerson).subscribe({
      next: (data) => {
        this.newPerson = data
      }

    });
    this.router.navigate(["/viewtable"]);
  }
}
