import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';
import {InvestmentProduct, InvestmentStock, InvestmentWallet} from '../../model/investment-wallet.model';
import {switchMap, tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {StocksService} from '../../../services/stocks.service';
import {WalletService} from '../../services/wallet.service';
import {InvestmentWalletHelperService} from '../../services/investment-wallet-helper.service';

@Component({
  selector: 'investment-wallet-products-page',
  templateUrl: './investment-wallet-products-page.component.html',
  styleUrls: ['./investment-wallet-products-page.component.scss']
})
export class InvestmentWalletProductsPageComponent implements OnInit {

  productList: InvestmentStock[];
  wallet: InvestmentWallet;
  products: InvestmentProduct[];
  loading = true;
  constructor(
    private urlService: UrlService,
    private router: Router,
    private stocksService: StocksService,
    private walletService: WalletService,
    private investmentWalletHelperService: InvestmentWalletHelperService
  ) {
  }

  ngOnInit(): void {
    this.stocksService.fetchSheetStocks().pipe(
      switchMap((req) => {
        this.productList = req.data().stocks;
        return this.walletService.fetchUserWallets();
      }),
      tap(wallets => {
        this.wallet = wallets[0];
        this.products = this.investmentWalletHelperService.calculateProducts(this.wallet.stocksEvents, this.productList);
        this.loading = false;
      })
    ).subscribe(noop);
  }

  goBack(): void {
    this.router.navigate([this.urlService.getInvestmentWallet()]);
  }
}
