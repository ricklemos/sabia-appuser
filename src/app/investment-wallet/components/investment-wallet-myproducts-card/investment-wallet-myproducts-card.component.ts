import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'investment-wallet-myproducts-card',
  templateUrl: './investment-wallet-myproducts-card.component.html',
  styleUrls: ['./investment-wallet-myproducts-card.component.scss']
})
export class InvestmentWalletMyproductsCardComponent implements OnInit {
  @Input() products;
  // products = [
  //   {
  //     ticker: 'ITSA4',
  //     position: 1000,
  //   },
  //   {
  //     ticker: 'ABEV3',
  //     position: 1000,
  //   },
  //   {
  //     ticker: 'ARML3',
  //     position: 1000,
  //   }
  // ];
  total = 0;
  constructor() { }

  ngOnInit(): void {
    this.products.forEach(product => this.total += product.position);
  }

}
