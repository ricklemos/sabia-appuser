import { Component, Input, OnInit } from '@angular/core';
import { HomeModuleProgress } from '../../models/module';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['./home-module.component.scss']
})
export class HomeModuleComponent implements OnInit {

  @Input() module: HomeModuleProgress;

  pieChartData: number[];
  pieChartType: ChartType;
  pieChartColors: Color[];
  pieChartOptions: ChartOptions;
  pieChartLegend: boolean;

  constructor(
    private urlService: UrlService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.pieChartData = [this.module.moduleProgressPercentage, 100 - this.module.moduleProgressPercentage];
    this.pieChartType = 'pie';
    this.pieChartColors = [
      {
        backgroundColor: ['rgba(57,192,186,1)', 'rgba(255,255,255,1)'],
        borderColor: 'rgba(0,0,0,1)'
      }
    ];
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
    this.pieChartLegend = false;
  }

  goToModule(): void {
    this.router.navigate([this.urlService.getModule(this.module.moduleId)]);
  }


}
