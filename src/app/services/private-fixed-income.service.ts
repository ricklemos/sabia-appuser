import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {InvestmentPrivateFixedIncome} from '../investment-wallet/model/investment-wallet.model';

@Injectable({
  providedIn: 'root'
})
export class PrivateFixedIncomeService {
  product: InvestmentPrivateFixedIncome = {
    bank: 'BANCO ABC ',
    due: '29/01/2023',
    index: 90,
    liquidity: 'No Vencimento',
    minimumInput: 1000,
    name: 'LCI BANCO ABC - JAN/2023',
    productType: 'LCI',
    rating: 'AAA',
    ratingAgency: null,
    relativeToPoupanca: '-',
    yield: 'IPCA + 0.7%',
  };
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
