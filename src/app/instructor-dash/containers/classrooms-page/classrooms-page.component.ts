import { Component, OnInit } from '@angular/core';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';
import { InstructorDashUploadClassroomService } from '../../services/instructor-dash-upload-classroom.service';

@Component({
  selector: 'classrooms-page',
  templateUrl: './classrooms-page.component.html',
  styleUrls: ['./classrooms-page.component.scss']
})
export class ClassroomsPageComponent implements OnInit {

  students: string[] = [];
  classroom: InstructorDashClassroom;

  constructor(
    private instructorDashUploadClassroomService: InstructorDashUploadClassroomService
  ) {
    this.classroom = {
      classroomName: 'Teste da classe no front',
      institutionName: 'institutionName',
      classroomId: '03',
      courseId: 'courseId',
      courseName: 'courseName',
      modules: ['01', '02'],
      startDate: new Date(),
      students: []
    };
  }

  ngOnInit(): void {
  }

  getCSV($event): void{
    const files = $event.target.files;
    if (files && files.length > 0) {
      const file: File = files.item(0);
      const reader: FileReader = new FileReader();
      reader.readAsText(file);
      reader.onload = ((e) => {
        const csv: string = reader.result as string;
        // TODO: Show error message if CSV is wrong
        this.students = csv.split('\n');
        console.log(this.students);
      });
    }
  }

  uploadClassroom(): void {
    this.classroom.students = this.students;
    this.instructorDashUploadClassroomService.uploadClassroom(this.classroom)
      .then((data) => console.log('fez o upload', data));
  }
}
