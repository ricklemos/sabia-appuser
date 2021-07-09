import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ModifyUserDataService {
  uId: string;

  constructor(private firestore: AngularFirestore,
              private sessionService: SessionsLoginService,
              private angularFireAuth: AngularFireAuth,
              private angularFireStorage: AngularFireStorage
  ) {
  }

  editAll(newFirstName: string, newLastName: string, newGender: string, newEmail: string): void {
    this.uId = this.sessionService.getUserId();

    this.firestore.collection('userData').doc(this.uId)
      .update({
        email: newEmail,
        firstName: newFirstName,
        lastName: newLastName,
        gender: newGender
      });
    this.firestore.collection('users').doc(this.uId)
      .update({
        email: newEmail
      });
    this.angularFireAuth.authState.subscribe((user) => {
      user.updateEmail(newEmail);
    });

  }

  fetchProfilePic(): Observable<any> {
    return this.angularFireStorage.ref(`profilePics/${ this.sessionService.getUserId() }`).getDownloadURL();
  }

  updateProfilePic(file): void{
    const filePath = `profilePics/${ this.sessionService.getUserId() }`;
    const task = this.angularFireStorage.upload(filePath, file);
  }
}



