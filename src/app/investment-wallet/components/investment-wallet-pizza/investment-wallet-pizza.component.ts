import { Component, Input, OnInit } from '@angular/core';
import { InvestmentWalletPizzaGraph } from '../../model/investment-wallet.model';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'investment-wallet-pizza',
  templateUrl: './investment-wallet-pizza.component.html',
  styleUrls: ['./investment-wallet-pizza.component.scss']
})
export class InvestmentWalletPizzaComponent implements OnInit {

  @Input() data: InvestmentWalletPizzaGraph;
  pieChartData = [];
  pieChartLabels = [
    'Renda Fixa',
    'Tesouro Direto',
    'Renda Variável',
    'Saldo'
  ];
  pieChartType: ChartType;
  pieChartColors: Color[];
  pieChartOptions: ChartOptions;

  constructor() {
  }

  ngOnInit(): void {

    this.pieChartData.push(this.data.fixedIncome);
    this.pieChartData.push(this.data.treasure);
    this.pieChartData.push(this.data.variableIncome);
    this.pieChartData.push(this.data.balance);

    this.pieChartType = 'pie';
    this.pieChartColors = [
      {
        backgroundColor: ['rgba(255,255,255,1)', 'rgba(43,139,135,1)', 'rgba(57,192,186,1)', 'rgba(200,234,232,1)'],
        borderColor: 'rgba(0,0,0,1)'
      }
    ];
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false

    };
  }

}
