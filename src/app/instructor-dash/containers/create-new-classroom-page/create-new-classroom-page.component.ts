import { Component, OnInit } from '@angular/core';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';
import { InstructorDashUploadClassroomService } from '../../services/instructor-dash-upload-classroom.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'create-new-classroom-page',
  templateUrl: './create-new-classroom-page.component.html',
  styleUrls: ['./create-new-classroom-page.component.scss']
})
export class CreateNewClassroomPageComponent implements OnInit {

  students: string[] = [];
  classroom: InstructorDashClassroom;
  isCourseCheck = false;
  isStudentsCheck = false;
  submitDisabled = false;

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
    console.log('pré-final', this.classroom);
    this.isCourseCheck = true;
    this.submitDisabled = !this.isStudentsCheck;
  }

  studentsCheck($event): void {
    this.classroom.students = $event;
    console.log('final', this.classroom);
    this.isStudentsCheck = true;
    this.submitDisabled = !this.isCourseCheck;
  }

}
