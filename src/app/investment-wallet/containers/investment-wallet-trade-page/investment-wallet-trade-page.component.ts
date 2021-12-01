import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {InvestmentProduct, InvestmentTreasure, InvestmentWallet} from '../../model/investment-wallet.model';
import { InvestmentWalletMockService } from '../../services/investment-wallet-mock.service';
import { UrlService } from '../../../services/url.service';
import { StocksService } from '../../../services/stocks.service';
import {noop, Observable, of, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import { InvestmentWalletHelperService } from '../../services/investment-wallet-helper.service';
import {WalletService} from '../../services/wallet.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TreasureService} from '../../../services/treasure.service';

@Component({
  selector: 'investment-wallet-trade-page',
  templateUrl: './investment-wallet-trade-page.component.html',
  styleUrls: ['./investment-wallet-trade-page.component.scss']
})
export class InvestmentWalletTradePageComponent implements OnInit, OnDestroy {
  product: InvestmentProduct;
  productId: string;
  moduleId: string;
  loading = true;
  subscribes: Subscription[] = [];
  balance: number;
  productBalance: number;
  quotasAvailableToSell: number;
  walletId: string;
  wallet: InvestmentWallet;

  constructor(
    private route: ActivatedRoute,
    private investmentWalletMockService: InvestmentWalletMockService,
    private urlService: UrlService,
    private router: Router,
    private stocksService: StocksService,
    private treasureService: TreasureService,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private walletService: WalletService,
    private matSnackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.moduleId = this.investmentWalletHelperService.getModuleIdFromSlug(this.route.snapshot.paramMap.get('moduleSlug'));
    const fetchStockInfo = this.walletService.fetchUserWallets().pipe(
      switchMap((docs) => {
        this.wallet = docs[0];
        this.walletService.setWallet(this.wallet);
        this.balance = this.wallet.balance;
        switch (this.moduleId){
          case 'VARIABLE_INCOME':
            return this.fetchStockInfo();
          case 'TREASURE':
            return this.fetchTreasureInfo();
          default:
            return of('erro');
        }
      }),
      tap(() => this.loading = false)
    ).subscribe(noop);
    this.subscribes.push(fetchStockInfo);
  }
  private fetchStockInfo(): Observable<any>{
    return this.stocksService.fetchSheetStocks().pipe(
      tap(req => {
        const data = req.data();
        const [obj] = data.stocks.filter(stock => stock.ticker === this.productId);
        this.product = {
          id: this.productId,
          module: 'VARIABLE_INCOME',
          variableIncomeData: obj,
          unitPrice: this.product.variableIncomeData.currentPrice
        };
        const stockTransactions = this.wallet.stocksEvents.filter(stock => stock.ticker === this.productId);
        this.quotasAvailableToSell = this.investmentWalletHelperService.calculateTickerQuotas(stockTransactions);
        console.log('count', this.quotasAvailableToSell);
        this.productBalance = this.product.variableIncomeData.currentPrice * this.quotasAvailableToSell;
      })
    );
  }
  private fetchTreasureInfo(): Observable<any> {
    return this.treasureService.fetchAvailableTitles().pipe(
      switchMap((availableTitles) => {
        const titleDetails: InvestmentTreasure = availableTitles.titles[this.productId];
        console.log(titleDetails);
        const dueDate =  titleDetails.vencimento.substr(8, 2) + ' / '
          + titleDetails.vencimento.substr(5, 2) + ' / '
          + titleDetails.vencimento.substr(0, 4);
        this.product = {
          id: this.productId,
          label: titleDetails.tipoTitulo + ' ' + titleDetails.vencimento.substr(0, 4),
          module: 'TREASURE',
          yield: titleDetails.txVendaManha.toString(10),
          unitPrice: titleDetails.puVendaManha,
          dueDate,
          minimumInvestment: titleDetails.puVendaManha * 0.01
        };
        this.productBalance = 0;
        return this.treasureService.fetchTitle(this.productId);
      }),
      tap((title) => {
        console.log(title);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribes.map(u => u.unsubscribe());
  }

  trade($event): any{
    if (!$event.quota || $event.quota <= 0){
      this.matSnackBar.open('Insira um número de cotas maior que zero', 'OK', { duration: 3000 });
      return;
    }
    if ($event.quota.includes(',')){
      this.matSnackBar.open('Use o ponto como separador decimal', 'OK', { duration: 3000 });
      return;
    }
    if (parseFloat($event.quota) * 10 % 10 !== 0) {
      this.matSnackBar.open('Não é possível comprar cotas fracionadas', 'OK', { duration: 3000 });
      return;
    }
    const quotas = parseInt($event.quota, 10);
    const value = quotas * this.product.variableIncomeData.currentPrice;
    if ($event.type === 'BUY'){
      if (this.balance < value){
        this.matSnackBar.open('Sem saldo disponível para investir', 'OK', { duration: 3000 });
        return;
      } else {
        this.walletService.tradeStocks(this.productId, quotas, this.product.variableIncomeData.currentPrice, $event.type)
          .then(() => {
            this.matSnackBar.open('Operação realizada com sucesso', 'OK', { duration: 3000 });
          });
      }
    } else if ($event.type === 'SELL'){
      if (this.quotasAvailableToSell >= quotas) {
        this.walletService.tradeStocks(this.productId, quotas, this.product.variableIncomeData.currentPrice, $event.type)
          .then(() => {
            this.matSnackBar.open('Operação realizada com sucesso', 'OK', { duration: 3000 });
          });
      } else {
        this.matSnackBar.open(`Só há ${this.quotasAvailableToSell} cotas disponíveis para venda`, 'OK', { duration: 3000 });
      }
    }
  }

  goBack(): void {
    const { module } = this.product;
    const moduleSlug = this.investmentWalletHelperService.getModuleSlugFromId(module);
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleSlug)]);
  }
}
