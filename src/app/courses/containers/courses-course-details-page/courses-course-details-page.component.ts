import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Enrollment } from '../../models/enrollment';
import { CoursesService } from '../../services/courses.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'courses-course-details',
  templateUrl: './courses-course-details-page.component.html',
  styleUrls: ['./courses-course-details-page.component.scss']
})
export class CoursesCourseDetailsPageComponent implements OnInit, OnDestroy {
  enrollment: Enrollment;
  modulesList = [];
  subscriptions = [];

  constructor(
    private route: ActivatedRoute,
    private coursesServices: CoursesService,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    const fetchModules = this.coursesServices.fetchModules(courseId).pipe(
      tap(data => {
        console.log('modules', data);
        this.modulesList = data;
      })
    ).subscribe(noop);

    this.subscriptions.push(fetchModules);
    this.enrollment = this.coursesServices.getCourse();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
  }

  goBack(): void {
    this.router.navigate([this.urlService.getCourses()]);
  }
}
