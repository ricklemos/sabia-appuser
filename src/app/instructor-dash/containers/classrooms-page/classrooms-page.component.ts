import { Component, OnInit } from '@angular/core';
import { InstructorDashClassroom } from '../../models/instructor-dash-models';
import { InstructorDashUploadClassroomService } from '../../services/instructor-dash-upload-classroom.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'classrooms-page',
  templateUrl: './classrooms-page.component.html',
  styleUrls: ['./classrooms-page.component.scss']
})
export class ClassroomsPageComponent implements OnInit {

  classrooms: InstructorDashClassroom[] = [];

  constructor(
    private instructorDashUploadClassroomService: InstructorDashUploadClassroomService,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    this.instructorDashUploadClassroomService.fetchClassrooms().pipe(
      tap((classroomsQuery) => {
        classroomsQuery.forEach((classroomDoc) => {
          this.classrooms.push(classroomDoc.data());
        });
      })
    ).subscribe(noop);
  }

  goToClassroomPage(classroom: InstructorDashClassroom): void {
    this.router.navigate([this.urlService.getInstructorClassroomPage(classroom.classroomId)]);
  }
}
