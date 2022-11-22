import { School } from "./school";

export class Course {
    id: number;
    school: School;
    is_active: number = 1;
    team: string;
    room: number;
}