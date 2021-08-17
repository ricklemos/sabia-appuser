import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesMycoursesPageComponent } from './containers/courses-mycourses-page/courses-mycourses-page.component';
import { LayoutCoursesComponent } from './layout/layout-courses/layout-courses.component';
import { RouterModule } from '@angular/router';
import { CoursesRoutes } from './courses-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CoursesBoxComponent } from './components/courses-box/courses-box.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { CoursesCourseDetailsPageComponent } from './containers/courses-course-details-page/courses-course-details-page.component';
import { CoursesModuleBoxComponent } from './components/courses-module-box/courses-module-box.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    CoursesMycoursesPageComponent,
    LayoutCoursesComponent,
    CoursesBoxComponent,
    CoursesCourseDetailsPageComponent,
    CoursesModuleBoxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MatIconModule,
    RouterModule.forChild(CoursesRoutes),
    CollactDesignSystemModule,
    MatProgressSpinnerModule
  ]
})
export class CoursesModule {
}
