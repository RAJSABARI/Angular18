import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Laptop } from '../model/laptop.model';
import { ViewAllService } from '../view-all/view-all.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-view-laptop',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, RouterOutlet, HttpClientModule, TableModule],
  templateUrl: './view-laptop.component.html',
  styleUrl: './view-laptop.component.css',
  providers: [ViewAllService, HttpClient]

})
export class ViewLaptopComponent {

  @Input() rol: number | undefined;
  @Input() isSelectStudentId: boolean = true;
  @Output() closeEvent = new EventEmitter<void>();
  laptops: Laptop[] = [];
  
  constructor(private service: ViewAllService, private router: Router) { }
  showme: boolean=false;


  onInit() {
    this.submitLaptop();
   this. filterLaptops()
 
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rol'] && this.rol !== undefined) {
      this.loadlaptop();

    }
  }
  loadlaptop() {
    this.service.loadLaptop(this.rol).subscribe({
      next: (data: any) => {
        this.laptops = data;
        this.filteredLaptops=data;
       //this.filterLaptops=data;
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
       this.loadlaptop();

      }, error => {
        alert("Error deleting student!");
        console.error(error);
      });
    }

  }

  editspecificLaptop(lno: number | undefined) {
    this.router.navigate(['/editComponenet', lno]);
  }

  newLaptop: Laptop = {
    lno: 0,
    lname: '',
    serialno: ''
  };
  submitLaptop() {
    if (this.newLaptop.lname != '') {
      this.service.addnewLaptop(this.rol, this.newLaptop).subscribe({
        next: () => {
          console.log("oK");
          this.loadlaptop();

        }
      })
    }

  }

  filteredLaptops:Laptop[]=[]; // Make a copy of the original data
  searchTerm: string = '';

  // Function to filter laptops by name
  filterLaptops() {
    if (this.searchTerm) {
      this.filteredLaptops = this.laptops.filter(lap =>
        lap.lname?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredLaptops = [...this.laptops];
    }
  }

}
