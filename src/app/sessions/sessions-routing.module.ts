import { Routes } from '@angular/router';
import { SessionsLoginPageComponent } from './containers/sessions-login-page/sessions-login-page.component';
import { SessionsLoggedPageComponent } from './containers/sessions-logged-page/sessions-logged-page.component';
import { AuthGuard } from '../guards/auth.guard';
import { SessionsSignupPageComponent } from './containers/sessions-signup-page/sessions-signup-page.component';

export const SessionsRoutes: Routes = [
  {
    path: 'sessions',
    children: [
      {
        path: 'login',
        component: SessionsLoginPageComponent
      },
      {
        path: 'cadastro',
        component: SessionsSignupPageComponent
      },
      {
        path: '',
        component: SessionsLoggedPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
  ];
