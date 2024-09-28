import { Laptop } from "./laptop.model";

export class Student {
    id: number;
    rollnumber: string;
    mark: number;
    name: string;
    age: number;
    gender: string;
    laptops: Laptop[];  // A list of laptops associated with the student

    constructor(
        id: number,
        rollnumber: string,
        mark: number,
        name: string,
        age: number,
        gender: string,
        laptops: Laptop[] = []  // Initialize laptops as an empty array by default
    ) {
        this.id = id;
        this.rollnumber = rollnumber;
        this.mark = mark;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.laptops = laptops;
    }
}
