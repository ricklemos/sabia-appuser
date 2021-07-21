import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionaryQuestionPageComponent } from './containers/questionary-question-page/questionary-question-page.component';

export const QuestionaryRoutes: Routes = [
  {
    path: 'questionary',
    children: [
      {
        path: 'question',
        component: QuestionaryQuestionPageComponent
      },
      {
        path: ':questionaryId',
        component: QuestionaryQuestionPageComponent
      }
    ]
  }
];
