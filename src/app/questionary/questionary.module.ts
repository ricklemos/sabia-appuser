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
import { QuestionaryDoneComponent } from './components/questionary-done/questionary-done.component';
import { QuestionaryDialogAnswerComponent } from './dialogs/questionary-dialog-answer/questionary-dialog-answer.component';
import { QuestionaryAnswerComponent } from './components/questionary-answer/questionary-answer.component';
import { QuestionaryBottomSheetAnswerComponent } from './bottom-sheets/questionary-bottom-sheet-answer/questionary-bottom-sheet-answer.component';
import { QuestionaryService } from './services/questionary.service';
import { QuestionaryDialogService } from './services/questionary-dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';



@NgModule({
  declarations: [
    LayoutQuestionaryComponent,
    QuestionaryQuestionPageComponent,
    QuestionaryHeaderComponent,
    QuestionaryBodyComponent,
    QuestionaryDoneComponent,
    QuestionaryDialogAnswerComponent,
    QuestionaryAnswerComponent,
    QuestionaryBottomSheetAnswerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(QuestionaryRoutes),
    MatProgressBarModule,
    CollactDesignSystemModule,
    FlexLayoutModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatBottomSheetModule
  ],
  entryComponents: [
    QuestionaryBottomSheetAnswerComponent,
    QuestionaryDialogAnswerComponent
  ],
  providers: [
    QuestionaryService,
    QuestionaryDialogService
  ]
})
export class QuestionaryModule { }
