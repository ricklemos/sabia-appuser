import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionaryService } from '../../services/questionary.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Question, QuestionaryAnswer } from '../../models/questionary-models';

@Component({
  selector: 'app-questionary-question-page',
  templateUrl: './questionary-question-page.component.html',
  styleUrls: ['./questionary-question-page.component.scss']
})
export class QuestionaryQuestionPageComponent implements OnInit {

  questionaryId: string;
  loadingQuestionary: boolean;
  questions: Question[];
  currentQuestion: Question;
  currentQuestionNumber: number;

  constructor(
    private questionaryService: QuestionaryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.currentQuestionNumber = 1;
    this.loadingQuestionary = true;
    this.questionaryId = this.route.snapshot.paramMap.get('questionaryId');
    this.questionaryService.fetchQuestionary(this.questionaryId).pipe(
      tap((questionary) => {
        this.questionaryService.setQuestionary(questionary);
        this.questions = questionary.questions;
        this.loadingQuestionary = false;
        this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
      })
    ).subscribe(noop);
  }

  nextQuestion(alternative): void {
    if (this.currentQuestionNumber === this.questions.length) {
      console.log('Ir pra página de questionário concluído');
    } else {
      this.currentQuestionNumber += 1;
      this.currentQuestion = this.questions[this.currentQuestionNumber - 1];
    }
  }
}
