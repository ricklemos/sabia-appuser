import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { InvestmentModule, InvestmentWalletPizzaGraph } from '../../model/investment-wallet.model';
import { InvestmentWalletHelperService } from '../../services/investment-wallet-helper.service';
import {switchMap, tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {StocksService} from '../../../services/stocks.service';

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
  wallet;

  constructor(
    private walletService: WalletService,
    private walletHelperService: InvestmentWalletHelperService,
    private router: Router,
    private urlService: UrlService,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private stocksService: StocksService
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
    this.walletService.getUserWallets().pipe(
      switchMap(docs => {
        this.wallet = docs[0];
        return this.stocksService.fetchSheetStocks(); // Pega o preço atual das ações para calcular a posição
      }),
      tap((stocks) => {
        console.log('query', stocks.data().stocks);
        const stockPrices = stocks.data().stocks;
        const quotasDic = this.walletHelperService.calculateQuotas(this.wallet.stocksEvents);
        this.investmentModules[0].invested = this.walletHelperService.calculatePosition(quotasDic, stockPrices);
      })
    ).subscribe(noop);
  }

  goToInvestmentWalletModule(moduleId): void {
    const moduleSlug = this.investmentWalletHelperService.getModuleSlugFromId(moduleId);
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleSlug)]);
  }
}
