import { Component, Input, OnInit } from '@angular/core';
import { HomeModuleProgress } from '../../models/module';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'start-now',
  templateUrl: './start-now.component.html',
  styleUrls: ['./start-now.component.scss']
})
export class StartNowComponent implements OnInit {

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
