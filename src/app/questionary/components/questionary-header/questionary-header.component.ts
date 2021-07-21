import { Component, OnInit } from '@angular/core';

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

  constructor() {
  }

  ngOnInit(): void {
    this.questionaryName = 'Teste Final';
    this.nQuestions = 10;
    this.questionNumber = 5;
    this.progress = (this.questionNumber / this.nQuestions) * 100;
  }

}
