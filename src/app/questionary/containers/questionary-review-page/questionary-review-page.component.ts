import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question, QuestionaryAnswer } from '../../models/questionary-models';
import { QuestionaryService } from '../../services/questionary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'questionary-review-page',
  templateUrl: './questionary-review-page.component.html',
  styleUrls: ['./questionary-review-page.component.scss']
})
export class QuestionaryReviewPageComponent implements OnInit, OnDestroy {
  questionaryId: string;
  loadingQuestionary: boolean;
  questionary: QuestionaryAnswer;
  questions: Question[];
  unsubscribe = [];

  constructor(
    private questionaryService: QuestionaryService,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingQuestionary = true;
    this.questionaryId = this.route.snapshot.paramMap.get('questionaryId');
    console.log(this.questionaryId);
    const questionaryService = this.questionaryService.fetchQuestionary(this.questionaryId).pipe(
      tap((questionary) => {
        this.questionaryService.setQuestionary(questionary);
        this.questionary = questionary;
        this.questions = questionary.questions;
        this.loadingQuestionary = false;
      })
    ).subscribe(noop);
    this.unsubscribe.push(questionaryService);
  }

  ngOnDestroy() {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  redoTest(): void {
    this.router.navigate([this.urlService.getQuestionary(this.questionaryId)]);
  }
}
