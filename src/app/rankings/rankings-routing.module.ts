import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RankingsClassPageComponent } from './containers/rankings-class-page/rankings-class-page.component';
import { RankingsPageComponent } from './containers/rankings-page/rankings-page.component';

export const RankingsRoutes: Routes = [
  {
    path: 'ranking',
    children: [
      {
        path: '',
        component: RankingsPageComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':classroomId',
        component: RankingsClassPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
