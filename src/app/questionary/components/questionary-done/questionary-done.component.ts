import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'questionary-done',
  templateUrl: './questionary-done.component.html',
  styleUrls: ['./questionary-done.component.scss']
})
export class QuestionaryDoneComponent implements OnInit {

  @Input() score: number;
  @Input() nQuestions;

  constructor() { }

  ngOnInit(): void {
  }

}
