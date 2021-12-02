import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {TreasureService} from '../../../services/treasure.service';

@Component({
  selector: 'investment-wallet-overview-page',
  templateUrl: './investment-wallet-overview-page.component.html',
  styleUrls: ['./investment-wallet-overview-page.component.scss']
})
export class InvestmentWalletOverviewPageComponent implements OnInit, OnDestroy {

  pizzaGraphData: InvestmentWalletPizzaGraphProduct[] = [];
  loading = true;

  investmentModules: InvestmentModule[];
  wallet;
  totalWithoutBalance: number;

  subscribes = [];

  constructor(
    private walletService: WalletService,
    private walletHelperService: InvestmentWalletHelperService,
    private router: Router,
    private urlService: UrlService,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private stocksService: StocksService,
    private treasureService: TreasureService
  ) {
    this.investmentModules = [
      {
        moduleName: 'VARIABLE_INCOME',
        invested: 0, // in Reais
        variation: 0, // between 0 and 1
        label: 'Renda Variável',
        color: '#2B8B87',
        percentage: 0,
      },
      {
        moduleName: 'TREASURE',
        invested: 0, // in Reais
        variation: 0, // between 0 and 1
        label: 'Tesouro Direto',
        color: '#39C0BA',
        percentage: 0,
      },
      {
        moduleName: 'FIXED_INCOME',
        invested: 0, // in Reais
        variation: 0, // between 0 and 1
        label: 'Renda Fixa Privada',
        color: '#C8EAE8',
        percentage: 0,
      },
      {
        moduleName: 'BALANCE',
        invested: 0, // in Reais
        variation: 0, // between 0 and 1
        label: 'Caixa',
        color: '#D9D9D9',
        percentage: 0,
      },
    ];
  }

  ngOnInit(): void {
    const fetchSub = this.walletService.fetchUserWallets().pipe(
      switchMap(docs => {
        this.wallet = docs[0];
        this.investmentModules[3].invested = this.wallet.balance;
        return this.stocksService.fetchSheetStocks(); // Pega o preço atual das ações para calcular a posição
      }),
      switchMap((stocks) => {
        const stockPrices = stocks.data().stocks;
        const quotasDic = this.walletHelperService.calculateQuotas(this.wallet.stocksEvents);
        this.investmentModules[0].invested = this.walletHelperService.calculatePosition(quotasDic, stockPrices);
        return this.treasureService.fetchAvailableTitles();
      }),
      tap((doc) => {
        Object.keys(doc.titles).forEach(key => {
          doc.titles[key].id = key;
        });
        const treasureQuotas = this.investmentWalletHelperService.calculateTreasureQuotas(this.wallet.publicFixedIncomeEvents);
        let treasurePosition = 0;
        Object.keys(treasureQuotas).forEach(key => {
          treasurePosition += treasureQuotas[key] * doc.titles[key].puVendaManha;
        });
        this.investmentModules[1].invested = treasurePosition;
      }),
      tap(() => {
        // TODO: Antes de fazer essa conta tem que pegar os dados de tesouro direto e renda fixa privada
        this.totalWithoutBalance = 0;
        this.investmentModules.forEach(investmentModule => {
          this.totalWithoutBalance += investmentModule.invested;
        });
        const total = this.totalWithoutBalance;
        this.investmentModules.forEach(investmentModule => {
          investmentModule.percentage = investmentModule.invested / total;
          this.pizzaGraphData.push({
            name: investmentModule.label,
            balance: investmentModule.invested,
            color: investmentModule.color,
            percentage: investmentModule.percentage
          });
        });
        this.totalWithoutBalance -= this.investmentModules[3].invested;
        this.loading = false;
      })
    ).subscribe(noop);
    this.subscribes.push(fetchSub);
  }

  ngOnDestroy(): void {
    this.subscribes.map(u => u.unsubscribe);
  }

  goToInvestmentWalletModule(moduleId): void {
    const moduleSlug = this.investmentWalletHelperService.getModuleSlugFromId(moduleId);
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleSlug)]);
  }
}
