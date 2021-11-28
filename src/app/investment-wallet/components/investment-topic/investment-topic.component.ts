import {Component, Input, OnInit} from '@angular/core';
import {InvestmentModule} from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-topic',
  templateUrl: './investment-topic.component.html',
  styleUrls: ['./investment-topic.component.scss']
})
export class InvestmentTopicComponent implements OnInit {
  @Input() investmentModule: InvestmentModule;

  constructor() {
  }

  ngOnInit(): void {
  }

}
