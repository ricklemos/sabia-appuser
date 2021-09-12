import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsDashCreateNewClassroomService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  fetchCoursesTemplate(institutionName: string): Observable<any> {
    return this.angularFirestore.collection('courseTemplate').valueChanges({ institutionName });
  }
}
