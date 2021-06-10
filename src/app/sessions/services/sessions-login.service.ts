import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SessionsLoginService {
  private user: object;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private router: Router
  ) {
  }

  verifyEmail(email, collectionPath): Observable<any> {
    return this.angularFirestore.collection(collectionPath, ref => ref.where('email', '==', email)).valueChanges();
  }

  signIn(email, password): void {
    this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.user = userCredential.user;
        // TODO: navegação para a Home do Usuário
        // this.router.navigate(['/home']);
      })
      .catch((error) => {
        // TODO: show error dialog
      });
  }

  getUserLogged(): object | false {
    if (this.user) {
      return this.user;
    } else {
      // TODO: retornar mensagem de erro (usuário não logado)
      return false;
    }
  }
}



