import { Injectable } from '@angular/core';
import { InvestmentModule, InvestmentProduct } from '../model/investment-wallet.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentWalletMockService {

  constructor() {
  }

  getInvestmentModules(): InvestmentModule[] {
    return [
      {
        moduleName: 'VARIABLE_INCOME',
        invested: 247600,
        variation: -0.045,
        label: this._getInvestmentModuleLabel('VARIABLE_INCOME'),
        color: this._getInvestmentModuleColor('VARIABLE_INCOME'),
        percentage: 0.622,
      },
      {
        moduleName: 'FIXED_INCOME',
        invested: 112600,
        variation: 0.105,
        label: this._getInvestmentModuleLabel('FIXED_INCOME'),
        color: this._getInvestmentModuleColor('FIXED_INCOME'),
        percentage: 0.283,
      },
    ];
  }

  getProductList(moduleName: string): InvestmentProduct[] {
    return PRODUCTS.filter(iP => iP.module === moduleName);
  }

  getProduct(id: string): InvestmentProduct {
    return PRODUCTS.find(iP => iP.id === id);
  }

  private _getInvestmentModuleLabel(moduleName: InvestmentModule['moduleName']): string {
    switch (moduleName) {
      case 'VARIABLE_INCOME':
        return 'Renda Variável';
      case 'FIXED_INCOME':
        return 'Renda Fixa';
    }
  }

  private _getInvestmentModuleColor(moduleName: InvestmentModule['moduleName']): string {
    switch (moduleName) {
      case 'VARIABLE_INCOME':
        return '#39C0BA';
      case 'FIXED_INCOME':
        return '#2B8B87';
    }
  }
}

const PRODUCTS: InvestmentProduct[] = [
  {
    id: 'DOW J',
    label: 'Dow Jones Industrial Average',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0054,
    currentValue: 3632795,
  },
  {
    id: '^BVSP',
    label: 'IBOVESPA',
    module: 'VARIABLE_INCOME',
    variationDay: -0.0066,
    currentValue: 10482400,
  },
  {
    id: 'AAPL',
    label: 'Apple Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0250,
    currentValue: 15128,
  },
  {
    id: 'BA',
    label: 'The Boeing Company',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0060,
    currentValue: 22446,
  },
  {
    id: 'BRK-B',
    label: 'Berkshire Hathaway Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0067,
    currentValue: 28788,
  },
  {
    id: 'DIS',
    label: 'The Walt Disney Company',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0008,
    currentValue: 17563,
  },
  {
    id: 'GE',
    label: 'General Electric Company',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0136,
    currentValue: 10874,
  },
  {
    id: 'HD',
    label: 'The Home Depot Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: -0.0020,
    currentValue: 36840,
  },
  {
    id: 'NKE',
    label: 'NIKE, Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0130,
    currentValue: 17751,
  },
  {
    id: 'SBUX',
    label: 'Starbucks Corporation',
    module: 'VARIABLE_INCOME',
    variationDay: -0.0033,
    currentValue: 11691,
  },
  {
    id: 'CDB, Banco XPTO',
    label: 'CDB',
    seller: 'Banco XPTO',
    module: 'FIXED_INCOME',
    yield: '100% CDI',
    returnDate: '2026/07/21',
    minimumInvestment: 500000,
  },
  {
    id: 'Tesouro IPCA+ 2026',
    label: 'Tesouro IPCA+ 2026',
    module: 'FIXED_INCOME',
    yield: 'IPCA + 10% a.a.',
    returnDate: '2026/07/21',
    minimumInvestment: 5000,
  },
];
