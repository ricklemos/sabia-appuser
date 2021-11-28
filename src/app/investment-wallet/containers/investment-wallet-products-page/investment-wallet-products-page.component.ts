import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'investment-wallet-products-page',
  templateUrl: './investment-wallet-products-page.component.html',
  styleUrls: ['./investment-wallet-products-page.component.scss']
})
export class InvestmentWalletProductsPageComponent implements OnInit {

  constructor(
    private urlService: UrlService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate([this.urlService.getInvestmentWallet()]);
  }
}
