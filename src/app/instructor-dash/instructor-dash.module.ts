import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsPageComponent } from './containers/classrooms-page/classrooms-page.component';
import { RouterModule } from '@angular/router';
import { InstructorDashRoutes } from './instructor-dash-routing.module';
import { LayoutInstructorDashComponent } from './layout/layout-instructor-dash/layout-instructor-dash.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InstructorDashUploadClassroomService } from './services/instructor-dash-upload-classroom.service';



@NgModule({
  declarations: [
    LayoutInstructorDashComponent,
    ClassroomsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(InstructorDashRoutes),
    CollactDesignSystemModule,
    FlexLayoutModule,
  ],
  providers: [
    InstructorDashUploadClassroomService
  ]
})
export class InstructorDashModule { }
