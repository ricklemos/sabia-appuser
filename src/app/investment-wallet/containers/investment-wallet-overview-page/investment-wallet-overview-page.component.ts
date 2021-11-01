import { Component, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';

@Component({
  selector: 'investment-wallet-overview-page',
  templateUrl: './investment-wallet-overview-page.component.html',
  styleUrls: ['./investment-wallet-overview-page.component.scss']
})
export class InvestmentWalletOverviewPageComponent implements OnInit {

  constructor(
    private walletService: WalletService
  ) {
  }

  ngOnInit(): void {
  }
}
