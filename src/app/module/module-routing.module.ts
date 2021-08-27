import { Routes } from '@angular/router';
import { ModuleProgressPageComponent } from './containers/module-progress-page/module-progress-page.component';
import { ModuleContentPageComponent } from './containers/module-content-page/module-content-page.component';

export const ModuleRoutes: Routes = [
  {
    path: 'module',
    children: [
      {
        path: ':moduleId',
        component: ModuleProgressPageComponent,
        // canActivate: [AuthGuard]
      },

      {
        path: ':moduleId/1',
        component: ModuleContentPageComponent,
        // canActivate: [AuthGuard]
      }


    ]
  }
];
