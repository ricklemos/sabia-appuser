import { Component, OnInit } from '@angular/core';
import { ClassroomsDashClassroom } from '../../models/classrooms-dash-models';
import { ClassroomsDashUploadClassroomService } from '../../services/classrooms-dash-upload-classroom.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
@Component({
  selector: 'classrooms-dash-classrooms-page',
  templateUrl: './classrooms-dash-classrooms-page.component.html',
  styleUrls: ['../../../../assets/styles/classrooms-dash.scss']
})
export class ClassroomsDashClassroomsPageComponent implements OnInit {

  classrooms: ClassroomsDashClassroom[] = [];
  loadingClassrooms = true;

  constructor(
    private instructorDashUploadClassroomService: ClassroomsDashUploadClassroomService,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    this.instructorDashUploadClassroomService.fetchClassrooms().pipe(
      tap((classroomsQuery) => {
        classroomsQuery.forEach((classroomDoc) => {
          this.classrooms.push(classroomDoc.data());
          this.loadingClassrooms = false;
        });
      })
    ).subscribe(noop);
  }

  goToClassroomPage(classroom: ClassroomsDashClassroom): void {
    this.router.navigate([this.urlService.getClassroomsDashClassroomPage(classroom.classroomId)]);
  }
}
