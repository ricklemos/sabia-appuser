import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ModuleContentService } from '../../services/module-content.service';
import { ModuleTextLesson, ModuleProgress } from '../../models/module';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'module-content-page',
  templateUrl: './module-content-page.component.html',
  styleUrls: ['./module-content-page.component.scss']
})
export class ModuleContentPageComponent implements OnInit, OnDestroy {

  lesson: ModuleTextLesson;
  moduleProgress: ModuleProgress;
  lessonDone: boolean;
  loading = true;
  videosUrls = [];
  otherAttachments = [];
  subscriptions = [];

  constructor(
    private moduleContentService: ModuleContentService,
    private moduleService: ModuleService,
    private route: ActivatedRoute,
    private router: Router,
    private urlService: UrlService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    const fetchModule = this.moduleContentService.fetchLesson(this.route.snapshot.paramMap.get('lessonId')).pipe(
      tap(data => {
        this.lesson = data;
        this.moduleProgress = this.moduleService.getModule();
        const [fetchLesson] = this.moduleProgress.lessons.filter(lesson => lesson.lessonId === this.lesson.lessonId);
        this.lessonDone = fetchLesson.complete;
        const videos = this.lesson.attachments.filter(attachment => attachment.attachmentType === 'VIDEO');
        videos.forEach(video => {
          const videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(video.attachmentLink);
          if (!this.videosUrls.includes(videoUrl)) {
            this.videosUrls.push(videoUrl);
          }
        });
        this.otherAttachments = this.lesson.attachments.filter(attachment => attachment.attachmentType !== 'VIDEO');
        this.loading = false;
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

  goBack(): void {
    this.router.navigate([this.urlService.getModule(this.moduleProgress.moduleId)]);
  }
}


