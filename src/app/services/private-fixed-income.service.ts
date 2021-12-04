import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {InvestmentPrivateFixedIncome} from '../investment-wallet/model/investment-wallet.model';

@Injectable({
  providedIn: 'root'
})
export class PrivateFixedIncomeService {
  product: InvestmentPrivateFixedIncome;
  constructor(
    private angularFirestore: AngularFirestore
  ) { }

  fetchPrivateFixedIncomeProducts(): Observable<any>{
    return this.angularFirestore.collection('simulatorPrivateFixedIncome').get();
  }
  setProduct(product: InvestmentPrivateFixedIncome): void {
    this.product = product;
  }
  getProduct(): InvestmentPrivateFixedIncome{
    return this.product;
  }
}
