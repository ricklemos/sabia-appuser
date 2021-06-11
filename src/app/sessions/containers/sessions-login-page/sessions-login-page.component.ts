import { Component, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sessions-login-page',
  templateUrl: './sessions-login-page.component.html',
  styleUrls: ['./sessions-login-page.component.scss']
})
export class SessionsLoginPageComponent implements OnInit {

  showInputPassword = false;
  private userName: string;
  private email: string;
  private password: string;

  constructor(
    private sessionsLoginService: SessionsLoginService
  ) {
  }

  ngOnInit(): void {
  }

  setShowInputPassword(inputPasswordStatus: boolean): void {
    this.showInputPassword = inputPasswordStatus;
  }

  setUserName(userName: string): void {
    this.userName = userName;
  }

  getUserName(): string {
    return this.userName;
  }

  setEmail(email: string): void {
    this.email = email;
  }

  setPassword(password: string): void {
    this.password = password;
  }

  signIn(autoLogin?: boolean): void {
    this.sessionsLoginService.signIn(this.email, this.password, autoLogin);
  }
}
