import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';

@Injectable({
  providedIn: 'root'
})
export class RankingClassService {

  constructor(
    private angularFirestore: AngularFirestore,
    private sessionsLoginService: SessionsLoginService
  ) {
  }

  fetchClassRanking(classroomId: string): Observable<any> {
    return this.angularFirestore.doc(`classRankings/${ classroomId }`).valueChanges();
  }

  fetchAvailableClasses(): Observable<any> {
    const uId = this.sessionsLoginService.getUserId();
    return this.angularFirestore.collection('enrollments', ref => ref.where('userId', '==', uId)).valueChanges();
  }

  compareRanking(a, b) {
    let comparison = 0;
    if (a.userScore < b.userScore) {
      comparison = 1;
    } else if (a.userScore > b.userScore) {
      comparison = -1;
    }
    return comparison;
  }
}
