import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutSessionsComponent } from './sessions/layout/layout-sessions/layout-sessions.component';
import { EditDataComponent } from './profile/containers/edit-data/edit-data.component';
import { ProfileViewComponent } from './profile/components/profile-view/profile-view.component';
import { LayoutProfileComponent } from './profile/layout/layout-profile.component';

const routes: Routes = [

  {
    path: '',
    component: LayoutSessionsComponent,
  },
  {
    path: '',
    component: LayoutProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
