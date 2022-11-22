import { Course } from "./course";

export class Student {
    id: number;
    name: string;
    last_name: string;
    age: number;
    has_scholarship: number = 0;
    course: Course;
}