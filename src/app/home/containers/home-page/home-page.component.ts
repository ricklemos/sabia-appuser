import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { HomeModuleProgress } from '../../models/module';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  loading: boolean = true;
  recentModules: HomeModuleProgress[] = [];
  startNowModules: HomeModuleProgress[] = [];
  startNowModule: HomeModuleProgress;
  unsubscribe = [];

  constructor(
    private homeService: HomeService
  ) {
  }

  ngOnInit(): void {
    const fetchModules = this.homeService.fetchModules().pipe(
      tap(query => {
        this.recentModules = query.filter(module => module.moduleProgressPercentage != 0);
        this.startNowModules = query.filter(module => module.moduleProgressPercentage == 0);
        this.loading = false;
        if (this.startNowModules.length == 0) {
          this.startNowModule = this.recentModules[0];
        } else {
          this.startNowModule = this.startNowModules[0];
        }
      })
    ).subscribe(noop);
    this.unsubscribe.push(fetchModules);
  }

  OnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }
}
