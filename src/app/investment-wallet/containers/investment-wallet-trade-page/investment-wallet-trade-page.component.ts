import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InvestmentPrivateFixedIncome,
  InvestmentProduct,
  InvestmentTreasure,
  InvestmentWallet
} from '../../model/investment-wallet.model';
import { InvestmentWalletMockService } from '../../services/investment-wallet-mock.service';
import { UrlService } from '../../../services/url.service';
import { StocksService } from '../../../services/stocks.service';
import {noop, Observable, of, Subscription} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import { InvestmentWalletHelperService } from '../../services/investment-wallet-helper.service';
import {WalletService} from '../../services/wallet.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TreasureService} from '../../../services/treasure.service';
import {PrivateFixedIncomeService} from '../../../services/private-fixed-income.service';

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
    private privateFixedIncomeService: PrivateFixedIncomeService,
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
          case 'FIXED_INCOME':
            return this.fetchPrivateFixedIncomeProduct();
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
        console.log(this.productId);
        const [obj] = data.stocks.filter(stock => stock.ticker === this.productId);
        console.log(obj);
        this.product = {
          id: this.productId,
          module: 'VARIABLE_INCOME',
          variableIncomeData: obj,
          unitPrice: obj.currentPrice
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
        const dueDate =  titleDetails.vencimento.substr(8, 2) + '/'
          + titleDetails.vencimento.substr(5, 2) + '/'
          + titleDetails.vencimento.substr(0, 4);
        this.product = {
          id: this.productId,
          label: titleDetails.tipoTitulo + ' ' + titleDetails.vencimento.substr(0, 4),
          module: 'TREASURE',
          yield: titleDetails.txVendaManha.toString(10),
          unitPrice: titleDetails.puVendaManha,
          dueDate,
          minimumInvestment: titleDetails.puVendaManha * 0.01,
          treasureData: titleDetails
        };
        const dic = this.investmentWalletHelperService.calculateTreasureQuotas(this.wallet.publicFixedIncomeEvents);
        this.productBalance = dic[this.productId] * titleDetails.puVendaManha;
        this.quotasAvailableToSell = dic[this.productId]; // TODO: Mostrar dados de cotas disponíveis pro usuário?
        return this.treasureService.fetchTitle(this.productId);
      }),
      tap((title) => {
        // TODO: aqui podemos usar os dados históricos do título pra mostrar em um gráfico .
        console.log(title);
      })
    );
  }

  private fetchPrivateFixedIncomeProduct(): Observable<any>{
    return of(this.privateFixedIncomeService.getProduct()).pipe(
      tap((product: InvestmentPrivateFixedIncome) => {
        console.log('produto', product);
        this.product = {
          id: product.name,
          label: product.name,
          module: 'FIXED_INCOME',
          minimumInvestment: product.minimumInput,
          seller: product.bank,
          yield: product.yield,
          unitPrice: product.minimumInput,
          dueDate: product.due
        };
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribes.map(u => u.unsubscribe());
  }

  trade($event): any{
    const quotas = parseFloat($event.quota);
    const value = quotas * this.product.unitPrice;
    // Condições para realizar o trade
    if (!$event.quota || $event.quota <= 0){
      this.matSnackBar.open('Insira um número de cotas maior que zero', 'OK', { duration: 3000 });
      return;
    }
    if ($event.quota.includes(',')){
      this.matSnackBar.open('Use o ponto como separador decimal', 'OK', { duration: 3000 });
      return;
    }
    if (this.moduleId === 'VARIABLE_INCOME'  && parseFloat($event.quota) * 10 % 10 !== 0) {
      this.matSnackBar.open('Não é possível comprar cotas fracionadas', 'OK', { duration: 3000 });
      return;
    }
    if (value < this.product.minimumInvestment) {
      this.matSnackBar
        .open(`Não é possível investir um valor menor que o mínimo de R$ ${this.product.minimumInvestment}`,
          'OK',
          { duration: 3000 }
        );
      return;
    }
    if ($event.type === 'BUY' && this.balance < value){
      this.matSnackBar.open('Sem saldo disponível para investir', 'OK', {duration: 3000});
      return;
    } else if ($event.type === 'SELL' && this.quotasAvailableToSell < quotas){
      this.matSnackBar.open(`Só há ${this.quotasAvailableToSell} cotas disponíveis para venda`, 'OK', { duration: 3000 });
      return;
    }
    // Trade acontece se passar por todas as condições acima
    switch (this.moduleId) {
      case 'VARIABLE_INCOME':
        this.walletService.tradeStocks(this.productId, quotas, this.product.unitPrice, $event.type)
          .then(() => {
            this.matSnackBar.open('Operação realizada com sucesso', 'OK', { duration: 3000 });
          });
        break;
      case 'TREASURE':
        this.walletService.tradeTreasure($event.type, this.product.treasureData, quotas, this.productId)
          .then(() => {
            this.matSnackBar.open('Operação realizada com sucesso', 'OK', { duration: 3000 });
          });
        break; // ????
      case 'FIXED_INCOME':
        // TODO: aqui talvez tenha que alterar da onde vem o produto
        this.walletService.tradePrivateFixedIncomeProduct($event.type, this.privateFixedIncomeService.getProduct(), quotas)
          .then(() => {
            this.matSnackBar.open('Operação realizada com sucesso', 'OK', { duration: 3000 });
          });
        break; // ????
      default:
        console.log('erro');
    }
  }

  goBack(): void {
    const { module } = this.product;
    const moduleSlug = this.investmentWalletHelperService.getModuleSlugFromId(module);
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleSlug)]);
  }
}
