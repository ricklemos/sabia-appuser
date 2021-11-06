import { Component, Input, OnInit } from '@angular/core';
import { InvestmentProduct } from '../../model/investment-wallet.model';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'investment-wallet-product-list',
  templateUrl: './investment-wallet-product-list.component.html',
  styleUrls: ['./investment-wallet-product-list.component.scss']
})
export class InvestmentWalletProductListComponent implements OnInit {
  @Input() productList: InvestmentProduct[];

  constructor(
    private urlService: UrlService,
  ) {

  }

  ngOnInit(): void {
  }

  getProductUrl(product: InvestmentProduct): string {
    return this.urlService.getInvestmentWalletProductDetails(product.module, product.id);
  }

}
