import { Component, Input, OnInit } from '@angular/core';
import { Enrollment } from '../../models/enrollment';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'courses-box',
  templateUrl: './courses-box.component.html',
  styleUrls: ['./courses-box.component.scss']
})
export class CoursesBoxComponent implements OnInit {
  @Input() enrollment: Enrollment;

  constructor(
    private coursesService: CoursesService,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
  }

  goToCourseDetails(): void {
    this.coursesService.setCourse(this.enrollment);
    this.router.navigate([this.urlService.getCoursesDetails(this.enrollment.courseId)]);
  }

}
