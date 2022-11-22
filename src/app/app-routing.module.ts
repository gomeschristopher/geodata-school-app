import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { SchoolListComponent } from './pages/school-list/school-list.component';
import { StudentListComponent } from './pages/student-list/student-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'escola', pathMatch: 'full' },
  { path: 'escola', component: SchoolListComponent },
  { path: 'classe', component: CourseListComponent },
  { path: 'aluno', component: StudentListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
