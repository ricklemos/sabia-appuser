import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ModuleService } from '../../services/module.service';
import { noop, of, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { ModuleLesson, ModuleProgress } from '../../models/module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'module-body',
  templateUrl: './module-body.component.html',
  styleUrls: ['./module-body.component.scss']
})
export class ModuleBodyComponent implements OnInit {

  moduleProgress: ModuleProgress;
  lessons: ModuleLesson[];
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
    private moduleService: ModuleService,
    private matSnackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.moduleService.fetchModuleProgress(this.route.snapshot.paramMap.get('moduleId')).pipe(
      filter(res => !!res),
      tap(moduleProgress => {
        if (moduleProgress) {
          this.moduleProgress = moduleProgress;
          this.lessons = this.moduleProgress.lessons;
          this.moduleService.setModuleId(this.moduleProgress.moduleId);
          // Guarda o módulo obtido como um atributo do ModuleService
          this.moduleService.setModule(moduleProgress);
          this.loading = false;
        } else {
          throwError('Error Fetching Module');
        }
      }),
      catchError((error) => of(this.fetchingModuleError(error)))
    ).subscribe(noop);
  }

  fetchingModuleError(error): void {
    this.matSnackBar.open('Ocorreu um erro ao obter o módulo.', 'OK', { duration: 4000 });
    this.router.navigate([this.urlService.getHome()]);
  }

  startLesson(lesson: ModuleLesson): void {
    if (lesson.questionaryId) {
      if (lesson.complete) {
        // Revisa o questionário
        this.router.navigate([this.urlService.getQuestionaryReview(lesson.questionaryId)]);
      } else {
        // Começa a responder o questionário
        this.router.navigate([this.urlService.getQuestionary(lesson.questionaryId)]);
      }
    } else if (lesson.lessonId) {
      // Vai pra página de conteúdo teórico
      this.router.navigate([this.urlService.getLesson(this.moduleProgress.moduleId, lesson.lessonId)]);
    }

  }

}
