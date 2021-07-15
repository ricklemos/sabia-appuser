import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModifyUserDataService {
  uId: string;

  constructor(private firestore: AngularFirestore,
              private sessionService: SessionsLoginService,
              private angularFireAuth: AngularFireAuth,
              private angularFireStorage: AngularFireStorage,
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

  // Retorna um observable com a url da foto de perfil do usuário a partir do seu uid.
  fetchProfilePictureUrl(uid: string): Observable<any> {
    return this.angularFireStorage.ref(`profilePics/${ uid }`).getDownloadURL();
  }

  // Retorna a referência da foto de perfil do usuário a partir do seu uid. (Assim é possível realizar uploads ou downloads)
  // Mais informações em https://github.com/angular/angularfire/blob/master/docs/storage/storage.md
  fetchProfilePicture(uid: string): AngularFireStorageReference {
    return this.angularFireStorage.ref(`profilePics/${ uid }`);
  }

  // Retorna um observable com a url da foto de perfil do usuário que está logado
  fetchUserProfilePictureUrl(): Observable<any> {
    return this.angularFireStorage.ref(`profilePics/${ this.sessionService.getUserId() }`).getDownloadURL();
  }

  // Retorna a referência da foto de perfil do usuário logado (Assim é possível realizar uploads ou downloads)
  // Mais informações em https://github.com/angular/angularfire/blob/master/docs/storage/storage.md
  fetchUserProfilePicture(): AngularFireStorageReference {
    return this.angularFireStorage.ref(`profilePics/${ this.sessionService.getUserId() }`);
  }

  // Atualiza o arquivo da foto de perfil a partir do arquivo file
  // O caminho no storage é "profilePics/UID"
  updateProfilePic(file): AngularFireUploadTask {
    const filePath = `profilePics/${ this.sessionService.getUserId() }`;
    return this.angularFireStorage.upload(filePath, file);
  }

  deleteUserProfilePic(): Observable<any> {
    return this.angularFireStorage.ref(`profilePics/${ this.sessionService.getUserId() }`).delete();
  }

}



