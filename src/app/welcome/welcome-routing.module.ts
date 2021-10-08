import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { WelcomePageComponent } from './containers/welcome-page/welcome-page.component';
import { WelcomeCoursesPageComponent } from './containers/welcome-courses-page/welcome-courses-page.component';

export const WelcomeRoutes: Routes = [
  {
    path: 'boas-vindas',
    children: [
      {
        path: '1',
        component: WelcomePageComponent,
      },
      {
        path: 'cursos',
        component: WelcomeCoursesPageComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
  ];
