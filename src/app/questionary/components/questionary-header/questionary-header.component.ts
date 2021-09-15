import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { QuestionaryService } from '../../services/questionary.service';
import { QuestionaryDialogService } from '../../services/questionary-dialog.service';

@Component({
  selector: 'questionary-header',
  templateUrl: './questionary-header.component.html',
  styleUrls: ['./questionary-header.component.scss']
})
export class QuestionaryHeaderComponent implements OnInit, OnChanges {


  @Input() questionNumber: number;
  nQuestions: number;
  progress: number;
  questionaryName: string;

  constructor(
    private questionaryService: QuestionaryService,
    private questionaryDialogService: QuestionaryDialogService,
  ) {
  }

  ngOnInit(): void {
    this.questionaryName = this.questionaryService.getQuestionary().questionnaireName;
    this.nQuestions = this.questionaryService.getQuestionary().questions.length;
    this.progress = (this.questionNumber / this.nQuestions) * 100;
  }

  ngOnChanges(): void {
    this.progress = (this.questionNumber / this.nQuestions) * 100;
  }

  openCloseDialog(): void {
    this.questionaryDialogService.openQuestionaryClose();
  }

}
