import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'credit-available',
  templateUrl: './credit-available.component.html',
  styleUrls: ['./credit-available.component.scss']
})
export class CreditAvailableComponent implements OnInit {
  @Input() availableToSell: number;
  @Input() balance: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
