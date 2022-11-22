import { Component } from "@angular/core";
import { Student } from "src/app/shared/models/student";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { StudentService } from "src/app/shared/services/student.service";
import { StudentFormComponent } from "src/app/shared/components/student-form/student-form.component";

@Component({
    templateUrl: './student-list.component.html'
})
export class StudentListComponent {
    isLoading = false;
    errMsg: string;
    students: Student[];

    constructor(private studentService: StudentService,
        private modalService: NgbModal) {}

    ngOnInit(): void {
        this.getStudents();
    }

    getStudents() {
        this.isLoading = true;
        this.studentService.getStudents()
        .subscribe(students => {
            this.students = students;
            this.isLoading = false;
        }, errMsg => {
            this.errMsg = errMsg;
            this.isLoading = false;
        });
    }

    onOpenStudentFormModal(student: Student = new Student) {
        const modalRef = this.modalService.open(StudentFormComponent);
        modalRef.componentInstance.student = { ...student };
        modalRef.result.then(() => {
            this.getStudents();
        }, () => {});
    }
}