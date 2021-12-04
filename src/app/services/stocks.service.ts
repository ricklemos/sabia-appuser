import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  fetchSheetStocks(): Observable<any>{
    return this.angularFirestore.doc('simulatorStocks/1_SHEET_STOCKS').get();
  }

  searchStocks(ticker): Observable<any> {
    return this.angularFirestore.collection('simulatorStocks', ref => ref
      .limit(4)
      .orderBy('ticker')
      .startAt(ticker)
      .endAt(ticker + '\uf8ff')
    ).valueChanges();
  }

  searchStocksByName(name): Observable<any> {
    return this.angularFirestore.collection('simulatorStocks', ref => ref
      .limit(4)
      .orderBy('name')
      .startAt(name)
      .endAt(name + '\uf8ff')
    ).valueChanges();
  }

  // Retorna o documento com o preço atual de todas as ações
  fetchAllStockPrices(): Observable<any> {
    return this.angularFirestore.doc('simulatorStocks/1_ALL_STOCKS').get().pipe(
      map(res => res.data()),
      map(data => {
        // @ts-ignore
        const { stockPrices } = data;
        const response = [];
        if (stockPrices) {
          const entries = Object.entries(stockPrices);
          entries.forEach(entry => {
            response.push({
              ticker: entry[0],
              price: entry[1]
            });
          });
        }
        return response;
      })
    );
  }

  /**
   * Retorna os dados da ação do Firebase (coleção simulatorStocks)
   * @param ticker stock identifier
   */
  fetchStockByTicker(ticker: string): Observable<any> {
    return this.angularFirestore.doc(`simulatorStocks/${ ticker }`).valueChanges();
  }

  // Atualiza os dados da ação do Firebase (coleção simulatorStocks)
  // Não seve ser utilizado em produção (update é feito via cloudfunctions).
  updateStockByTicker(ticker: string, data): Promise<any> {
    return this.angularFirestore.doc(`simulatorStocks/${ ticker }`).update(data);
  }

  // Retorna um objeto com os dados históricos da ação (preço, volume, variação diária)
  // Em tese, não deve ser utilizado, pois esses dados devem vir do firebase
  fetchStockHistoryByTicker(ticker: string): Observable<any>{
    const url = `${this.alphaVantageBaseURL}/query?function=TIME_SERIES_DAILY_ADJUSTED&outputsize=compact&symbol=${ticker}.SAO&apikey=${this.API_KEY}`;
    return this.httpClient.get(url);
  }
  // Retorna um objeto com os dados atuais da ação (preço, volume, variação diária)
  fetchStockStatusByTicker(ticker: string): Observable<any>{
    return this.httpClient.get(`${this.alphaVantageBaseURL}
    /query?=GLOBAL_QUOTE&symbol=${ticker}.SAO&apikey=${this.API_KEY}`);
  }
  // Retorna um conjunto de objetos com os resultados da busca
  searchStockFromApi(keyword: string): Observable<any> {
    return this.httpClient.get(`${this.alphaVantageBaseURL}
    /query?function=SYMBOL_SEARCH&symbol=${keyword}&apikey=${this.API_KEY}`);
  }
  // Retorna um Objeto com os dados de câmbio do dólar atuais
  fetchCurrentExchangeData(): Observable<any>{
    return this.httpClient.get(`${this.alphaVantageBaseURL}
    /query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=BRL&apikey=${this.API_KEY}`);
  }
  // Retorna um Objeto com os dados de câmbio do dólar histórico
  fetchExchangeDataHistory(): Observable<any>{
    return this.httpClient.get(`${this.alphaVantageBaseURL}
    /query?function=FX_DAILY&from_currency=USD&to_currency=BRL&apikey=${this.API_KEY}`);
  }
}
