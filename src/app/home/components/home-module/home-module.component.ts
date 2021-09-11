import { Component, Input, OnInit } from '@angular/core';
import { HomeModuleProgress } from '../../models/module';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home-module',
  templateUrl: './home-module.component.html',
  styleUrls: ['./home-module.component.scss']
})
export class HomeModuleComponent implements OnInit {

  @Input() module : HomeModuleProgress

  constructor(
    private urlService: UrlService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToModule(): void {
    this.router.navigate([this.urlService.getModule(this.module.moduleId)]);
  }


}
