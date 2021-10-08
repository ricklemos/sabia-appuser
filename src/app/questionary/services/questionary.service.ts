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

  questionnaireAnswer: QuestionnaireAnswer;
  score: number;

  constructor(
    private route: ActivatedRoute,
    private angularFirestore: AngularFirestore,
    private sessionsService: SessionsLoginService
  ) {
  }

  fetchQuestionary(questionnaireId: string): Observable<QuestionnaireAnswer> {
    const uid = this.sessionsService.getUserId();
    // @ts-ignore
    return this.angularFirestore.doc(`questionnaireAnswers/${ uid + '-' + questionnaireId }`).valueChanges();
  }

  updateQuestionnaire(questionnaireId: string, questionnaire: QuestionnaireAnswer): Promise<any> {
    const uid = this.sessionsService.getUserId();
    return this.angularFirestore.doc(`questionnaireAnswers/${ uid + '-' + questionnaireId }`).update(questionnaire);
  }

  setQuestionnaire(questionnaire: QuestionnaireAnswer): void {
    this.questionnaireAnswer = questionnaire;
  }

  getQuestionnaire(): QuestionnaireAnswer {
    return this.questionnaireAnswer;
  }

  getNumberOfQuestions(): number {
    return this.questionnaireAnswer.questions.length;
  }

}
