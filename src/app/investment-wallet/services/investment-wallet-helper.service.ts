import { Injectable } from '@angular/core';
import { InvestmentModule } from '../model/investment-wallet.model';

@Injectable({
  providedIn: 'root'
})
export class InvestmentWalletHelperService {

  constructor() {
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
}

