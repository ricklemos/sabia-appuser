import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassroomsDashClassroomsPageComponent } from './containers/classrooms-dash-classrooms-page/classrooms-dash-classrooms-page.component';
import { RouterModule } from '@angular/router';
import { ClassroomsDashRoutes } from './classrooms-dash-routing.module';
import { LayoutClassroomsDashComponent } from './layout/layout-classrooms-dash/layout-classrooms-dash.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ClassroomsDashUploadClassroomService } from './services/classrooms-dash-upload-classroom.service';
import { ClassroomsDashClassroomPageComponent } from './containers/classrooms-dash-classroom-page/classrooms-dash-classroom-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClassroomsDashCreateNewClassroomPageComponent } from './containers/classrooms-dash-create-new-classroom-page/classrooms-dash-create-new-classroom-page.component';
import { ClassroomsDashCreateClassroomFormComponent } from './components/classrooms-dash-create-classroom-form/classrooms-dash-create-classroom-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '../forms/forms.module';
import { CollactComponentsModule } from 'collact-components';
import { ClassroomsDashStudentsFormComponent } from './components/classrooms-dash-students-form/classrooms-dash-students-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavigationModule } from '../navigation/navigation.module';



@NgModule({
  declarations: [
    LayoutClassroomsDashComponent,
    ClassroomsDashClassroomsPageComponent,
    ClassroomsDashClassroomPageComponent,
    ClassroomsDashCreateNewClassroomPageComponent,
    ClassroomsDashCreateClassroomFormComponent,
    ClassroomsDashStudentsFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(ClassroomsDashRoutes),
    CollactDesignSystemModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    CollactComponentsModule,
    NavigationModule,
  ],
  providers: [
    ClassroomsDashUploadClassroomService
  ]
})
export class ClassroomsDashModule { }
