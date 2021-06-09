import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionsLoginService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
  }
  verifyEmail(email): Observable<any> {
    return this.angularFirestore.collection('userData', ref => ref.where('email', '==', email)).valueChanges();
  }
}


// this.auth.signInWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     const user = userCredential.user;
//     console.log(user);
//     console.log(user.uid);
//     this.router.navigate(['/sessions/login']);
//   })
//   .catch((error) => {
//     console.log(error.code);
//     console.log(error.message);
//   });
