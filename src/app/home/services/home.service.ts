import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';


@Injectable({
  providedIn: 'root'
})
export class HomeService {

  moduleId: string;

  constructor(
    private angularFirestore: AngularFirestore,
    private sessionsService: SessionsLoginService
  ) {
  }

  fetchModules(): Observable<any> {
    const uId = this.sessionsService.getUserId();
    return this.angularFirestore.collection('moduleProgress', ref => ref.where('moduleProgressPercentage', '!=', '100').where('userId', '==', uId)).valueChanges();
  }
}