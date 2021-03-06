import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { UrlService } from '../../services/url.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsLoginService {
  private user;
  private email: string;
  private password: string;
  stepObservable: Subject<StepObservable> = new Subject<StepObservable>();

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService,
    private snackBar: MatSnackBar,
  ) {
  }

  verifyEmail(email, collectionPath): Observable<any> {
    return this.angularFirestore.collection(collectionPath, ref => ref.where('email', '==', email)).valueChanges({ idField: 'docId' });
  }

  signOut(): void {
    this.angularFireAuth.signOut()
      .then(() => this.router.navigate([this.urlService.getLoginUrl()]));
  }

  signIn(autoLogin?: boolean): void {
    const persistence = autoLogin ? 'local' : 'none';
    this.angularFireAuth.setPersistence(persistence)
      .then(() => {
        return this.angularFireAuth.signInWithEmailAndPassword(this.email, this.password);
      })
      .then((userCredential) => {
        this.user = userCredential.user;
        // Vai pra sessionsLogged pra definir qual é a home do usuário
        this.router.navigate([this.urlService.getSessionsLogged()]);
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          this.snackBar.open('Senha Incorreta', 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        } else if (error.code === 'auth/too-many-requests') {
          this.snackBar.open('Muitas requisições, tente mais tarde', 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        } else {
          this.snackBar.open('Erro desconhecido', 'OK', {
            duration: 3000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
        }
      });
  }

  fetchUserData(): Observable<any> {
    const uid = this.user.uid;
    return this.angularFirestore.doc(`userData/${ uid }`).valueChanges();
  }

  fetchAuthUser(): Observable<any> {
    return this.angularFireAuth.user;
  }

  setUser(user: any): void {
    this.user = user;
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

  public getStep(): Observable<StepObservable> {
    return this.stepObservable.asObservable();
  }

  public nextStep(step: Step['step'], data?): void {
    if (data) {
      this.stepObservable.next({ step, data });
      return;
    }
    this.stepObservable.next({ step });
  }

  forgotPassword(email): Promise<any> {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  public getUserId(): string {
    return this.user.uid;
  }
}

export interface StepObservable {
  data?: any;
  step: Step['step'];
}

export interface Step {
  step: 'EMAIL' | 'PASSWORD';
}



