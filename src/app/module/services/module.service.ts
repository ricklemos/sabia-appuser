import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { ModuleProgress } from '../models/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  moduleId: string;
  module: ModuleProgress;
  constructor(
    private angularFirestore: AngularFirestore,
    private sessionsService: SessionsLoginService
  ) {
  }

  fetchModuleProgress(moduleId: string): Observable<ModuleProgress> {
    const uId = this.sessionsService.getUserId();
    this.moduleId = moduleId;
    return this.angularFirestore.doc<ModuleProgress>(`moduleProgress/${ uId + '-' + moduleId }`).valueChanges();
  }

  updateModule(): Promise<any> {
    const uId = this.sessionsService.getUserId();
    return this.angularFirestore.doc(`moduleProgress/${ uId + '-' + this.moduleId }`).update(this.module);
  }

  setModuleId(moduleId): void {
    this.moduleId = moduleId;
  }

  getModuleId(): string {
    return this.moduleId;
  }
  setModule(module: ModuleProgress): void{
     this.module = module;
  }
  getModule(): ModuleProgress{
    return this.module;
  }
}
