import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sessions-login-page',
  templateUrl: './sessions-login-page.component.html',
  styleUrls: ['../../../../assets/styles/sessions.style.scss']
})
export class SessionsLoginPageComponent implements OnInit, OnDestroy {

  showPage;
  subscriptions = [];

  constructor(
    private sessionsLoginService: SessionsLoginService
  ) {
    const subNextStep = this.sessionsLoginService.getStep().subscribe(response => {
      const { step: nextStep } = response;
      this.showPage = nextStep;
    });
    this.subscriptions.push(subNextStep);
    this.sessionsLoginService.nextStep('EMAIL');
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
  }
}
