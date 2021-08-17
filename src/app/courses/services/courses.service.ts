import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(
    private angularFirestore: AngularFirestore,
    private sessionsLogin: SessionsLoginService
  ) {
  }

  fetchCourses(): Observable<any> {
    // TODO: revisar essa funçao
    // const uId = this.sessionsLogin.getUserID();
    return this.angularFirestore.collection('enrollments', ref => ref.where('userId', '==', '82JoYs8CBcY2JCsa5PLTgMwxr2E2')).valueChanges();
  }

  fetchCoursesDetails(courseId): Observable<any> {
    return this.angularFirestore.doc(`courses/${ courseId }`).valueChanges();
  }
}
