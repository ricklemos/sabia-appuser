import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import {Router} from '@angular/router';
import {UrlService} from '../../../services/url.service';
import {InvestmentModule} from '../../model/investment-wallet.model';
import { InvestmentWalletPizzaGraph } from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-overview-page',
  templateUrl: './investment-wallet-overview-page.component.html',
  styleUrls: ['./investment-wallet-overview-page.component.scss']
})
export class InvestmentWalletOverviewPageComponent implements OnInit {

  data: InvestmentWalletPizzaGraph = {
    fixedIncome: 10,
    variableIncome: 20,
    treasure: 30,
    balance: 40,
  };

  investmentModules: InvestmentModule[];

  constructor(
    private walletService: WalletService,
    private router: Router,
    private urlService: UrlService
  ) {
    this.investmentModules = [
      {
        moduleName: 'VARIABLE_INCOME',
        invested: 1000, // in Reais
        variation: -0.2, // between 0 and 1
        label: 'Renda Variável',
        color: '#2B8B87',
        percentage: 0.1,
      },
      {
        moduleName: 'FIXED_INCOME',
        invested: 500, // in Reais
        variation: 0.2, // between 0 and 1
        label: 'Renda Fixa Privada',
        color: '#39C0BA',
        percentage: 0.1,
      },
      {
        moduleName: 'TREASURE',
        invested: 500, // in Reais
        variation: 0.2, // between 0 and 1
        label: 'Tesouro Direto',
        color: '#C8EAE8',
        percentage: 0.1,
      },
    ];
  }

  ngOnInit(): void {
  }

  goToInvestmentWalletModule(moduleId): void {
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleId)]);
  }
}
