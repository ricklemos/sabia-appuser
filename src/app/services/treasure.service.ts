import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreasureService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  fetchAvailableTitles(): Observable<any>{
    return this.firestore.doc('simulatorTreasure/availableTitles').valueChanges();
  }
}
