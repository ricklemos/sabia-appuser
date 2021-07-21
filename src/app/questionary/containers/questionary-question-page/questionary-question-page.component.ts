import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionaryService } from '../../services/questionary.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { QuestionaryAnswer } from '../../models/questionary-models';

@Component({
  selector: 'app-questionary-question-page',
  templateUrl: './questionary-question-page.component.html',
  styleUrls: ['./questionary-question-page.component.scss']
})
export class QuestionaryQuestionPageComponent implements OnInit {

  questionaryId: string;
  loadingQuestionary: boolean;

  constructor(
    private questionaryService: QuestionaryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.loadingQuestionary = true;
    this.questionaryId = this.route.snapshot.paramMap.get('questionaryId');
    this.questionaryService.fetchQuestionary(this.questionaryId).pipe(
      tap((questionary) => {
        this.questionaryService.setQuestionary(questionary);
        this.loadingQuestionary = false;
      })
    ).subscribe(noop);
  }
}
