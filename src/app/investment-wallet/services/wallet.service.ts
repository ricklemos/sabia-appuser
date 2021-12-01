import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import * as firebase from 'firebase/app';
import {InvestmentWallet} from '../model/investment-wallet.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  uId: string;
  wallet: InvestmentWallet;

  constructor(
    private firestore: AngularFirestore,
    private sessionService: SessionsLoginService
  ) {
  }

  fetchUserWallets(): Observable<any>{
    this.uId = this.sessionService.getUserId();
    return this.firestore.collection('simulatorWallet', ref => ref.where('userId', '==', this.uId)).valueChanges();
  }

  setWallet(wallet): void {
    this.wallet = wallet;
  }
  // Atualiza documento da carteira com informações de COMPRA de ações. Demora para atualizar.
  buyStocks(ticker: string, quotas: number, price: number): Promise<any> {
    return this.firestore.doc(`simulatorWallet/${ this.wallet.walletId }`).update(
      {
        balance: this.wallet.balance - price * quotas,
        stocksEvents: firebase.default.firestore.FieldValue.arrayUnion(
          {
            type: 'BUY',
            dateTime: new Date(),
            ticker,
            quotas,
            price
          }
        )
      }
    );
  }


  // Atualiza documento da carteira com informações de COMPRA e VENDA de ações. Demora para atualizar.
  tradeStocks(ticker: string, quotas: number, price: number, type: 'BUY' | 'SELL'): Promise<any> {
    return this.firestore.doc(`simulatorWallet/${ this.wallet.walletId }`).update(
      {
        balance: type === 'BUY' ? this.wallet.balance - price * quotas : this.wallet.balance + price * quotas,
        stocksEvents: firebase.default.firestore.FieldValue.arrayUnion(
          {
            type,
            dateTime: new Date(),
            ticker,
            quotas,
            price
          }
        )
      }
    );
  }

  // Cálculo do rendimento de uma ação da carteira
  stockYield(ticker: string, currentPrice: number): any {
    let mediumPrice = 0;
    let totalQuota = 0;
    const stocks = this.wallet.stocksEvents.filter((stock) => stock.ticker === ticker);
    stocks.forEach((stock) => {
      if (stock.type === 'BUY') {
        mediumPrice += stock.price * stock.quotas;
        totalQuota += stock.quotas;
      } else if (stock.type === 'SELL') {
        mediumPrice -= stock.price * stock.quotas;
        totalQuota -= stock.quotas;
      }
    });
    if (totalQuota !== 0) {
      mediumPrice = mediumPrice / totalQuota;
    } else {
      return 'usuario sem cotas';
    }
    return (currentPrice - mediumPrice) / mediumPrice;
  }

}
