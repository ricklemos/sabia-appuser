import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Alternative, Question } from '../../models/questionary-models';
import { QuestionaryService } from '../../services/questionary.service';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'questionary-body',
  templateUrl: './questionary-body.component.html',
  styleUrls: ['./questionary-body.component.scss']
})
export class QuestionaryBodyComponent implements OnInit {

  @Input() question: Question;
  @Output() answerEvent = new EventEmitter<boolean>();

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

  selectAlternative(alternative: Alternative): void {
    if (alternative.isRight) {
      console.log('ACERTOU!');
      this.answerEvent.emit(true);
    } else {
      console.log('ERROU');
      this.answerEvent.emit(false);
    }
  }

}
