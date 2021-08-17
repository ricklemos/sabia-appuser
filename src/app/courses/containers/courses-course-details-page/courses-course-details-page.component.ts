import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enrollment } from '../../models/enrollment';
import { CoursesService } from '../../services/courses.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'courses-course-details',
  templateUrl: './courses-course-details-page.component.html',
  styleUrls: ['./courses-course-details-page.component.scss']
})
export class CoursesCourseDetailsPageComponent implements OnInit {
  enrollment$: Enrollment;
  modules = [{
    name: 'Renda fixa',
    progress: 0.9,
  },
    {
      name: 'Renda fixa',
      progress: 0.9,
    },
    {
      name: 'Renda fixa',
      progress: 0.9,
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private coursesServices: CoursesService
  ) {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    // TODO: PUXAR O CURSO DIREITO
    this.enrollment$ = {
      classroomId: '',
      classroomName: '',
      courseName: 'General Business Program (GBP)',
      courseDescription: 'Qualquer coisa',
      courseId: '01',
      userId: '',
      courseLink: 'https://tburleson-layouts-demos.firebaseapp.com/#/docs'
    };
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.coursesServices.fetchCoursesDetails(courseId).pipe(
      tap(data => {
        console.log(data);
      })
    ).subscribe(noop);
  }
}
