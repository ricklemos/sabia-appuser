import {Component, Input, OnInit} from '@angular/core';
import {Color} from 'ng2-charts';
import {StocksService} from '../../../services/stocks.service';
import {noop} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'investment-wallet-series-graph',
  templateUrl: './investment-wallet-series-graph.component.html',
  styleUrls: ['./investment-wallet-series-graph.component.scss']
})
export class InvestmentWalletSeriesGraphComponent implements OnInit {
  @Input() ticker: string;
  dates = [];
  prices = [];
  lineChartData = [
    { data: [], label: '' },
    // { data: [], label: '' , yAxisID: 'y-axis-1'},
  ];
  lineChartLabels = [];
  lineChartOptions = {
    responsive: true,
    // borderJoinStyle: 'bevel',
    // borderCapStyle: 'square',
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
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     drawOnChartArea: false
        //   },
        //   ticks: {
        //     fontColor: 'red',
        //   }
        // }
      ]
    }
  };
  lineChartColors: Color[] = [
    {
      // borderColor: '#2E3037',
      borderColor: 'rgba(57,192,186,1)',
      backgroundColor: 'rgba(57,192,186,0.5)',
      // pointBorderColor: 'rgba(0,0,0,0)',
      // pointBackgroundColor: 'rgba(0,0,0,0)'
    },
  ];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';
  chipConfig = [
    {
      type: 'chip',
      name: 'options',
      inputType: 'radio',
      value: 7,
      disabled: false,
      onColor: 'rgba(57,192,186,1)',
      bgColor: 'rgba(57,192,186,1)',
      options: [
        {
          label: 'Semana',
          value: 7,
        },
        {
          label: 'Mês',
          value: 30,
        },
        {
          label: 'Semestre',
          value: 180,
        },
      ],
    }
  ];
  constructor(
    private stocksService: StocksService
  ) { }

  ngOnInit(): void {
    this.lineChartData[0].label = this.ticker;
    this.stocksService.fetchStockHistoryByTicker(this.ticker).pipe(
      tap(stock => {
        const stockHistory = stock['Time Series (Daily)'];
        Object.keys(stockHistory).forEach(date => {
          this.dates.push(date);
          this.prices.push(stockHistory[date]['4. close']);
        });
        this.adjustGraphData(7);
      })
    ).subscribe(noop);
  }
  private adjustGraphData(daysAgo: number): void {
    this.lineChartLabels = this.dates.slice(0, daysAgo).reverse();
    this.lineChartData[0].data = this.prices.slice(0, daysAgo).reverse();
  }

  changePeriod($event): void{
    this.adjustGraphData($event.options);
  }

}