import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutQuestionaryComponent } from './questionary/layout/layout-questionary/layout-questionary.component';
import { LayoutModuleComponent } from './module/layout/layout-module/layout-module.component';
import { LayoutRankingsComponent } from './rankings/layout/layout-rankings/layout-rankings.component';
import { LayoutClassroomsDashComponent } from './classrooms-dash/layout/layout-classrooms-dash/layout-classrooms-dash.component';
import { LayoutWelcomeComponent } from './welcome/layout/layout-welcome/layout-welcome.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'sessions/login'
  },
  {
    path: 'questionario',
    component: LayoutQuestionaryComponent
  },
  {
    path: 'module',
    component: LayoutModuleComponent
  },
  {
    path: 'rankings',
    component: LayoutRankingsComponent
  },
  {
    path: 'painel-classes',
    component: LayoutClassroomsDashComponent
  },
  {
    path: 'boas-vindas',
    component: LayoutWelcomeComponent
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
