import { Injectable } from '@angular/core';
import { QuestionaryAnswer } from '../models/questionary-models';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {

  questionaryAnswer: QuestionaryAnswer;
  score: number;

  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private sessionsService: SessionsLoginService
  ) {
  }

  fetchQuestionary(questionaryId: string): Observable<QuestionaryAnswer> {
    const uid = this.sessionsService.getUserId();
    // @ts-ignore
    return this.angularFirestore.doc(`questionaryAnswers/${ uid + '-' + questionaryId }`).valueChanges();
  }

  updateQuestionary(questionaryId: string, questionary: QuestionaryAnswer): Promise<any> {
    const uid = this.sessionsService.getUserId();
    return this.angularFirestore.doc(`questionaryAnswers/${ uid + '-' + questionaryId }`).update(questionary);
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
