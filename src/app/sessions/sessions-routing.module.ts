import { Routes } from '@angular/router';
import { SessionsLoginPageComponent } from './containers/sessions-login-page/sessions-login-page.component';
import { SessionsLoggedPageComponent } from './containers/sessions-logged-page/sessions-logged-page.component';

export const SessionsRoutes: Routes = [
  {
    path: 'sessions',
    children: [
      {
        path: 'login',
        component: SessionsLoginPageComponent
      },
      {
        path: 'logged',
        component: SessionsLoggedPageComponent
      }
    ]
  }
  ];
