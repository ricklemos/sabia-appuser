import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ClassroomsPageComponent } from './containers/classrooms-page/classrooms-page.component';

export const InstructorDashRoutes: Routes = [
  {
    path: 'instructor',
    children: [
      {
        path: 'classroom',
        component: ClassroomsPageComponent,
        // canActivate: [AuthGuard]
      }
    ]
  }
];
