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
        component: ClassroomsDashClassroomsPageComponent,
        data: { roles: ['INSTRUCTOR', 'SCHOOL_ADMIN'] }
      },
      {
        path: 'criar',
        component: ClassroomsDashCreateNewClassroomPageComponent,
        data: { roles: ['INSTRUCTOR', 'SCHOOL_ADMIN'] }
      },
      {
        path: ':classroomId',
        component: ClassroomsDashClassroomPageComponent,
        data: { roles: ['INSTRUCTOR', 'SCHOOL_ADMIN'] }
      }
    ],
    canActivate: [AuthGuard],
  }
];
