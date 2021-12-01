import { Injectable } from '@angular/core';
import {InvestmentModule, StocksEvent} from '../model/investment-wallet.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentWalletHelperService {

  constructor(
  ) {
  }

  getModuleSlugFromId(moduleId: InvestmentModule['moduleName']): string {
    switch (moduleId) {
      case 'VARIABLE_INCOME':
        return 'renda-variavel';
      case 'FIXED_INCOME':
        return 'renda-fixa';
      case 'TREASURE':
        return 'tesouro-direto';
    }
  }

  getModuleIdFromSlug(moduleLabel: string): InvestmentModule['moduleName'] {
    switch (moduleLabel) {
      case 'renda-variavel:':
        return 'VARIABLE_INCOME';
      case 'renda-fixa:':
        return 'FIXED_INCOME';
      case 'tesouro-direto:':
        return 'TREASURE';
    }
  }

  calculateQuotas(transactionHistory: StocksEvent[]): any {
    const dic = {};
    transactionHistory.forEach(transaction => {
      if (dic[transaction.ticker]) {
        if (transaction.type === 'BUY'){
          dic[transaction.ticker] += transaction.quotas;
        } else {
          dic[transaction.ticker] -= transaction.quotas;
        }
      } else {
        dic[transaction.ticker] = transaction.quotas;
      }
    });
    return dic;
  }

  calculateTickerQuotas(transactionHistory: StocksEvent[]): number {
    let count = 0;
    transactionHistory.forEach(transaction => {
      if (transaction.type === 'BUY'){
        count += transaction.quotas;
      } else {
        count -= transaction.quotas;
      }
    });
    return count;
  }

  calculatePosition(quotasDictionary: object, stockPrices): number{
    let position = 0;
    for (const [key, value] of Object.entries(quotasDictionary)){
      console.log(key, value);
      const [stockInfo] = stockPrices.filter(stock => stock.ticker === key);
      position += stockInfo.currentPrice * value;
    }
    return position;
  }


}

