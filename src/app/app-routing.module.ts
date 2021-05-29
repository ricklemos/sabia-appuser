import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSessionsComponent } from './sessions/layout/layout-sessions/layout-sessions.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions/login'
  },
  {
    path: '',
    component: LayoutSessionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
