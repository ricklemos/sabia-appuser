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

  lesson: Lesson;
  moduleProgress: ModuleProgress;
  lessonDone: boolean;

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
        this.lesson = data;
        this.moduleProgress = this.moduleService.getModule();
        const [fetchLesson] = this.moduleProgress.lessons.filter(lesson => lesson.lessonId === this.lesson.lessonId);
        this.lessonDone = fetchLesson.complete;
      })
    ).subscribe(noop);
    this.subscriptions.push(fetchModule);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
    this.moduleService.setModule(this.moduleProgress);
    this.moduleService.updateModule();
  }

  markAsDone(): void {
    this.lessonDone = !this.lessonDone;
    const [filteredLesson] = this.moduleProgress.lessons.filter(lesson => lesson.lessonId === this.lesson.lessonId);
    filteredLesson.complete = this.lessonDone;
  }

}


