import { Injectable } from '@angular/core';
import { ModuleTextLesson } from '../models/module';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleContentService {

  lesson: ModuleTextLesson;

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
  }

  fetchLesson(lessonId): Observable<any> {
    return this.angularFirestore.doc(`lessons/${ lessonId }`)
      .valueChanges();
  }
}
