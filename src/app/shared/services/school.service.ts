import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { School } from "../models/school";

@Injectable({
    providedIn: 'root'
})
export class SchoolService {

    constructor(private http: HttpClient) { }

    getSchools() {
        return this.http.get<School[]>(`${environment.apiUrl}/schools`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    saveSchool(School: School) {
        return this.http.post(`${environment.apiUrl}/schools`, School).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    updateSchool(School: School, id: number) {
        return this.http.put(`${environment.apiUrl}/schools/${id}`, School).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }

    deleteSchool(id: number) {
        return this.http.delete(`${environment.apiUrl}/schools/${id}`).pipe(
            catchError(errorRes => {
                return throwError(errorRes.error.message);
            }));
    }
}