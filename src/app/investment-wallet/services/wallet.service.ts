import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import {noop, Observable, Subscription} from 'rxjs';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  uId: string;
  investmentWalletSubscription: Subscription;
  wallet: any;
  walletId: string;

  constructor(
    private firestore: AngularFirestore,
    private sessionService: SessionsLoginService
  ) {
  }

  getUserWallets(): Observable<any>{
    this.uId = this.sessionService.getUserId();
    return this.firestore.collection('simulatorWallet', ref => ref.where('userId', '==', this.uId)).valueChanges();
  }

  // Dá subscribe na carteira do aluno para que leituras e alterações sejam feitas futuramente
  getWallet(): void {
    this.uId = this.sessionService.getUserId();

    this.investmentWalletSubscription = this.firestore
      .collection('simulatorWallet', ref => ref.where('userId', '==', this.uId))
      .get()
      .pipe(
        tap(
          (snap) => {
            this.wallet = snap.docs[0].data();
            this.walletId = snap.docs[0].id;
            console.log(this.wallet);
          }
        )
      ).subscribe(noop);
  }

  closeWallet(): void {
    this.investmentWalletSubscription.unsubscribe();
  }


  // Atualiza documento da carteira com informações de COMPRA de ações. Demora para atualizar.
  buyStocks(ticker: string, quotas: number, price: number): Promise<any> {
    return this.firestore.doc(`simulatorWallet/${ this.walletId }`).update(
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


  // Atualiza documento da carteira com informações de COMPRA de ações. Demora para atualizar.
  sellStocks(ticker: string, quotas: number, price: number): Promise<any> {
    return this.firestore.doc(`simulatorWallet/${ this.walletId }`).update(
      {
        balance: this.wallet.balance + price * quotas,
        stocksEvents: firebase.default.firestore.FieldValue.arrayUnion(
          {
            type: 'SELL',
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
