import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InvestmentWalletDialogService } from '../../services/investment-wallet-dialog.service';

@Component({
  selector: 'investiment-wallet-buy-and-sell',
  templateUrl: './investment-wallet-buy-and-sell.component.html',
  styleUrls: ['./investment-wallet-buy-and-sell.component.scss']
})
export class InvestmentWalletBuyAndSellComponent implements OnInit {

  @Input() price: number;
  result: number;
  quota: number;
  @Output() transactionRequired = new EventEmitter<any>();

  formConfig;

  constructor(
    private investmentWalletDialogService: InvestmentWalletDialogService
  ) {
    this.setForm();
    this.result = 0;
  }

  ngOnInit(): void {
  }

  changes($event: any): void {
    this.quota = $event.cotas;
    this.result = this.price * this.quota;
  }

  trade(type: 'SELL' | 'BUY'): void {
    const tradeInfo = { type, quota: this.quota };
    if (!this.quota) {
      this.transactionRequired.emit(tradeInfo);
    } else {
      const confirmDialog = this.investmentWalletDialogService.openConfirmTradeDialog(tradeInfo);
      confirmDialog.afterClosed().subscribe(response => {
        if (response) {
          this.transactionRequired.emit(tradeInfo);
        }
      });
    }
  }

  private setForm(): void {
    this.formConfig = [{
      type: 'input',
      inputType: 'number',
      label: 'Cotas',
      placeholder: '0',
      name: 'cotas',
      hint: 'Número de cotas a comprar ou vender',
    }];
  }
}
