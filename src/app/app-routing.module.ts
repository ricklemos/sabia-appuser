import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutQuestionaryComponent } from './questionary/layout/layout-questionary/layout-questionary.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'questionary'
  },
  {
    path: 'questionary',
    component: LayoutQuestionaryComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
