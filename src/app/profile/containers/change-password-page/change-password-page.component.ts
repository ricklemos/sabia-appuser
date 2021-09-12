import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss']
})
export class ChangePasswordPageComponent implements OnInit {

  constructor(
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate([this.urlService.getProfileUrl()]);
  }
}
