import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionsLoginPageComponent } from '../../containers/sessions-login-page/sessions-login-page.component';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'sessions-password',
  templateUrl: './sessions-password.component.html',
  styleUrls: ['./sessions-password.component.scss']
})
export class SessionsPasswordComponent implements OnInit, OnDestroy {
  unsubscriptions = [];
  password = new FormControl('', [Validators.required, Validators.minLength(3)]);
  autoLogin = new FormControl(true);
  passwordIncomplete = true;
  forgotPasswordClicked = false;

  constructor(
    private sessionsLoginService: SessionsLoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const listenPassword = this.password.valueChanges.pipe(
      tap(password => {
        this.passwordIncomplete = !this.password.valid;
      })
    )
      .subscribe(noop);
    this.unsubscriptions.push(listenPassword);
  }

  ngOnDestroy(): void {
    this.unsubscriptions.map(u => u.unsubscribe());
  }

  changeEmailForLogin(): void {
    this.sessionsLoginService.nextStep('EMAIL');
  }

  setPasswordAndSignIn(): void {
    this.sessionsLoginService.setPassword(this.password.value);
    this.sessionsLoginService.signIn(this.autoLogin.value);
  }

  forgotPassword(): void {
    if (this.forgotPasswordClicked === true) {
      this.snackBar.open('Recuperação de senha já foi enviada', 'OK', { duration: 5000 });
      return;
    }
    this.forgotPasswordClicked = true;
    const email = this.sessionsLoginService.getEmail();
    this.sessionsLoginService.forgotPassword(email)
      .then(() => {
        this.snackBar.open('Recuperação de senha enviada', 'OK', { duration: 5000 });
      })
      .catch(() => {
        this.snackBar.open('Problema no envio de recuperação de senha', 'OK', { duration: 5000 });
        this.forgotPasswordClicked = false;
      });
  }
}
