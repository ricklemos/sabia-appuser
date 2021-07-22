import { Injectable } from '@angular/core';
import { QuestionaryAnswer } from '../models/questionary-models';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {

  questionaryAnswer: QuestionaryAnswer;
  score: number;

  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore
  ) {
  }

  fetchQuestionary(questionaryId: string): Observable<QuestionaryAnswer> {
    // @ts-ignore
    return this.angularFirestore.doc(`questionaryAnswers/${ questionaryId }`).valueChanges();
  }

  updateQuestionary(questionaryId: string, questionary: QuestionaryAnswer): Promise<any> {
    return this.angularFirestore.doc(`questionaryAnswers/${ questionaryId }`).update(questionary);
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

}
