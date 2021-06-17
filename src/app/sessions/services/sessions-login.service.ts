import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UrlService } from '../../services/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SessionsLoginService {
  private user;
  private email: string;
  private password: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService,
    private snackBar: MatSnackBar
  ) {
  }

  verifyEmail(email, collectionPath): Observable<any> {
    return this.angularFirestore.collection(collectionPath, ref => ref.where('email', '==', email)).valueChanges();
  }

  signIn(autoLogin?: boolean): void {
    this.angularFireAuth.signInWithEmailAndPassword(this.email, this.password)
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
          this.snackBar.open('Senha Incorreta', 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        } else if (error.code === 'auth/too-many-requests') {
          // TODO: aguarde um tempo para logar ou recupere a senha
        } else {
          // TODO: unknown error dialog
        }
      });
  }

  fetchUserData(): Observable<any> {
    const uid = this.user.uid;
    return this.angularFirestore.doc(`userData/${ uid }`).valueChanges();
  }

  getUserLogged(): object | false {
    if (this.user) {
      return this.user;
    } else {
      // TODO: retornar mensagem de erro (usuário não logado)
      return false;
    }
  }

  getUserId(): string | false {
    if (this.user) {
      return this.user.uid;
    } else {
      // TODO: retornar mensagem de erro (usuário não logado)
      return false;
    }
  }
  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  getEmail(): string {
    return this.email;
  }
}



