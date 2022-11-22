import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';

import { Course } from "../../models/course";
import { School } from "../../models/school";
import { CourseService } from "../../services/course.service";
import { SchoolService } from "../../services/school.service";

@Component({
    templateUrl: './course-form.component.html'
})
export class CourseFormComponent implements OnInit {
    @Input() course: Course;
    errMsg: string;
    isLoading = false;
    schools: School[];

    constructor(private activeModal: NgbActiveModal,
        private courseService: CourseService,
        private schoolService: SchoolService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.schoolService.getSchools()
            .subscribe(schools => {
                this.schools = schools;
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
        if (this.course.id) {
            this.courseService.updateCourse(this.course, this.course.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.courseService.saveCourse(this.course)
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
        this.courseService.deleteCourse(this.course.id)
            .subscribe(() => {
                this.activeModal.close();
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }

    schoolFormatter = (school: School) => school.name;

    searchSchools: OperatorFunction<string, readonly { id; name }[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            filter((term) => term.length >= 2),
            map((term) => this.schools.filter((school) => new RegExp(term, 'mi').test(school.name)).slice(0, 10)),
        );
}