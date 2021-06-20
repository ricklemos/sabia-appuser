import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class ModifyUserDataService {

  constructor(private firestore: AngularFirestore,
              private sessionService: SessionsLoginService,
              private angularFireAuth: AngularFireAuth) {
  }

  // editFirstName(newFirstName: string): void {
  //   this.firestore.collection('userData').doc('u_id')
  //     .update({
  //       first_name: newFirstName
  //     });
  // }
  //
  // editLastName(newLastName: string): void {
  //   this.firestore.collection('userData').doc('u_id')
  //     .update({
  //       last_name: newLastName
  //     });
  // }
  //
  // editGender(newGender: 'm' | 'f' | 'n'): void {
  //   this.firestore.collection('userData').doc('u_id')
  //     .update({
  //       gender: newGender
  //     });
  // }
  //
  // editEmail(newEmail: string): void {
  //   const uId = this.sessionService.getUserId();
  //   this.firestore.collection('userData').doc(uId)
  //     .update({
  //       email: newEmail
  //     });
  //   this.firestore.collection('users').doc(uId)
  //     .update({
  //       email: newEmail
  //     });
  //   this.angularFireAuth.authState.subscribe((user) => {
  //     user.updateEmail(newEmail);
  //   });
  // }

  editAll(newFirstName: string, newLastName: string, newGender: string, newEmail: string): void {
    const uId = this.sessionService.getUserId();
    this.firestore.collection('userData').doc(uId)
      .update({
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName,
        gender: newGender
      });
    this.firestore.collection('users').doc(uId)
      .update({
        email: newEmail
      });
    this.angularFireAuth.authState.subscribe((user) => {
      user.updateEmail(newEmail);
    });

  }
}



