import { Component, OnInit } from '@angular/core';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { UserFormPassword } from '../../models/sessions-forms';

@Component({
  selector: 'sessions-signup-password',
  templateUrl: './sessions-signup-password.component.html',
  styleUrls: ['../../../../assets/styles/sessions.style.scss']
})
export class SessionsSignupPasswordComponent implements OnInit {

  formConfig = UserFormPassword;
  formValid = false;
  password: string;
  loading = false;

  constructor(
    private sessionsSignupService: SessionsSignupService,
  ) {
  }

  ngOnInit(): void {
  }

  isValid(event): void {
    this.formValid = event;
  }

  changes(value): void {
    this.password = value.password;
  }

  createUser(): void {
    if (this.formValid) {
      this.loading = true;
      this.sessionsSignupService.createUser(this.password);
    }
  }
}
