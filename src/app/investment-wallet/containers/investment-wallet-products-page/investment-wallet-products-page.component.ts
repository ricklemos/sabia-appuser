import {Component, OnDestroy, OnInit} from '@angular/core';
import { UrlService } from '../../../services/url.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  InvestmentModule,
  InvestmentProduct,
  InvestmentStock,
  InvestmentWallet
} from '../../model/investment-wallet.model';
import {switchMap, tap} from 'rxjs/operators';
import {noop, Observable, of} from 'rxjs';
import {StocksService} from '../../../services/stocks.service';
import {WalletService} from '../../services/wallet.service';
import {InvestmentWalletHelperService} from '../../services/investment-wallet-helper.service';

@Component({
  selector: 'investment-wallet-products-page',
  templateUrl: './investment-wallet-products-page.component.html',
  styleUrls: ['./investment-wallet-products-page.component.scss']
})
export class InvestmentWalletProductsPageComponent implements OnInit, OnDestroy {

  productList: InvestmentStock[];
  wallet: InvestmentWallet;
  products: InvestmentProduct[];
  loading = true;
  moduleId: InvestmentModule['moduleName'];
  subscribes = [];
  constructor(
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private stocksService: StocksService,
    private walletService: WalletService,
    private investmentWalletHelperService: InvestmentWalletHelperService
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
          this.productList = req.data().stocks;
          this.products = this.investmentWalletHelperService.calculateProducts(this.wallet.stocksEvents, this.productList);
        }
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
