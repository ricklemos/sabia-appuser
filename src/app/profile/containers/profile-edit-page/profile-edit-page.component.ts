import { Component, OnInit } from '@angular/core';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.scss']
})
export class ProfileEditPageComponent implements OnInit {
  constructor(
    private urlService: UrlService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate([this.urlService.getProfileUrl()]);
  }

}
