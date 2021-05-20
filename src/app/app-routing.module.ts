import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSessionsComponent } from './sessions/layout/layout-sessions/layout-sessions.component';
import { EditDataComponent } from './profile/components/edit-data/edit-data.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sessions/login'
  },
  {
    path: '',
    component: LayoutSessionsComponent,
  },
  {
    path: 'profile',
    component: EditDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
