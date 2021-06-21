import { Component, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sessions-logged-page',
  templateUrl: './sessions-logged-page.component.html',
  styleUrls: ['./sessions-logged-page.component.scss']
})
export class SessionsLoggedPageComponent implements OnInit {

  firstName: string;

  constructor(
    private sessionsLoginService: SessionsLoginService,
    private urlService: UrlService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sessionsLoginService.fetchUserData().pipe(
      take(1),
      tap(data => this.firstName = data.firstName)
    ).subscribe(noop);
  }

  goProfilePage(): void {
    const url = this.urlService.getProfileUrl();
    this.router.navigate([url]);
  }

}
