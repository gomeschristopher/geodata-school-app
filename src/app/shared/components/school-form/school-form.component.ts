import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

import { School } from "../../models/school";
import { SchoolService } from "../../services/school.service";

@Component({
    templateUrl: './school-form.component.html'
})
export class SchoolFormComponent {
    @Input() school: School;
    errMsg: string;
    isLoading = false;

    constructor(private activeModal: NgbActiveModal,
        private schoolService: SchoolService) { }

    onCancel() {
        this.activeModal.dismiss();
    }

    onSave() {
        this.isLoading = true;
        if (this.school.id) {
            this.schoolService.updateSchool(this.school, this.school.id)
                .subscribe(() => {
                    this.activeModal.close();
                }, errMsg => {
                    this.errMsg = errMsg;
                    this.isLoading = false;
                });
        } else {
            this.schoolService.saveSchool(this.school)
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
        this.schoolService.deleteSchool(this.school.id)
            .subscribe(() => {
                this.activeModal.close();
            }, errMsg => {
                this.errMsg = errMsg;
                this.isLoading = false;
            });
    }
}