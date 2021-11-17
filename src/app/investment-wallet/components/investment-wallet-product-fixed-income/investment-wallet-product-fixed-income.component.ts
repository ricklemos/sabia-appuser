import { Component, Input, OnInit } from '@angular/core';
import { InvestmentProduct } from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-product-fixed-income',
  templateUrl: './investment-wallet-product-fixed-income.component.html',
  styleUrls: ['./investment-wallet-product-fixed-income.component.scss']
})
export class InvestmentWalletProductFixedIncomeComponent implements OnInit {
  @Input() product: InvestmentProduct;

  constructor() {
  }

  ngOnInit(): void {
  }

}
