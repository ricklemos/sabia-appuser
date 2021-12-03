import { Injectable } from '@angular/core';
import {
  InvestmentModule,
  InvestmentProduct, PrivateFixedIncomeEvent,
  PublicFixedIncomeEvent,
  StocksEvent
} from '../model/investment-wallet.model';

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
      default:
        return '';
    }
  }

  getModuleIdFromSlug(moduleLabel: string): InvestmentModule['moduleName'] {
    switch (moduleLabel) {
      case 'renda-variavel':
        return 'VARIABLE_INCOME';
      case 'renda-fixa':
        return 'FIXED_INCOME';
      case 'tesouro-direto':
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
      const [stockInfo] = stockPrices.filter(stock => stock.ticker === key);
      position += stockInfo.currentPrice * value;
    }
    return position;
  }
  calculateProducts(transactionHistory: StocksEvent[], stockPrices): InvestmentProduct[] {
    const products = [];
    const quotasDictionary = this.calculateQuotas(transactionHistory);
    for (const [key, value] of Object.entries(quotasDictionary)){
      const [stockInfo] = stockPrices.filter(stock => stock.ticker === key);
      // @ts-ignore
      const position = stockInfo.currentPrice * value;
      if (position !== 0){
        products.push({
          id: key,
          position,
          label: stockInfo.companyName
        });
      }
    }
    return products;
  }
  calculateTreasureQuotas(transactionHistory: PublicFixedIncomeEvent[]): any {
    const dic = {};
    transactionHistory.forEach(transaction => {
      if (dic[transaction.id]) {
        if (transaction.type === 'BUY') {
          dic[transaction.id] += transaction.quotas;
        } else {
          dic[transaction.id] -= transaction.quotas;
        }
      } else {
        dic[transaction.id] = transaction.quotas;
      }
    });
    return dic;
  }
  getPrivateFixedIncomeProductsPosition(transactionHistory: PrivateFixedIncomeEvent[]): any {
    const amountDic = {};
    transactionHistory.forEach(transaction => {
      if (amountDic[transaction.name]) {
        if (transaction.type === 'BUY') {
          amountDic[transaction.name] += transaction.amount;
        } else {
          amountDic[transaction.name] -= transaction.amount;
        }
      } else {
        amountDic[transaction.name] = transaction.amount;
      }
    });
    return amountDic;
  }
  calculatePrivateFixedIncomePosition(transactionHistory: PrivateFixedIncomeEvent[]): any {
    const amountDic = this.getPrivateFixedIncomeProductsPosition(transactionHistory);
    let position = 0;
    Object.keys(amountDic).forEach(productKey => {
      position += amountDic[productKey];
    });
    return position;
  }
}

