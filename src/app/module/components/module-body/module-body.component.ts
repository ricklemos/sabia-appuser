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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
    private moduleService: ModuleService
  ) {
  }

  ngOnInit(): void {
    this.moduleService.fetchModuleProgress(this.route.snapshot.paramMap.get('moduleId')).pipe(
      tap(moduleProgress => {
        this.moduleProgress = moduleProgress;
        this.lessons = this.moduleProgress.lessons;
        this.moduleService.setModuleId(this.moduleProgress.moduleId);
        // Guarda o módulo obtido como um atributo do ModuleService
        this.moduleService.setModule(moduleProgress);
      })
    ).subscribe(noop);
  }

  startLesson(lesson: Lesson): void {
    this.router.navigate([this.urlService.getQuestionary(lesson.questionaryId)]);
  }

}
