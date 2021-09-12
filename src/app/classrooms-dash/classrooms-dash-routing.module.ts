import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ClassroomsDashClassroomsPageComponent } from './containers/classrooms-dash-classrooms-page/classrooms-dash-classrooms-page.component';
import { ClassroomsDashClassroomPageComponent } from './containers/classrooms-dash-classroom-page/classrooms-dash-classroom-page.component';
import { ClassroomsDashCreateNewClassroomPageComponent } from './containers/classrooms-dash-create-new-classroom-page/classrooms-dash-create-new-classroom-page.component';

export const ClassroomsDashRoutes: Routes = [
  {
    path: 'painel-classes',
    children: [
      {
        path: 'classes',
        component: ClassroomsDashClassroomsPageComponent
      },
      {
        path: 'criar',
        component: ClassroomsDashCreateNewClassroomPageComponent
      },
      {
        path: ':classroomId',
        component: ClassroomsDashClassroomPageComponent
      }
    ],
    canActivate: [AuthGuard],
  }
];
