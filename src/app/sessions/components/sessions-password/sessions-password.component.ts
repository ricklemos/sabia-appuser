import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserFormPassword } from '../../models/sessions-forms';

@Component({
  selector: 'sessions-password',
  templateUrl: './sessions-password.component.html',
  styleUrls: ['./sessions-password.component.scss', '../../../../assets/styles/sessions.style.scss']
})
export class SessionsPasswordComponent implements OnInit {
  autoLogin = new FormControl(true);
  forgotPasswordClicked = false;

  formConfig = UserFormPassword;
  formValid = false;
  userPassword: string;
  loading = false;

  constructor(
    private sessionsLoginService: SessionsLoginService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
  }

  isValid(event): void {
    this.formValid = event;
  }

  changes(value): void {
    this.userPassword = value.password;
  }

  changeEmailForLogin(): void {
    this.sessionsLoginService.nextStep('EMAIL');
  }

  setPasswordAndSignIn(): void {
    this.loading = true;
    this.sessionsLoginService.setPassword(this.userPassword);
    this.sessionsLoginService.signIn(this.autoLogin.value);
    this.loading = false;
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
