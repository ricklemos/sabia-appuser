import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ModifyUserDataService {

  constructor(private firestore: AngularFirestore) {
  }
  editFirstName(newFirstName: string): void {
    this.firestore.collection('user_data').doc('u_id')
      .update({
      first_name: newFirstName
    });
  }
  editLastName(newLastName: string): void {
    this.firestore.collection('user_data').doc('u_id')
      .update({
        last_name: newLastName
      });
  }
  editGender(newGender: 'm' | 'f' | 'n'): void {
    this.firestore.collection('user_data').doc('u_id')
      .update({
        gender: newGender
      });
  }
  editEmail(newEmail: string): void {
    this.firestore.collection('user_data').doc('u_id')
      .update({
        email: newEmail
      });
  }
}


