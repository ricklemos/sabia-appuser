import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { InvestmentProduct } from '../../model/investment-wallet.model';

@Component({
  selector: 'investment-wallet-fixed-income-prediction',
  templateUrl: './investment-wallet-fixed-income-prediction.component.html',
  styleUrls: ['../investment-wallet-buy-and-sell/investment-wallet-buy-and-sell.component.scss']
})
export class InvestmentWalletFixedIncomePredictionComponent implements OnInit, OnChanges {
  @Input() product: InvestmentProduct;
  @Input() quota: number;
  calculatedYield: number;

  dates = [];
  lineChartData = [
    { data: [], label: 'Produto' },
    { data: [], label: 'CDI' },
  ];
  lineChartLabels = [];
  lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        display: false,
        gridLines: {
          drawOnChartArea: false
        }
      }],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          gridLines: {
            drawOnChartArea: false
          }
        },
      ]
    },
  };
  lineChartColors: Color[] = [
    {
      borderColor: 'rgba(57,192,186,1)',
      backgroundColor: 'rgba(57,192,186,0.5)',
    },
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType: ChartType = 'line';

  constructor() {
  }

  ngOnInit(): void {
    this.calculatedYield = 1 + parseFloat(this.product.yield) / 100;
    const { dueDate } = this.product;
    const limit = this.stringToDate(dueDate);
    const initYear = new Date().getFullYear();
    this.dates = [];
    for (let i = initYear; i <= limit.getFullYear(); i++) {
      this.dates.push(i);
    }
    this.lineChartLabels = this.dates;
    this.setGraphValues();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setGraphValues();
  }

  setGraphValues(): void {
    const baseValue = this.quota * this.product.unitPrice;
    const prices = [];
    const CDI = [];
    this.dates.forEach((dt, index) => {
      prices.push((baseValue * this.calculatedYield ** (index)).toFixed(2));
      // Valor aproximado do CDI = 7.65%
      CDI.push((baseValue * 1.0765 ** (index)).toFixed(2));
    });
    this.lineChartData[0].data = prices;
    this.lineChartData[1].data = CDI;

  }

  /**
   * Turns a DD/MM/YYYY to a Date object
   * @param date
   * @private
   */
  private stringToDate(date: string): Date {
    const arr = date.split('/');
    return new Date(
      parseInt(arr[2], 10),
      parseInt(arr[1], 10),
      parseInt(arr[0], 10)
    );
  }

}
