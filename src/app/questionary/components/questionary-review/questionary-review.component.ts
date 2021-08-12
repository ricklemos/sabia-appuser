import { Component, Input, OnInit } from '@angular/core';
import { Question } from '../../models/questionary-models';

@Component({
  selector: 'questionary-review',
  templateUrl: './questionary-review.component.html',
  styleUrls: ['./questionary-review.component.scss']
})
export class QuestionaryReviewComponent implements OnInit {
  @Input() question: Question
  @Input() index: number

  constructor() { }

  ngOnInit(): void {
  }

}
