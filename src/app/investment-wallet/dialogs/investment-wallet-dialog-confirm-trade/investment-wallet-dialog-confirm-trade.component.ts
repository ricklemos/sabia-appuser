import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'investment-wallet-dialog-confirm-trade',
  templateUrl: './investment-wallet-dialog-confirm-trade.component.html',
  styleUrls: ['./investment-wallet-dialog-confirm-trade.component.scss']
})
export class InvestmentWalletDialogConfirmTradeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: 'SELL' | 'BUY', quota: number },
    private matDialogRef: MatDialogRef<InvestmentWalletDialogConfirmTradeComponent>
  ) {
  }

  ngOnInit(): void {
  }

  onClose(confirmTrade = false): void {
    this.matDialogRef.close(confirmTrade);
  }

}
