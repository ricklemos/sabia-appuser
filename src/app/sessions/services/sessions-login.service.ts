import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UrlService } from '../../services/url.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsLoginService {
  private user;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  verifyEmail(email, collectionPath): Observable<any> {
    return this.angularFirestore.collection(collectionPath, ref => ref.where('email', '==', email)).valueChanges();
  }

  signIn(email: string, password: string, autoLogin?: boolean): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        if (autoLogin) {
          localStorage.setItem('firebaseJWT', JSON.stringify(this.user['refreshToken']));
        }
        this.router.navigate([this.urlService.getHomeUrl()]);
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          // TODO: show error snackBar
          alert('Senha Incorreta');
        } else {
          // TODO: unknown error dialog
        }
      });
  }

  fetchUserData(): Observable<any> {
    const uid = this.user.uid;
    return this.angularFirestore.doc(`userData/${uid}`).valueChanges();
  }

  getUserLogged(): object | false {
    if (this.user) {
      return this.user;
    } else {
      // TODO: retornar mensagem de erro (usuário não logado)
      return false;
    }
  }
  getUserId(): string | false{
    if (this.user) {
      return this.user.uid;
    } else {
      // TODO: retornar mensagem de erro (usuário não logado)
      return false;
    }
  }
}



