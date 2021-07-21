import { Component, OnInit } from '@angular/core';
import { Question } from '../../models/questionary-models';

@Component({
  selector: 'questionary-body',
  templateUrl: './questionary-body.component.html',
  styleUrls: ['./questionary-body.component.scss']
})
export class QuestionaryBodyComponent implements OnInit {

  question: Question = {
    questionText: 'Se uma LCI rende a taxa de 95% do CDI, ela é um produto:',
    alternatives: [
      {
        alternativeText: 'Pré-fixado',
        isRight: false
      },
      {
        alternativeText: 'Pós-fixado',
        isRight: true
      },
      {
        alternativeText: 'Híbrido',
        isRight: false
      }
    ],
    gotRight: false,
    explanationText: 'Pós-Fixado'
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
