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

  constructor(
    private instructorDashUploadClassroomService: InstructorDashUploadClassroomService,
    private router: Router,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
    this.classroom = {
      classroomName: 'Teste da classe no front 2',
      institutionName: 'institutionName2',
      classroomId: '04',
      courseId: 'courseId',
      courseName: 'courseName',
      modules: ['01', '02'],
      startDate: new Date(),
      students: []
    };
  }

  createClassroom(): void {
    this.classroom.students = this.students;
    this.instructorDashUploadClassroomService.createClassroom(this.classroom)
      .then((data) => {
        console.log('fez o upload', data);
        console.log(data.id);
      })
      .catch((error) => console.log(error));
  }

  getCSV($event): void {
    const files = $event.target.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = ((e) => {
        const csv: string = reader.result as string;
        // TODO: Show error message if CSV is wrong
        this.students = this.students.concat(csv.split('\n'));
      });
    }
  }

}
