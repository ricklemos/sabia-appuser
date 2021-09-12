import { Component, OnInit } from '@angular/core';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';
import { InstructorDashUploadClassroomService } from '../../services/instructor-dash-upload-classroom.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'create-new-classroom-page',
  templateUrl: './create-new-classroom-page.component.html',
  styleUrls: ['../../../../assets/styles/instructor-dash.scss']
})
export class CreateNewClassroomPageComponent implements OnInit {

  students: string[] = [];
  classroom: InstructorDashClassroom;
  isCourseCheck = false;
  isStudentsCheck = false;
  submitDisabled = true;

  constructor(
    private instructorDashUploadClassroomService: InstructorDashUploadClassroomService,
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
        this.router.navigate([this.urlService.getInstructorClassroomsPage()]);
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
