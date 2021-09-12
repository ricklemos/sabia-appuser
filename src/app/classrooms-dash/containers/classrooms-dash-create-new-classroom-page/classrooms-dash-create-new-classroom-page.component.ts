import { Component, OnInit } from '@angular/core';
import { ClassroomsDashClassroom } from '../../models/classrooms-dash-models';
import { ClassroomsDashUploadClassroomService } from '../../services/classrooms-dash-upload-classroom.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'classrooms-dash-create-new-classroom-page',
  templateUrl: './classrooms-dash-create-new-classroom-page.component.html',
  styleUrls: ['../../../../assets/styles/classrooms-dash.scss']
})
export class ClassroomsDashCreateNewClassroomPageComponent implements OnInit {

  students: string[] = [];
  classroom: ClassroomsDashClassroom;
  isCourseCheck = false;
  isStudentsCheck = false;
  submitDisabled = true;

  constructor(
    private instructorDashUploadClassroomService: ClassroomsDashUploadClassroomService,
    private router: Router,
    private urlService: UrlService,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  createClassroom(): void {
    this.classroom.students = this.students;
    this.instructorDashUploadClassroomService.createClassroom(this.classroom)
      .then(() => {
        this.matSnackBar.open('Turma criada', 'OK', {
          duration: 3000
        });
        this.router.navigate([this.urlService.getClassroomsDashPage()]);
      })
      .catch((error) => console.log(error));
  }

  courseCheck($event): void{
    this.classroom = $event;
    this.isCourseCheck = true;
    this.submitDisabled = !this.isStudentsCheck;
  }

  studentsCheck($event): void {
    this.students = $event;
    this.isStudentsCheck = true;
    this.submitDisabled = !this.isCourseCheck;
  }

}
