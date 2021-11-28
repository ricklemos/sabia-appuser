import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentProduct } from '../../model/investment-wallet.model';
import { InvestmentWalletMockService } from '../../services/investment-wallet-mock.service';
import { UrlService } from '../../../services/url.service';
import { StocksService } from '../../../services/stocks.service';
import { noop, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InvestmentWalletHelperService } from '../../services/investment-wallet-helper.service';

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
  // TODO: Pegar os dados do firebase
  balance = 3000;
  productBalance = 1000;

  constructor(
    private route: ActivatedRoute,
    private investmentWalletMockService: InvestmentWalletMockService,
    private urlService: UrlService,
    private router: Router,
    private stocksService: StocksService,
    private investmentWalletHelperService: InvestmentWalletHelperService,
  ) {
    this.productId = this.route.snapshot.paramMap.get('productId');
    this.moduleId = this.investmentWalletHelperService.getModuleIdFromSlug(this.route.snapshot.paramMap.get('moduleSlug'));
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

  trade($event): any{
    // TODO: Trade request for database + verifications (if there is balance to buy or sell)
    const value = $event.quota * this.product.variableIncomeData.currentPrice;
    if ($event.type === 'buy'){
      if (this.balance < value){
        // TODO: Show Dialog with not enough funds
        return;
      }
      // TODO: Buy Product
    } else if ($event.type === 'sell'){
      // TODO: se quer vender mais cotas do que tem disponível, não permitir
      // TODO: Sell Product
    }
    // TODO: No caso de renda variável barrar se o número de cotas não for inteiro
    console.log('trade', $event);
  }

  goBack(): void {
    const { module } = this.product;
    const moduleSlug = this.investmentWalletHelperService.getModuleSlugFromId(module);
    this.router.navigate([this.urlService.getInvestmentWalletModule(moduleSlug)]);
  }
}
