import {Component, Input, OnInit} from '@angular/core';
import {InvestmentProduct} from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-myproducts-card',
  templateUrl: './investment-wallet-myproducts-card.component.html',
  styleUrls: ['./investment-wallet-myproducts-card.component.scss']
})
export class InvestmentWalletMyproductsCardComponent implements OnInit {
  @Input() products: InvestmentProduct[] = [];
  total = 0;
  constructor() { }

  ngOnInit(): void {
    this.products.forEach(product => this.total += product.position);
  }

}
