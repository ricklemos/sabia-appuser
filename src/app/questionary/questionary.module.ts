import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionaryQuestionPageComponent } from './containers/questionary-question-page/questionary-question-page.component';
import { RouterModule } from '@angular/router';
import { QuestionaryRoutes } from './questionary-routing.module';
import { LayoutQuestionaryComponent } from './layout/layout-questionary/layout-questionary.component';
import { QuestionaryHeaderComponent } from './components/questionary-header/questionary-header.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuestionaryBodyComponent } from './components/questionary-body/questionary-body.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    LayoutQuestionaryComponent,
    QuestionaryQuestionPageComponent,
    QuestionaryHeaderComponent,
    QuestionaryBodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(QuestionaryRoutes),
    MatProgressBarModule,
    CollactDesignSystemModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ]
})
export class QuestionaryModule { }
