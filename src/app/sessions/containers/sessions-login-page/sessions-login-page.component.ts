import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { StorageService } from '../../../services/storage.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

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
    private sessionsLoginService: SessionsLoginService,
    private storageService: StorageService,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private urlService: UrlService
  ) {
    const subNextStep = this.sessionsLoginService.getStep().subscribe(response => {
      const { step: nextStep } = response;
      this.showPage = nextStep;
    });
    this.subscriptions.push(subNextStep);
    this.sessionsLoginService.nextStep('EMAIL');
  }

  ngOnInit(): void {
    this.angularFireAuth.authState.pipe(
      tap((user) => {
        if (user) {
          this.sessionsLoginService.setUser(user);
          this.router.navigate([this.urlService.getSessionsLogged()]);
        }
      })
    ).subscribe(noop);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
  }
}
