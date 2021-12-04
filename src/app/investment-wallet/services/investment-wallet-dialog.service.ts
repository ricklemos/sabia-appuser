import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InvestmentWalletDialogConfirmTradeComponent } from '../dialogs/investment-wallet-dialog-confirm-trade/investment-wallet-dialog-confirm-trade.component';

@Injectable({
  providedIn: 'root'
})
export class InvestmentWalletDialogService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  openConfirmTradeDialog(tradeInfo): MatDialogRef<any> {
    return this.dialog.open(InvestmentWalletDialogConfirmTradeComponent, {
      data: tradeInfo
    });
  }
}
