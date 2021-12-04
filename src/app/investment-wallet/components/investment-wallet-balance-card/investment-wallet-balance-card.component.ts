import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'investment-wallet-balance-card',
  templateUrl: './investment-wallet-balance-card.component.html',
  styleUrls: ['../investment-wallet-investment-module/investment-wallet-investment-module.component.scss']
})
export class InvestmentWalletBalanceCardComponent implements OnInit {
  @Input() balance: number;
  @Input() invested: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
