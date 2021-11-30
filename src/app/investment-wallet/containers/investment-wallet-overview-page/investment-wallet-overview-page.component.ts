import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import {
  InvestmentModule,
  InvestmentWalletPizzaGraphProduct
} from '../../model/investment-wallet.model';
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

  pizzaGraphData: InvestmentWalletPizzaGraphProduct[] = [];
  loading = true;

  investmentModules: InvestmentModule[];
  wallet;
  totalWithoutBalance: number;

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
        invested: 0, // in Reais
        variation: -0.2, // between 0 and 1
        label: 'Renda Variável',
        color: '#2B8B87',
        percentage: 0.1,
      },
      {
        moduleName: 'TREASURE',
        invested: 0, // in Reais
        variation: 0.2, // between 0 and 1
        label: 'Tesouro Direto',
        color: '#39C0BA',
        percentage: 0.1,
      },
      {
        moduleName: 'FIXED_INCOME',
        invested: 0, // in Reais
        variation: 0.2, // between 0 and 1
        label: 'Renda Fixa Privada',
        color: '#C8EAE8',
        percentage: 0.1,
      },
      {
        moduleName: 'BALANCE',
        invested: 0, // in Reais
        variation: 0.2, // between 0 and 1
        label: 'Caixa',
        color: '#D9D9D9',
        percentage: 0.1,
      },
    ];
  }

  ngOnInit(): void {
    this.walletService.getUserWallets().pipe(
      switchMap(docs => {
        this.wallet = docs[0];
        this.investmentModules[3].invested = this.wallet.balance;
        this.pizzaGraphData.push(
          {
            name: this.investmentModules[3].label,
            balance: this.investmentModules[3].invested,
            color: this.investmentModules[3].color
          }
        );
        return this.stocksService.fetchSheetStocks(); // Pega o preço atual das ações para calcular a posição
      }),
      tap((stocks) => {
        console.log('query', stocks.data().stocks);
        const stockPrices = stocks.data().stocks;
        const quotasDic = this.walletHelperService.calculateQuotas(this.wallet.stocksEvents);
        this.investmentModules[0].invested = this.walletHelperService.calculatePosition(quotasDic, stockPrices);
        this.pizzaGraphData.push(
          {
            name: this.investmentModules[0].label,
            balance: this.investmentModules[0].invested,
            color: this.investmentModules[0].color
          }
        );
      }),
      tap(() => {
        // TODO: Antes de fazer essa conta tem que pegar os dados de tesouro direto e renda fixa privada
        this.totalWithoutBalance =
            this.investmentModules[0].invested
          + this.investmentModules[1].invested
          + this.investmentModules[2].invested;
        const total = this.wallet.balance + this.totalWithoutBalance;
        this.investmentModules.forEach(investmentModule => {
          investmentModule.percentage = investmentModule.invested / total;
        });
        this.loading = false;
      })
    ).subscribe(noop);
  }

  goToInvestmentWalletModule(moduleId): void {
    const moduleSlug = this.investmentWalletHelperService.getModuleSlugFromId(moduleId);
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleSlug)]);
  }
}
