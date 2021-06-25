import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'sessions-signup-page',
  templateUrl: './sessions-signup-page.component.html',
  styleUrls: ['./sessions-signup-page.component.scss']
})
export class SessionsSignupPageComponent implements OnInit, OnDestroy {
  showPage: string;
  subscriptions = [];

  constructor(
    private sessionsSignupService: SessionsSignupService,
    private router: Router,
    private urlService: UrlService,
  ) {
    if (!this.sessionsSignupService.email) {
      const url = this.urlService.getLoginUrl();
      this.router.navigate([url]);
    }
    const subNextStep = this.sessionsSignupService.getNextStep().subscribe(response => {
      const { step: nextStep } = response;
      this.showPage = nextStep;
    });
    this.subscriptions.push(subNextStep);
    this.sessionsSignupService.nextStep('FIRST_NAME');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
  }

}
