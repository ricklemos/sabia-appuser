import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { Observable } from 'rxjs';
import { Enrollment } from '../models/enrollment';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  enrollment: Enrollment;

  constructor(
    private angularFirestore: AngularFirestore,
    private sessionsLogin: SessionsLoginService
  ) {
  }

  fetchCourses(): Observable<any> {
    const uId = this.sessionsLogin.getUserId();
    return this.angularFirestore.collection('enrollments', ref => ref
      .where('userId', '==', uId))
      .valueChanges();
  }

  setCourse(data: Enrollment): void {
    this.enrollment = data;
  }

  getCourse(): Enrollment {
    return this.enrollment;
  }

  fetchModules(courseId): Observable<any> {
    const uId = this.sessionsLogin.getUserId();
    return this.angularFirestore.collection('moduleProgress', ref => ref
      .where('userId', '==', uId)
      .where('courseId', '==', courseId))
      .valueChanges();
  }

  fetchCoursesDetails(courseId): Observable<any> {
    return this.angularFirestore.doc(`courses/${ courseId }`).valueChanges();
  }
}
