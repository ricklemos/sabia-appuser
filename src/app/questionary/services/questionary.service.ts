import { Injectable } from '@angular/core';
import { Question, QuestionaryAnswer } from '../models/questionary-models';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { noop, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {

  currentQuestion: number;
  questionaryAnswer: QuestionaryAnswer;
  score: number;

  // questionaryAnswer: QuestionaryAnswer = {
  //   userId: 'userID',
  //   questionaryId: '123',
  //   questionaryName: 'Teste Final',
  //   questions: [],
  //   score: 0,
  //   tentatives: 0
  // };
  //
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
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore
  ) {
    console.log('Iniciou o serviço');
    this.currentQuestion = 1;
  }

  fetchQuestionary(questionaryId: string): Observable<QuestionaryAnswer> {
    // @ts-ignore
    return this.angularFirestore.doc(`questionaryAnswers/${ questionaryId }`).valueChanges();
  }

  setQuestionary(questionary: QuestionaryAnswer): void {
    this.questionaryAnswer = questionary;
  }

  getQuestionary(): QuestionaryAnswer {
    return this.questionaryAnswer;
  }

  getNumberOfQuestions(): number {
    return this.questionaryAnswer.questions.length;
  }

  getCurrentQuestionNumber(): number {
    return this.currentQuestion;
  }

  updateQuestionary(): void {
    this.currentQuestion += 1;
  }

}
