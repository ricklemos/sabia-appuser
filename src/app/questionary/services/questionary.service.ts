import { Injectable } from '@angular/core';
import { QuestionnaireAnswer } from '../models/questionary-models';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionaryService {

  questionaryAnswer: QuestionnaireAnswer;
  score: number;

  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private sessionsService: SessionsLoginService
  ) {
  }

  fetchQuestionary(questionaryId: string): Observable<QuestionnaireAnswer> {
    const uid = this.sessionsService.getUserId();
    // @ts-ignore
    return this.angularFirestore.doc(`questionaryAnswers/${ uid + '-' + questionaryId }`).valueChanges();
  }

  updateQuestionary(questionaryId: string, questionary: QuestionnaireAnswer): Promise<any> {
    const uid = this.sessionsService.getUserId();
    return this.angularFirestore.doc(`questionaryAnswers/${ uid + '-' + questionaryId }`).update(questionary);
  }

  setQuestionary(questionary: QuestionnaireAnswer): void {
    this.questionaryAnswer = questionary;
  }

  getQuestionary(): QuestionnaireAnswer {
    return this.questionaryAnswer;
  }

  getNumberOfQuestions(): number {
    return this.questionaryAnswer.questions.length;
  }

}
