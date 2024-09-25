import { Laptop } from "./laptop.model";

export class Student {
    rollno?: number;
    mark?: number;
    name?: string;
    gender?:string;
    age?:number;
    laptops: Laptop[] = []; 
}
