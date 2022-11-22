import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Student } from "../models/student";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor(private http: HttpClient) { }

    getStudents() {
        return this.http.get<Student[]>(`${environment.apiUrl}/students`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveStudent(student: Student) {
        return this.http.post(`${environment.apiUrl}/students`, student).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateStudent(student: Student, id: number) {
        return this.http.put(`${environment.apiUrl}/students/${id}`, student).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteStudent(id: number) {
        return this.http.delete(`${environment.apiUrl}/students/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}