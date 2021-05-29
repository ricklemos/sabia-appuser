import { Routes } from '@angular/router';
import { SessionsLoginPageComponent } from './containers/sessions-login-page/sessions-login-page.component';

export const SessionsRoutes: Routes = [
  {
    path: 'sessions',
    children: [
      {
        path: 'login',
        component: SessionsLoginPageComponent
      }
    ]
  }
  ];
