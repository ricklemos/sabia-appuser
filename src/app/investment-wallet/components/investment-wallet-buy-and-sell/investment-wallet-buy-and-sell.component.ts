import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'investiment-wallet-buy-and-sell',
  templateUrl: './investment-wallet-buy-and-sell.component.html',
  styleUrls: ['./investment-wallet-buy-and-sell.component.scss']
})
export class InvestmentWalletBuyAndSellComponent implements OnInit {

  @Input() stockPrice: number;
  result: number;
  quota: number;
  @Output() transactionRequired = new EventEmitter<any>();

  formConfig = [{
    type: 'input',
    inputType: 'tel',
    label: 'Cotas',
    placeholder: '0',
    name: 'cotas',
    value: '',
    hint: 'Número de cotas a comprar ou vender',
  }];

  constructor() {
    this.result = 0;
  }

  ngOnInit(): void {
  }
  changes($event: any): void {
    this.quota = $event.cotas;
    this.result = this.stockPrice * this.quota;
  }
  sell(): void {
    this.transactionRequired.emit({type: 'sell', quota: this.quota});
  }
  buy(): void {
    this.transactionRequired.emit({type: 'buy', quota: this.quota});
  }
}
