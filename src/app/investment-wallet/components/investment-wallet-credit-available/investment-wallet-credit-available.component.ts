import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'investment-wallet-credit-available',
  templateUrl: './investment-wallet-credit-available.component.html',
  styleUrls: ['./investment-wallet-credit-available.component.scss']
})
export class InvestmentWalletCreditAvailableComponent implements OnInit {
  @Input() availableToSell: number;
  @Input() balance: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
