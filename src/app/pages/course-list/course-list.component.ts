import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { CourseFormComponent } from "src/app/shared/components/course-form/course-form.component";

import { Course } from "src/app/shared/models/course";
import { CourseService } from "src/app/shared/services/course.service";

@Component({
    templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit {
    isLoading = false;
    errMsg: string;
    courses: Course[];

    constructor(private courseService: CourseService,
        private modalService: NgbModal) {}

    onOpenCourseFormModal(course: Course = new Course) {
        const modalRef = this.modalService.open(CourseFormComponent);
        modalRef.componentInstance.course = { ...course };
        modalRef.result.then(() => {
            this.getCourses();
        }, () => {});
    }

    getCourses() {
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

    ngOnInit(): void {
        this.getCourses();
    }
}