import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Laptop } from '../model/laptop.model';
import { EditService } from './edit.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule, ButtonModule, InputTextModule, DropdownModule, CheckboxModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers:[EditService,HttpClient]
})
export class EditComponent {

  isshow:Boolean=true;
  lno!: number;
  newLaptop: Laptop|any = {
    lno: 0,
    lname:'',
    serialno:''
  };
   


constructor(private route: ActivatedRoute,private router:Router, private editservice:EditService){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lno = +params['lno']; 
      this.newLaptop = this.editservice.getSpecificLaptop(this.lno).subscribe({
        next:(data)=>{
          this.newLaptop=data;
        }
      })
      console.log(this.lno) // Get the subject ID from the URL
     
    });
  }
getlaptop(){
  this.editservice.updateLaptop(this.lno, this.newLaptop).subscribe((data: any) => {
    this.newLaptop = data;

  });
  this.router.navigate(["/viewtable"]);
}
}
