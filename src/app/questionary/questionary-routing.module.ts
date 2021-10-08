import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionaryQuestionPageComponent } from './containers/questionary-question-page/questionary-question-page.component';
import { QuestionaryReviewPageComponent } from './containers/questionary-review-page/questionary-review-page.component';

export const QuestionaryRoutes: Routes = [
  {
    path: 'questionario',
    children: [
      {
        path: ':questionnaireId',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'revisar',
            component: QuestionaryReviewPageComponent
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
