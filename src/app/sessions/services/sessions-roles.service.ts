import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { SessionsRole } from '../models/sessions-models';
import { StorageService } from '../../services/storage.service';
@Injectable({
  providedIn: 'root'
})
export class SessionsRolesService {

  role: SessionsRole;

  constructor(
    private angularFireFunctions: AngularFireFunctions,
    private angularFireAuth: AngularFireAuth,
    private storageService: StorageService
  ) {
  }

  updateRole(email: string, role: SessionsRole): Observable<any> {
    const callable = this.angularFireFunctions.httpsCallable('setRole');
    return callable({ email, role });
  }

  fetchRoleByIdToken(): Observable<any> {
    return this.angularFireAuth.idTokenResult;
  }

  setRole(role: SessionsRole): void {
    // this.storageService.setItem('role', role);
    this.role = role;
  }

  getRole(): SessionsRole {
    // return this.storageService.getItem('role');
    return this.role;
  }

}
