import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { HomeModuleProgress } from '../../models/module';
import {StocksService} from '../../../services/stocks.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  loading = true;
  recentModules: HomeModuleProgress[] = [];
  startNowModules: HomeModuleProgress[] = [];
  startNowModule: HomeModuleProgress;
  unsubscribe = [];

  constructor(
    private homeService: HomeService,
    private stocksService: StocksService
  ) {
  }

  ngOnInit(): void {
    // TESTE DO STOCK SERVICE
    console.log('ENTROU NA HOME');
    this.stocksService.fetchStockStatusByTicker('ABEV3')
      .pipe(
        tap((json) => console.log(json))
      ).subscribe(noop);
    this.stocksService.fetchStockByTicker('ABEV3')
      .pipe(
        tap(doc => {
          console.log(doc);
        })
      )
      .subscribe(noop);
    const stockData = {
      ticker: 'ITSA4',
      companyName: 'Itausa',
      currentPrice: 10.65,
      timeSeriesDaily: {
        '2021-10-26': {
          open: 10.65,
          high: 10.65,
          low: 10.42,
          close: 10.47,
        },
        '2021-10-25': {
          open: 10.53,
          high: 10.76,
          low: 10.53,
          close: 10.67,
        },
        '2021-10-22': {
          open: 10.79,
          high: 10.79,
          low: 10.17,
          close: 10.53,
        }
      }
    };
    this.stocksService.updateStockByTicker('ITSA4', stockData).then((res) => console.log(res));
    const fetchModules = this.homeService.fetchModules().pipe(
      tap(query => {
        this.recentModules = query.filter(module => module.moduleProgressPercentage !== 0);
        this.startNowModules = query.filter(module => module.moduleProgressPercentage === 0);
        this.loading = false;
        if (this.startNowModules.length === 0) {
          this.startNowModule = this.recentModules[0];
        } else {
          this.startNowModule = this.startNowModules[0];
        }
      })
    ).subscribe(noop);
    this.unsubscribe.push(fetchModules);
  }
  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }
}
