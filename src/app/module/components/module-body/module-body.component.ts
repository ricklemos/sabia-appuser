import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ModuleService } from '../../services/module.service';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Lesson, ModuleProgress } from '../../models/module';

@Component({
  selector: 'module-body',
  templateUrl: './module-body.component.html',
  styleUrls: ['./module-body.component.scss']
})
export class ModuleBodyComponent implements OnInit {

  moduleProgress: ModuleProgress;
  lessons: Lesson[];
  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
    private moduleService: ModuleService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.moduleService.fetchModuleProgress(this.route.snapshot.paramMap.get('moduleId')).pipe(
      tap(moduleProgress => {
        this.moduleProgress = moduleProgress;
        this.lessons = this.moduleProgress.lessons;
        this.moduleService.setModuleId(this.moduleProgress.moduleId);
        // Guarda o módulo obtido como um atributo do ModuleService
        this.moduleService.setModule(moduleProgress);
        this.loading = false;
      })
    ).subscribe(noop);
  }

  startLesson(lesson: Lesson): void {
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
      this.router.navigate([this.urlService.getLesson(lesson.lessonId)]);
    }

  }

}
