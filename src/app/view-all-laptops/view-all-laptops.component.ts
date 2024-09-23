import { Component } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { ViewAllLaptopsService } from './view-all-laptops.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewLaptopComponent } from '../view-laptop/view-laptop.component';

@Component({
  selector: 'app-view-all-laptops',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterOutlet, HttpClientModule, ViewLaptopComponent],
  templateUrl: './view-all-laptops.component.html',
  styleUrl: './view-all-laptops.component.css',
  providers:[ViewAllLaptopsService,HttpClient]
})
export class ViewAllLaptopsComponent {
  laptop?: Laptop[];

  constructor(private viewAllLaptops:ViewAllLaptopsService){}

  ngOnInit(){
    this.getLaptops();
  }
  getLaptops() {
    this.viewAllLaptops.getLaptop().subscribe({
      next: (data: any) => {
        this.laptop = data;
      }
    })
  }
}
