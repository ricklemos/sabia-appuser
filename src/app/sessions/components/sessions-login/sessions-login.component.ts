import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { FormControl, Validators } from '@angular/forms';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionsLoginPageComponent } from '../../containers/sessions-login-page/sessions-login-page.component';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionsInvalidEmailDialogComponent } from '../sessions-invalid-email-dialog/sessions-invalid-email-dialog.component';

@Component({
  selector: 'sessions-login',
  templateUrl: './sessions-login.component.html',
  styleUrls: ['./sessions-login.component.scss']
})
export class SessionsLoginComponent implements OnInit, OnDestroy {

  unsubscriptions = [];
  email = new FormControl('', [Validators.required]);
  password: string;
  formControl: FormControl;
  userData;
  emailInvalid: boolean;

  constructor(
    private loginService: SessionsLoginService,
    private sessionsLoginPage: SessionsLoginPageComponent,
    private sessionsLoginService: SessionsLoginService,
    private router: Router,
    private urlService: UrlService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('firebaseJWT')) {
      const token = JSON.parse(localStorage.getItem('firebaseJWT'));
      this.router.navigate([this.urlService.getHomeUrl()]);
    }
    this.emailInvalid = true;
    const listenEmail = this.email.valueChanges.pipe(
      tap(email => {
        this.emailInvalid = !this.email.valid;
      })
    ).subscribe(noop);
    this.unsubscriptions.push(listenEmail);
  }

  ngOnDestroy(): void {
    this.unsubscriptions.map(u => u.unsubscribe());
  }

  verifyEmail(): void {
    const fetchUsers = this.loginService.verifyEmail(this.email.value, 'users').pipe(
      tap(user => {
        [this.userData] = user;
        if (this.userData && this.userData.firstLogin) {
          this.sessionsLoginService.setEmail(this.email.value);
          this.sessionsLoginPage.setShowInputPassword(true);
        } else if (this.userData) {
          // vai pro primeiro login (cadastro)
          // TODO: mandar usuário para o fluxo de cadastro
        } else {
          // emite mensagem de erro
          this.matDialog.open(SessionsInvalidEmailDialogComponent);
        }
      })
    ).subscribe(noop);
    this.unsubscriptions.push(fetchUsers);
  }
}
