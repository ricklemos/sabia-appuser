import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { RankingsClassPageComponent } from './containers/rankings-class-page/rankings-class-page.component';

export const RankingsRoutes: Routes = [
  {
    path: 'rankings',
    children: [
      {
        path: ':class',
        component: RankingsClassPageComponent
      }
    ]
  }
  ];
