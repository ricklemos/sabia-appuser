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
      {
        moduleName: 'ANIMAL_GAME',
        invested: 37600,
        variation: 0.631,
        label: this._getInvestmentModuleLabel('ANIMAL_GAME'),
        color: this._getInvestmentModuleColor('ANIMAL_GAME'),
        percentage: 0.09,
      },
    ];
  }

  getProductList(moduleName: InvestmentModule['moduleName']): InvestmentProduct[] {
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
      case 'ANIMAL_GAME':
        return 'Jogo do Bixo';
    }
  }

  private _getInvestmentModuleColor(moduleName: InvestmentModule['moduleName']): string {
    switch (moduleName) {
      case 'VARIABLE_INCOME':
        return '#39C0BA';
      case 'FIXED_INCOME':
        return '#2B8B87';
      case 'ANIMAL_GAME':
        return '#C8EAE8';
    }
  }
}

const PRODUCTS: InvestmentProduct[] = [
  {
    id: 'DOW J',
    label: 'Dow Jones Industrial Average',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0054,
  },
  {
    id: '^BVSP',
    label: 'IBOVESPA',
    module: 'VARIABLE_INCOME',
    variationDay: -0.0066,
  },
  {
    id: 'AAPL',
    label: 'Apple Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0250,
  },
  {
    id: 'BA',
    label: 'The Boeing Company',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0060,
  },
  {
    id: 'BRK-B',
    label: 'Berkshire Hathaway Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0067,
  },
  {
    id: 'DIS',
    label: 'The Walt Disney Company',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0008,
  },
  {
    id: 'GE',
    label: 'General Electric Company',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0136,
  },
  {
    id: 'HD',
    label: 'The Home Depot Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: -0.0020,
  },
  {
    id: 'NKE',
    label: 'NIKE, Inc.',
    module: 'VARIABLE_INCOME',
    variationDay: 0.0130,
  },
  {
    id: 'SBUX',
    label: 'Starbucks Corporation',
    module: 'VARIABLE_INCOME',
    variationDay: -0.0033,
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
  {
    id: 'Avestruz',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Águia',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Burro',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Borboleta',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Cachorro',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Cabra',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Carneiro',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Camelo',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Cobra',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Coelho',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Cavalo',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Elefante',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Galo',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Gato',
    module: 'ANIMAL_GAME'
  },
  {
    id: 'Jacaré',
    module: 'ANIMAL_GAME'
  },
];
