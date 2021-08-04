import { Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { QuestionaryQuestionPageComponent } from './containers/questionary-question-page/questionary-question-page.component';

export const QuestionaryRoutes: Routes = [
  {
    path: 'questionary',
    children: [
      {
        path: ':questionaryId',
        component: QuestionaryQuestionPageComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];
