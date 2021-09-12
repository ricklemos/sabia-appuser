import { Component, Input, OnInit } from '@angular/core';
import { HomeModuleProgress } from '../../models/module';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-start-now',
  templateUrl: './home-start-now.component.html',
  styleUrls: ['./home-start-now.component.scss']
})
export class HomeStartNowComponent implements OnInit {

  @Input() startNowModule: HomeModuleProgress;

  constructor(
    private urlService: UrlService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  goToModule(): void {
    this.router.navigate([this.urlService.getModule(this.startNowModule.moduleId)]);
  }

}
