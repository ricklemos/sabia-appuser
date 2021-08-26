import { Component, Input, OnInit } from '@angular/core';
import { ModuleProgress } from '../../models/moduleProgress';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'courses-module-box',
  templateUrl: './courses-module-box.component.html',
  styleUrls: ['./courses-module-box.component.scss']
})
export class CoursesModuleBoxComponent implements OnInit {

  @Input() moduleProgress: ModuleProgress;

  constructor(
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
  }

  goToModule(): void {
    this.router.navigate([this.urlService.getModule(this.moduleProgress.moduleId)]);
  }

}
