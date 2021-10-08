import { Component, Input, OnInit } from '@angular/core';
import { CoursesModuleProgress } from '../../models/moduleProgress';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'courses-module-box',
  templateUrl: './courses-module-box.component.html',
  styleUrls: ['./courses-module-box.component.scss']
})
export class CoursesModuleBoxComponent implements OnInit {

  @Input() moduleProgress: CoursesModuleProgress;

  pieChartData: number[];
  pieChartType: ChartType;
  pieChartColors: Color[];
  pieChartOptions: ChartOptions;
  pieChartLegend: boolean;

  constructor(
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    this.pieChartData = [this.moduleProgress.moduleProgressPercentage, 100 - this.moduleProgress.moduleProgressPercentage];
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
    this.router.navigate([this.urlService.getModule(this.moduleProgress.moduleId)]);
  }

}
