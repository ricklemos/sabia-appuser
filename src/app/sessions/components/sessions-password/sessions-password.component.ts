import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SessionsLoginPageComponent } from '../../containers/sessions-login-page/sessions-login-page.component';
import { SessionsLoginService } from '../../services/sessions-login.service';

@Component({
  selector: 'sessions-password',
  templateUrl: './sessions-password.component.html',
  styleUrls: ['./sessions-password.component.scss']
})
export class SessionsPasswordComponent implements OnInit {
  password = new FormControl('');
  autoLogin = new FormControl(false);

  constructor(
    private sessionsLoginPage: SessionsLoginPageComponent,
  ) { }

  ngOnInit(): void {
  }

  changeEmailForLogin(): void {
    this.sessionsLoginPage.setShowInputPassword(false);
  }

  setPasswordAndSignIn(): void {
    this.sessionsLoginPage.setPassword(this.password.value);
    this.sessionsLoginPage.signIn(this.autoLogin.value);
  }
}
