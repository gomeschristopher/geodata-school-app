import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { CourseFormComponent } from './shared/components/course-form/course-form.component';
import { SchoolFormComponent } from './shared/components/school-form/school-form.component';
import { StudentFormComponent } from './shared/components/student-form/student-form.component';

@NgModule({
  declarations: [
    AppComponent,
    SchoolListComponent,
    StudentListComponent,
    CourseListComponent,
    SchoolFormComponent,
    CourseFormComponent,
    StudentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
