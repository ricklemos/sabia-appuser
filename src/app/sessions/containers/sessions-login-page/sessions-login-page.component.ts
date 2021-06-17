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
  constructor(
    private sessionsLoginService: SessionsLoginService
  ) {
  }

  ngOnInit(): void {
  }

  setShowInputPassword(inputPasswordStatus: boolean): void {
    this.showInputPassword = inputPasswordStatus;
  }
}
