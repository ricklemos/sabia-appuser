import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentProduct } from '../../model/investment-wallet.model';
import { InvestmentWalletMockService } from '../../services/investment-wallet-mock.service';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'investment-wallet-trade-page',
  templateUrl: './investment-wallet-trade-page.component.html',
  styleUrls: ['./investment-wallet-trade-page.component.scss']
})
export class InvestmentWalletTradePageComponent implements OnInit {
  product: InvestmentProduct;

  constructor(
    private route: ActivatedRoute,
    private investmentWalletMockService: InvestmentWalletMockService,
    private urlService: UrlService,
    private router: Router,
  ) {
    const productId = this.route.snapshot.paramMap.get('productId');
    this.product = this.investmentWalletMockService.getProduct(productId);
  }

  ngOnInit(): void {
  }

  goBack(): void {
    const { module } = this.product;
    this.router.navigate([this.urlService.getInvestmentWalletModule(module)]);
  }
}
