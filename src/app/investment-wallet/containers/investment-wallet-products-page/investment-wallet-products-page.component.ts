import { Component, OnDestroy, OnInit } from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  InvestmentModule,
  InvestmentProduct,
  InvestmentProductList,
  InvestmentWallet
} from '../../model/investment-wallet.model';
import { switchMap, tap } from 'rxjs/operators';
import { noop, Observable, of } from 'rxjs';
import { StocksService } from '../../../services/stocks.service';
import { WalletService } from '../../services/wallet.service';
import { InvestmentWalletHelperService } from '../../services/investment-wallet-helper.service';
import { TreasureService } from '../../../services/treasure.service';
import { PrivateFixedIncomeService } from '../../../services/private-fixed-income.service';

@Component({
  selector: 'investment-wallet-products-page',
  templateUrl: './investment-wallet-products-page.component.html',
  styleUrls: ['./investment-wallet-products-page.component.scss']
})
export class InvestmentWalletProductsPageComponent implements OnInit, OnDestroy {
  productList: InvestmentProductList;
  wallet: InvestmentWallet;
  myProducts: InvestmentProduct[] = [];
  loading = true;
  moduleId: InvestmentModule['moduleName'];
  subscribes = [];
  titleName = {
    VARIABLE_INCOME: 'Renda Variável',
    TREASURE: 'Tesouro Direto',
    FIXED_INCOME: 'Renda Fixa Privada',
    BALANCE: 'Caixa'
  };

  constructor(
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private stocksService: StocksService,
    private walletService: WalletService,
    private investmentWalletHelperService: InvestmentWalletHelperService,
    private treasureService: TreasureService,
    private  privateFixedIncomeService: PrivateFixedIncomeService
  ) {
  }

  ngOnInit(): void {
    this.moduleId = this.investmentWalletHelperService.getModuleIdFromSlug(this.route.snapshot.paramMap.get('moduleSlug'));
    const fetchPageInfo = this.walletService.fetchUserWallets().pipe(
      switchMap(wallets => {
        this.wallet = wallets[0];
        switch (this.moduleId) {
          case 'VARIABLE_INCOME':
            return this.fetchVariableIncome();
          case 'TREASURE':
            return this.fetchTreasure();
          case 'FIXED_INCOME':
            return this.fetchPrivateFixedIncome();
          default:
            return of(null);
        }
      }),
      tap(() => this.loading = false)
    ).subscribe(noop);
    this.subscribes.push(fetchPageInfo);
  }
  private fetchVariableIncome(): Observable<any> {
    return this.stocksService.fetchSheetStocks().pipe(
      tap((req) => {
        if (req !== null){
          this.productList = {
            stockList: req.data().stocks,
            type: this.moduleId
          };
          this.myProducts = this.investmentWalletHelperService.calculateProducts(this.wallet.stocksEvents, this.productList.stockList);
        }
      })
    );
  }
  private fetchTreasure(): Observable<any>{
    return this.treasureService.fetchAvailableTitles().pipe(
      tap((doc) => {
        Object.keys(doc.titles).forEach(key => {
          doc.titles[key].id = key;
        });
        this.productList = {
          treasureList: Object.values(doc.titles),
          type: this.moduleId
        };
        const treasureQuotas = this.investmentWalletHelperService.calculateTreasureQuotas(this.wallet.publicFixedIncomeEvents);
        Object.keys(treasureQuotas).forEach(key => {
          this.myProducts.push({
            id: doc.titles[key].tipoTitulo + ' ' +  doc.titles[key].vencimento.substr(0, 4),
            position: treasureQuotas[key] * doc.titles[key].puVendaManha,
            module: 'TREASURE'
          });
        });
      })
    );
  }
  private fetchPrivateFixedIncome(): Observable<any> {
    return this.privateFixedIncomeService.fetchPrivateFixedIncomeProducts().pipe(
      tap(query => {
        let array = [];
        query.forEach((doc) => {
          array = array.concat(doc.data().data);
        });
        this.productList = {
          privateFixedIncomeList: array,
          type: this.moduleId
        };
        const productDic =
          this.investmentWalletHelperService.getPrivateFixedIncomeProductsPosition(this.wallet.privateFixedIncomeEvents);
        Object.keys(productDic).forEach(productKey => {
          this.myProducts.push({
            id: productKey,
            module: 'FIXED_INCOME',
            position: productDic[productKey]
          });
        });
      })
    );
  }
  ngOnDestroy(): void{
    this.subscribes.map(u => u.unsubscribe());
  }

  goBack(): void {
    this.router.navigate([this.urlService.getInvestmentWallet()]);
  }
}
