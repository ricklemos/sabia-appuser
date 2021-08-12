import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionaryQuestionPageComponent } from './containers/questionary-question-page/questionary-question-page.component';
import { QuestionaryReviewPageComponent } from './containers/questionary-review-page/questionary-review-page.component';

export const QuestionaryRoutes: Routes = [
  {
    path: 'questionary',
    children: [
      {
        path: ':questionaryId',
        canActivate: [AuthGuard],
        children: [
          {
            path: 'review',
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
