import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { HomePageComponent } from './containers/home-page/home-page.component';

export const HomeRoutes: Routes = [
  {
    path: 'home',
    children: [
      {
        path: 'uId',
        component: HomePageComponent
      }
    ]
  }
];
