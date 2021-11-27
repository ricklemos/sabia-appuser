import { Component, OnInit } from '@angular/core';
import {InvestmentStock} from '../../model/investment-wallet.model';
import { UrlService } from '../../../services/url.service';
import {StocksService} from '../../../services/stocks.service';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'investment-wallet-product-list',
  templateUrl: './investment-wallet-product-list.component.html',
  styleUrls: ['./investment-wallet-product-list.component.scss']
})
export class InvestmentWalletProductListComponent implements OnInit {
  productList: InvestmentStock[];
  fullList: InvestmentStock[];

  constructor(
    private urlService: UrlService,
    private stocksService: StocksService
  ) {

  }

  ngOnInit(): void {
    this.stocksService.fetchSheetStocks().pipe(
     tap((req) => {
       this.fullList = req.data().stocks;
       this.productList = this.fullList;
     })
    ).subscribe(noop);
  }

  getStockUrl(stock: InvestmentStock): string {
    return this.urlService.getInvestmentWalletProductDetails('VARIABLE_INCOME', stock.ticker);
  }

  getChanges($event: string): void {
    console.log($event);
    if ($event === ''){
      this.productList = this.fullList;
      return;
    }
    const textToSearch = $event.toUpperCase();
    this.productList = this.fullList.filter(
      stock => stock.ticker.includes(textToSearch) || stock.companyName.toUpperCase().includes(textToSearch)
    );
  }
}
