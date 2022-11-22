import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Course } from "../../models/course";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

import { Student } from "../../models/student";
import { StudentService } from "../../services/student.service";
import { CourseService } from "../../services/course.service";

@Component({
    templateUrl: './student-form.component.html'
})
export class StudentFormComponent implements OnInit {
    @Input() student: Student;
    errMsg: string;
    isLoading = false;
    courses: Course[];

    constructor(private activeModal: NgbActiveModal,
        private studentService: StudentService,
        private courseService: CourseService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.courseService.getCourses()
        .subscribe(courses => {
            this.courses = courses;
            this.isLoading = false;
        }, errMsg => {
            this.errMsg = errMsg;
            this.isLoading = false;
        });
    }

    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.student.id) {
            this.studentService.updateStudent(this.student, this.student.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.studentService.saveStudent(this.student)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        }
    }

    onDelete() {
        this.isLoading = true;
        this.studentService.deleteStudent(this.student.id)
            .subscribe(() => {
                this.activeModal.close();
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }

    courseFormatter = (course: Course) => course.team;

    searchCourses: OperatorFunction<string, readonly { id; team }[]> = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter((term) => term.length >= 1),
        map((term) => this.courses.filter((course) => new RegExp(term, 'mi').test(course.team)).slice(0, 10)),
    );
}