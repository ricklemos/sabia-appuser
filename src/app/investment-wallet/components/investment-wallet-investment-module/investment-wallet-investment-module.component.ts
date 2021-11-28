import { Component, Input, OnInit } from '@angular/core';
import { InvestmentModule } from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-investment-module',
  templateUrl: './investment-wallet-investment-module.component.html',
  styleUrls: ['./investment-wallet-investment-module.component.scss']
})
export class InvestmentWalletInvestmentModuleComponent implements OnInit {
  @Input() investmentModule: InvestmentModule;

  constructor() {
  }

  ngOnInit(): void {
  }

}
