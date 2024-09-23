import { Laptop } from "./laptop.model";

export class Student {
    rollno?: number;
    mark?: number;
    name?: string;
    laptops: Laptop[] = []; 
}
