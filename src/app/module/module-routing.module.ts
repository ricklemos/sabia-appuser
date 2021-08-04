import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { ModuleProgressPageComponent } from './containers/module-progress-page/module-progress-page.component';

export const ModuleRoutes: Routes = [
  {
    path: 'module',
    children: [
      {
        path: ':moduleId',
        component: ModuleProgressPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
