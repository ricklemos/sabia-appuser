import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UrlService } from '../../services/url.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsSignupService {
  nextStepObservable: Subject<NextStepObservable> = new Subject<NextStepObservable>();

  docId: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  password: string;
  firstLogin: string;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private urlService: UrlService,
  ) {
  }

  public getNextStep(): Observable<NextStepObservable> {
    return this.nextStepObservable.asObservable();
  }

  public nextStep(step: NextStep['step'], data?): void {
    if (data) {
      this.nextStepObservable.next({ step, data });
      return;
    }
    this.nextStepObservable.next({ step });
  }

  public createUser(password: string): void {
    this.angularFireAuth.createUserWithEmailAndPassword(this.email, password)
      .then(userData => {
        const { user } = userData;
        this.uid = user.uid;
        this.firstLogin = user.metadata.creationTime;
        return this.angularFireAuth.signInWithEmailAndPassword(this.email, password);
      })
      .then(() => {
        const body = {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          userId: this.uid
        };
        return this.angularFirestore.doc(`userData/${ this.uid }`).set(body);
      })
      // .then(() => {
      //   return this.angularFirestore.doc(`users/${ this.docId }`).delete();
      // })
      .then(() => {
        const body = {
          email: this.email,
          firstLogin: this.firstLogin,
        };
        return this.angularFirestore.doc(`users/${ this.uid }`).set(body);
      }).then(() => {
      this.router.navigate([this.urlService.getWelcomePage()]);
    })
      .catch(error => console.log(error));
  }

}

export interface NextStepObservable {
  data?: any;
  step: NextStep['step'];
}

export interface NextStep {
  step: 'FIRST_NAME' | 'LAST_NAME' | 'GENDER' | 'PASSWORD';
}
