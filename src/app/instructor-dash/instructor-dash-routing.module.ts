import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ClassroomsPageComponent } from './containers/classrooms-page/classrooms-page.component';
import { ClassroomPageComponent } from './containers/classroom-page/classroom-page.component';
import { CreateNewClassroomPageComponent } from './containers/create-new-classroom-page/create-new-classroom-page.component';

export const InstructorDashRoutes: Routes = [
  {
    path: 'instrutor',
    children: [
      {
        path: 'classes',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'criar',
            component: CreateNewClassroomPageComponent
          },
          {
            path: ':classroomId',
            component: ClassroomPageComponent
          },
          {
            path: '',
            component: ClassroomsPageComponent
          }
        ]
      }
    ]
  }
];
