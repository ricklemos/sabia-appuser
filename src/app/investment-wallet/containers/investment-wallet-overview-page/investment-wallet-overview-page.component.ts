import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { InvestmentWalletPizzaGraph } from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-overview-page',
  templateUrl: './investment-wallet-overview-page.component.html',
  styleUrls: ['./investment-wallet-overview-page.component.scss']
})
export class InvestmentWalletOverviewPageComponent implements OnInit {

  data: InvestmentWalletPizzaGraph = {
    fixedIncome: 10,
    variableIncome: 20,
    treasure: 30,
    balance: 40,
  };

  constructor(
    private walletService: WalletService
  ) {
  }

  ngOnInit(): void {
  }
}
