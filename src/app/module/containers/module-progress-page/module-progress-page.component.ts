import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'module-progress-page',
  templateUrl: './module-progress-page.component.html',
  styleUrls: ['./module-progress-page.component.scss']
})
export class ModuleProgressPageComponent implements OnInit {

  constructor(
    private router: Router,
    private urlService: UrlService
  ) { }

  ngOnInit(): void {
  }


  goBack(): void {
    this.router.navigate([this.urlService.getHome()]);
  }
}
