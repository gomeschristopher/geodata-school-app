import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Course } from "../models/course";

@Injectable({
    providedIn: 'root'
})
export class CourseService {

    constructor(private http: HttpClient) { }

    getCourses() {
        return this.http.get<Course[]>(`${environment.apiUrl}/courses`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveCourse(course: Course) {
        return this.http.post(`${environment.apiUrl}/courses`, course).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateCourse(course: Course, id: number) {
        return this.http.put(`${environment.apiUrl}/courses/${id}`, course).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteCourse(id: number) {
        return this.http.delete(`${environment.apiUrl}/courses/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}