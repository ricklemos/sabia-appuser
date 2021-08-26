import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutQuestionaryComponent } from './questionary/layout/layout-questionary/layout-questionary.component';
import { LayoutModuleComponent } from './module/layout/layout-module/layout-module.component';
import { LayoutRankingsComponent } from './rankings/layout/layout-rankings/layout-rankings.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'sessions/login'
  },
  {
    path: 'questionary',
    component: LayoutQuestionaryComponent
  },
  {
    path: 'module',
    component: LayoutModuleComponent
  },
  {
    path: 'rankings',
    component: LayoutRankingsComponent
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
