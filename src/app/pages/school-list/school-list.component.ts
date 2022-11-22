import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SchoolFormComponent } from "src/app/shared/components/school-form/school-form.component";

import { School } from "src/app/shared/models/school";
import { SchoolService } from "src/app/shared/services/school.service";

@Component({
    templateUrl: './school-list.component.html'
})
export class SchoolListComponent implements OnInit {
    isLoading = false;
    errMsg: string;
    schools: School[];

    constructor(private schoolService: SchoolService,
        private modalService: NgbModal) {}

    ngOnInit(): void {
        this.getSchools();
    }

    getSchools() {
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

    onOpenSchoolFormModal(school: School = new School) {
        const modalRef = this.modalService.open(SchoolFormComponent);
        modalRef.componentInstance.school = { ...school };
        modalRef.result.then(() => {
            this.getSchools();
        }, () => {});
    }
}