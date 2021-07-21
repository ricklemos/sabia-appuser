import { Component, OnInit } from '@angular/core';
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

  question: Question;
  currentQuestionNumber: number;

  // question: Question = {
  //   questionText: 'Se uma LCI rende a taxa de 95% do CDI, ela é um produto:',
  //   alternatives: [
  //     {
  //       alternativeText: 'Pré-fixado',
  //       isRight: false
  //     },
  //     {
  //       alternativeText: 'Pós-fixado',
  //       isRight: true
  //     },
  //     {
  //       alternativeText: 'Híbrido',
  //       isRight: false
  //     }
  //   ],
  //   gotRight: false,
  //   explanationText: 'Pós-Fixado'
  // };

  constructor(
    private questionaryService: QuestionaryService
  ) {
  }

  ngOnInit(): void {
    console.log('Iniciou o Body');
    this.currentQuestionNumber = 1;
    this.question = this.questionaryService.getQuestionary().questions[this.questionaryService.getCurrentQuestionNumber() - 1];
  }

  selectAlternative(alternative: Alternative): void {
    if (alternative.isRight) {
      console.log('ACERTOU!');
      this.question = this.questionaryService.getQuestionary().questions[this.currentQuestionNumber += 1];
    } else {
      console.log('ERROU');
    }
  }

}
