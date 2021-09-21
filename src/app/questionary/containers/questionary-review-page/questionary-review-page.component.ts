import { Component, OnDestroy, OnInit } from '@angular/core';
import { Question, QuestionnaireAnswer } from '../../models/questionary-models';
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
  questions: Question[];
  unsubscribe = [];
  questionnaire: QuestionnaireAnswer;

  constructor(
    private questionaryService: QuestionaryService,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadingQuestionary = true;
    this.questionaryId = this.route.snapshot.paramMap.get('questionnaireId');
    const questionaryService = this.questionaryService.fetchQuestionary(this.questionaryId).pipe(
      tap((questionary) => {
        this.questionaryService.setQuestionnaire(questionary);
        this.questionnaire = questionary;
        this.questions = questionary.questions;
        this.loadingQuestionary = false;
      })
    ).subscribe(noop);
    this.unsubscribe.push(questionaryService);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  redoTest(): void {
    this.router.navigate([this.urlService.getQuestionnaire(this.questionaryId)]);
  }
  goBack(): void {
    this.router.navigate([this.urlService.getModule(this.questionnaire.moduleId)]);
  }
}
