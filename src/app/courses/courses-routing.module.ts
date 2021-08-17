import { Routes } from '@angular/router';
import { CoursesMycoursesPageComponent } from './containers/courses-mycourses-page/courses-mycourses-page.component';
import { CoursesCourseDetailsPageComponent } from './containers/courses-course-details-page/courses-course-details-page.component';

export const CoursesRoutes: Routes = [
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: CoursesMycoursesPageComponent
      },
      {
        path: ':courseId',
        component: CoursesCourseDetailsPageComponent
      }
    ],
    // canActivate: [AuthGuard]
  }
];
