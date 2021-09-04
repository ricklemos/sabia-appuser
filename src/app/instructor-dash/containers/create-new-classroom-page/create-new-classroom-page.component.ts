import { Component, OnInit } from '@angular/core';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';
import { InstructorDashUploadClassroomService } from '../../services/instructor-dash-upload-classroom.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

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
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    // this.classroom = {
    //   classroomName: 'Teste da classe no front 2',
    //   institutionName: 'institutionName2',
    //   classroomId: '04',
    //   courseId: 'courseId',
    //   courseName: 'courseName',
    //   modules: ['01', '02'],
    //   startDate: new Date(),
    //   students: []
    // };
  }

  createClassroom(): void {
    console.log('clicou pra criar a classe');
    this.instructorDashUploadClassroomService.createClassroom(this.classroom)
      .then((data) => {
        console.log('fez o upload', data);
        console.log(data.id);
      })
      .catch((error) => console.log(error));
  }

  courseCheck($event): void{
    this.classroom = $event;
    console.log('pré-final', this.classroom);
    this.isCourseCheck = true;
    this.submitDisabled = this.isStudentsCheck ? false : true;
  }

  studentsCheck($event): void {
    this.classroom.students = $event;
    console.log('final', this.classroom);
    this.isStudentsCheck = true;
    this.submitDisabled = this.isCourseCheck ? false : true;
  }

}
