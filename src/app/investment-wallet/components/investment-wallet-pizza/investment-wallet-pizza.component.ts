import { Component, Input, OnInit } from '@angular/core';
import { InvestmentWalletPizzaGraphProduct } from '../../model/investment-wallet.model';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'investment-wallet-pizza',
  templateUrl: './investment-wallet-pizza.component.html',
  styleUrls: ['./investment-wallet-pizza.component.scss']
})
export class InvestmentWalletPizzaComponent implements OnInit {

  @Input() data: InvestmentWalletPizzaGraphProduct[];
  pieChartData = [];
  pieChartLabels = [];
  pieChartType: ChartType;
  pieChartColors: Color[];
  pieChartOptions: ChartOptions;
  colorArray: string[] = [];

  constructor() {
  }

  ngOnInit(): void {

    this.pieChartType = 'pie';
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right'
      }
    };
    this.data.map((product) => {
      this.pieChartLabels.push(product.name);
      this.pieChartData.push(product.balance);
      this.colorArray.push(product.color);
    });
    this.pieChartColors = [
      {
        // backgroundColor: ['rgba(43,139,135,1)', 'rgba(57,192,186,1)', 'rgba(200,234,232,1)', 'rgba(255,255,255,1)'],
        backgroundColor: this.colorArray,
        borderColor: 'rgba(0,0,0,1)'
      }
    ];
  }

}
