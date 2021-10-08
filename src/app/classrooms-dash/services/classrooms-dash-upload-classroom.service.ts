import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ClassroomsDashClassroom } from '../models/classrooms-dash-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsDashUploadClassroomService {

  classroom: ClassroomsDashClassroom;
  classrooms: ClassroomsDashClassroom[];

  constructor(
    private angularFirestore: AngularFirestore,
  ) {
  }

  createClassroom(classroom): Promise<any> {
    const id = this.angularFirestore.createId();
    classroom.classroomId = id;
    return this.angularFirestore.collection('classrooms').doc(id).set(classroom);
  }

  addStudents(students: string[]): Promise<any> {
    return this.angularFirestore.doc(`classrooms/${ this.classroom.classroomId }`).update({ students });
  }

  fetchClassroom(classroomId: string): Observable<any> {
    return this.angularFirestore.doc(`classrooms/${ classroomId }`).valueChanges();
  }

  // TODO: por enquanto fetchClassrooms pega todas as classes, no futuro seria bom fazer um filtro.
  fetchClassrooms(): Observable<any>{
    return this.angularFirestore.collection('classrooms').get();
  }

  setClassroom(classroom: ClassroomsDashClassroom): void {
    this.classroom = classroom;
  }

  getClassroom(): ClassroomsDashClassroom {
    return this.classroom;
  }

}
