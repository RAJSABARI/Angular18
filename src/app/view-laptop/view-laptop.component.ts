import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { ViewAllService } from '../view-all/view-all.service';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-laptop',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule,RouterOutlet, HttpClientModule],
  templateUrl: './view-laptop.component.html',
  styleUrl: './view-laptop.component.css',
  providers:[ViewAllService,HttpClient]

})
export class ViewLaptopComponent {
  @Input()rol: number | undefined;
  @Input() isSelectStudentId: boolean = true;
  @Output() closeEvent = new EventEmitter<void>();
  laptops?: Laptop[] = [];

  constructor(private service: ViewAllService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rol'] && this.rol !== undefined) {
      this.loadlaptop();
    }
  }
  loadlaptop(){
    this.service.loadLaptop(this.rol).subscribe({
      next:(data:any)=>{
        this.laptops=data;
        console.log(data);
      }
    })
  }
  closeModal() {
    //this.isSelectStudentId = false;
    this.closeEvent.emit(); 
  }
  
  
  deleteSpecificLaptop(rollno: number | undefined) {
    if (confirm("Are you sure you want to delete this Laptop?")) {
      this.service.deleteLaptop(rollno).subscribe(() => {
        this.laptops = this.laptops?.filter(stu => stu.lno !== rollno);
        alert("Laptop deleted successfully!");

      }, error => {
        alert("Error deleting student!");
        console.error(error);
      });
    }

  }
}
