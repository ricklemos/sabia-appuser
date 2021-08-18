import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionaryQuestionPageComponent } from './containers/questionary-question-page/questionary-question-page.component';

export const QuestionaryRoutes: Routes = [
  {
    path: 'questionary',
    children: [
      {
        path: ':questionaryId',
        canActivate: [AuthGuard],
        children: [
          // To Merge: Questionary Review está sendo feito em outra branch pela Fer
          // {
          //   path: 'review',
          //   component: QuestionaryReviewPageComponent
          // },
          {
            path: 'review',
            component: QuestionaryQuestionPageComponent
          },
          {
            path: '',
            component: QuestionaryQuestionPageComponent
          }
        ]
      }
    ]
  }
];
