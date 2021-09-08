import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionsRole } from '../models/sessions-models';

@Injectable({
  providedIn: 'root'
})
export class SessionsRolesService {

  constructor(
    private angularFireFunctions: AngularFireFunctions,
    private angularFireAuth: AngularFireAuth
  ) { }

  setRole(email: string, role: SessionsRole): Observable<any> {
    const callable = this.angularFireFunctions.httpsCallable('setRole');
    return callable({ email , role });
  }
  fetchRoleByIdToken(): Observable<any> {
    return this.angularFireAuth.idTokenResult;
  }

}
