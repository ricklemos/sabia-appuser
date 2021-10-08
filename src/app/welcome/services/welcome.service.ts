import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { WelcomeCourse } from '../models/welcome';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService {

  courses: WelcomeCourse[];

  constructor(
    private angularFireFunctions: AngularFireFunctions,
    private angularFirestore: AngularFirestore,
    private sessionsService: SessionsLoginService
  ) {
  }

  fetchContentToStart(): Observable<any> {
    const uId = this.sessionsService.getUserId();
    return this.angularFirestore.doc(`userData/${ uId }`).valueChanges();
  }

  fetchCourses(): Observable<any> {
    const uId = this.sessionsService.getUserId();
    return this.angularFirestore.collection('enrollments', ref => ref
      .where('userId', '==', uId))
      .valueChanges();
  }

  setCourses(courses: WelcomeCourse[]): void {
    this.courses = courses;
  }

  getCourses(): WelcomeCourse[] {
    return this.courses;
  }
}
