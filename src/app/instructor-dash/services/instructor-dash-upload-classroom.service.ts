import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InstructorDashUploadClassroomService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  uploadClassroom(classroom): Promise<any> {
    return this.angularFirestore.collection('classrooms').add(classroom);
  }
}
