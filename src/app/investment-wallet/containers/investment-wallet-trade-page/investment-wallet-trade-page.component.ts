import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentProduct } from '../../model/investment-wallet.model';
import { InvestmentWalletMockService } from '../../services/investment-wallet-mock.service';
import { UrlService } from '../../../services/url.service';
import {StocksService} from '../../../services/stocks.service';
import {noop, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

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

  constructor(
    private route: ActivatedRoute,
    private investmentWalletMockService: InvestmentWalletMockService,
    private urlService: UrlService,
    private router: Router,
    private stocksService: StocksService,
  ) {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.moduleId = this.route.snapshot.paramMap.get('moduleId');
    const fetchStockInfo = this.stocksService.fetchSheetStocks().pipe(
      tap(req => {
        const data = req.data();
        const [obj] = data.stocks.filter(stock => stock.ticker === this.productId);
        this.product = {
          id: this.productId,
          module: 'VARIABLE_INCOME',
          variableIncomeData: obj
        };
        this.loading = false;
      })
    ).subscribe(noop);
    this.subscribes.push(fetchStockInfo);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscribes.map(u => u.unsubscribe());
  }

  goBack(): void {
    const { module } = this.product;
    this.router.navigate([this.urlService.getInvestmentWalletModule(module)]);
  }
}
