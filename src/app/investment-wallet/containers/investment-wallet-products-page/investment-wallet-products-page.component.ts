import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentProduct } from '../../model/investment-wallet.model';
import { InvestmentWalletMockService } from '../../services/investment-wallet-mock.service';

@Component({
  selector: 'investment-wallet-products-page',
  templateUrl: './investment-wallet-products-page.component.html',
  styleUrls: ['./investment-wallet-products-page.component.scss']
})
export class InvestmentWalletProductsPageComponent implements OnInit {
  productList: InvestmentProduct[];

  constructor(
    private route: ActivatedRoute,
    private investmentWalletMockService: InvestmentWalletMockService,
  ) {
    const moduleId = this.route.snapshot.paramMap.get('moduleId');
    this.productList = this.investmentWalletMockService.getProductList(moduleId);
  }

  ngOnInit(): void {
  }

}
