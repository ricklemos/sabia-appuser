import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Alternative, Question } from '../../models/questionary-models';

@Component({
  selector: 'questionary-body',
  templateUrl: './questionary-body.component.html',
  styleUrls: ['./questionary-body.component.scss']
})
export class QuestionaryBodyComponent implements OnInit {

  @Input() question: Question;
  @Output() answerEvent = new EventEmitter<Alternative>();
  alternativeSelected: Alternative;
  showBottomSheet: boolean;

  constructor() {
  }

  ngOnInit(): void {
    this.showBottomSheet = false;
  }

  selectAlternative(alternative: Alternative): void {
    this.alternativeSelected = alternative;
    this.showBottomSheet = true;
    console.log('mostrar bottom sheet');
  }

  goToNextQuestion(): void {
    this.showBottomSheet = false;
    this.answerEvent.emit(this.alternativeSelected);
  }

}
