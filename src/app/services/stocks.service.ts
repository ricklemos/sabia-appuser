import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  API_KEY = '4YSTYIK08AMHDKZE';
  alphaVantageBaseURL = 'https://www.alphavantage.co';

  constructor(
    private angularFirestore: AngularFirestore,
    private httpClient: HttpClient
  ) { }
  fetchStockByTicker(ticker: string): Observable<any>{
    return this.angularFirestore.doc(`simulatorStocks/${ticker}`).valueChanges();
  }
  updateStockByTicker(ticker: string, data): Promise<any>{
    return this.angularFirestore.doc(`simulatorStocks/${ticker}`).update(data);
  }
  fetchStockStatusByTicker(ticker: string): Observable<any>{
    return this.httpClient.get(`${this.alphaVantageBaseURL}/query?=GLOBAL_QUOTE&symbol=${ticker}.SAO&apikey=${this.API_KEY}`);
  }
  searchStock(keyword: string): Observable<any> {
    return this.httpClient.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&symbol=${keyword}&apikey=${this.API_KEY}`);
  }
  // {
  //   "Realtime Currency Exchange Rate": {
  //     "1. From_Currency Code": "USD",
  //     "2. From_Currency Name": "United States Dollar",
  //     "3. To_Currency Code": "BRL",
  //     "4. To_Currency Name": "Brazilian Real",
  //     "5. Exchange Rate": "5.56530000",
  //     "6. Last Refreshed": "2021-10-27 19:41:21",
  //     "7. Time Zone": "UTC",
  //     "8. Bid Price": "5.56527000",
  //     "9. Ask Price": "5.56537000"
  //   }
  // }
  fetchCurrentExchangeData(): Observable<any>{
    return this.httpClient.get(`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=BRL&apikey=${this.API_KEY}`);
  }
  fetchExchangeDataHistory(): Observable<any>{
    return this.httpClient.get(`https://www.alphavantage.co/query?function=FX_DAILY&from_currency=USD&to_currency=BRL&apikey=${this.API_KEY}`);
  }
}
