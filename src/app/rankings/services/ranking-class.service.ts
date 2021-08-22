import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';

@Injectable({
  providedIn: 'root'
})
export class RankingClassService {

  constructor(
    private afs: AngularFirestore,
    private sessionsLoginService: SessionsLoginService
  ) {
  }

  fetchClassRanking(classroomId: string): Observable<any> {
    return this.afs.doc(`classRankings/${ classroomId }`).valueChanges();
  }

  fetchAvailableClasses(): Observable<any> {
    const uId = this.sessionsLoginService.getUserId();
    return this.afs.collection('enrollments', ref => ref.where('userId', '==', uId)).valueChanges();
  }

}
