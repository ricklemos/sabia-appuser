import {Component, Input, OnInit} from '@angular/core';
import {InvestmentProduct} from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-product-private-fixed-income',
  templateUrl: './investment-wallet-product-private-fixed-income.component.html',
  styleUrls: ['./investment-wallet-product-private-fixed-income.component.scss']
})
export class InvestmentWalletProductPrivateFixedIncomeComponent implements OnInit {
  @Input() product: InvestmentProduct;

  constructor() { }

  ngOnInit(): void {
  }

}
