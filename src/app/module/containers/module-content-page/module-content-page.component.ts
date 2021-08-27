import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ModuleContentService } from '../../services/module-content.service';
import { Lesson, ModuleProgress } from '../../models/module';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'module-content-page',
  templateUrl: './module-content-page.component.html',
  styleUrls: ['./module-content-page.component.scss']
})
export class ModuleContentPageComponent implements OnInit, OnDestroy {

  moduleContent: Lesson;
  moduleProgress: ModuleProgress;

  subscriptions = [];

  constructor(
    private moduleContentService: ModuleContentService,
    private moduleService: ModuleService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const fetchModule = this.moduleContentService.fetchLesson(this.route.snapshot.paramMap.get('lessonId')).pipe(
      tap(data => {
        this.moduleContent = data;
      })
    ).subscribe(noop);
    this.subscriptions.push(fetchModule);

    this.moduleProgress = this.moduleService.getModule();
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
  }

}


