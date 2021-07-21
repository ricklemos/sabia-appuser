import { Component, OnInit } from '@angular/core';
import { QuestionaryService } from '../../services/questionary.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'questionary-header',
  templateUrl: './questionary-header.component.html',
  styleUrls: ['./questionary-header.component.scss']
})
export class QuestionaryHeaderComponent implements OnInit {

  nQuestions: number;
  questionNumber: number;
  progress: number;
  questionaryName: string;

  constructor(
    private questionaryService: QuestionaryService
  ) {
  }

  ngOnInit(): void {
    console.log('Iniciou o Header');
    this.questionaryName = this.questionaryService.getQuestionary().questionaryName;
    this.nQuestions = this.questionaryService.getNumberOfQuestions();
    this.questionNumber = this.questionaryService.getCurrentQuestionNumber();
    this.progress = (this.questionNumber / this.nQuestions) * 100;
  }

}
