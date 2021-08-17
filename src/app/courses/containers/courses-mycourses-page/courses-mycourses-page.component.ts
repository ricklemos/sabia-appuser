import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'courses-mycourses-page',
  templateUrl: './courses-mycourses-page.component.html',
  styleUrls: ['./courses-mycourses-page.component.scss']
})
export class CoursesMycoursesPageComponent implements OnInit {

  coursesList = [];

  constructor(
    private coursesServices: CoursesService
  ) {
  }

  ngOnInit(): void {

    this.coursesServices.fetchCourses().pipe(
      tap(data => {
        this.coursesList = data;
      })
    ).subscribe(noop);

  }

}
