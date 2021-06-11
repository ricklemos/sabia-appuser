import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { FormControl } from '@angular/forms';
import { noop, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { SessionsLoginPageComponent } from '../../containers/sessions-login-page/sessions-login-page.component';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'sessions-login',
  templateUrl: './sessions-login.component.html',
  styleUrls: ['./sessions-login.component.scss']
})
export class SessionsLoginComponent implements OnInit, OnDestroy {

  unsubscriptions = [];
  email = new FormControl('');
  password: string;
  formControl: FormControl;
  userData;

  constructor(
    private loginService: SessionsLoginService,
    private sessionsLoginPage: SessionsLoginPageComponent,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('firebaseJWT')) {
      const token = JSON.parse(localStorage.getItem('firebaseJWT'));
      this.router.navigate([this.urlService.getHomeUrl()]);
    }
  }

  ngOnDestroy(): void {
    this.unsubscriptions.map(u => u.unsubscribe());
  }

  verifyEmail(): void {
    const fetchUserData = this.loginService.verifyEmail(this.email.value, 'registeredUsers').pipe(
      switchMap(response => {
        [this.userData] = response;
        return this.fetchPendingUsers();
      }),
      tap((response2) => {
        if (response2 && response2.length > 0) {
          // TODO: mandar usuário para o fluxo de cadastro
        } else if (this.userData) {
          // Se o usuário já está cadastrado, pede-se a senha.
          // TODO: mandar usuário para digitar a senha
          this.sessionsLoginPage.setEmail(this.email.value);
          this.sessionsLoginPage.setShowInputPassword(true);
        } else {
          // TODO: mostrar aviso
        }
      })
    ).subscribe(noop);
    this.unsubscriptions.push(fetchUserData);
  }

  fetchPendingUsers(): Observable<any> {
    if (!this.userData) {
      return this.loginService.verifyEmail(this.email.value, 'pendingUsers');
    } else {
      return of(undefined);
    }
  }
}
