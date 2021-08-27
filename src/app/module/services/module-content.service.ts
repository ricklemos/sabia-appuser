import { Injectable } from '@angular/core';
import { ModuleContent } from '../models/module';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleContentService {

  moduleContent: ModuleContent;

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
  }

  fetchModuleContent(contentId): Observable<any> {
    return this.angularFirestore.doc(`moduleContent/${ contentId }`)
      .valueChanges();
  }
}
