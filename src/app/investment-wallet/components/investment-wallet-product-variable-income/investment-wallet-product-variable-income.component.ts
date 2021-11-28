import { Component, Input, OnInit } from '@angular/core';
import {InvestmentProduct, InvestmentStock} from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-product-variable-income',
  templateUrl: './investment-wallet-product-variable-income.component.html',
  styleUrls: ['./investment-wallet-product-variable-income.component.scss']
})
export class InvestmentWalletProductVariableIncomeComponent implements OnInit {
  @Input() product: InvestmentProduct;
  variableIncomeData: InvestmentStock;

  constructor() {
  }

  ngOnInit(): void {
    this.variableIncomeData = this.product.variableIncomeData;
  }
}
