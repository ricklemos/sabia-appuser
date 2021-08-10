import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RankingClassService {

  constructor(
    private afs: AngularFirestore
  ) {
  }

  fetchClassRanking(classroomId: string): Observable<any> {
    return this.afs.doc(`classRankings/${ classroomId }`).valueChanges();
  }

  fetchAvailableClasses(uId: string): Observable<any> {
    return this.afs.collection('enrollments', ref => ref.where('userId', '==', uId)).valueChanges();
  }

}
