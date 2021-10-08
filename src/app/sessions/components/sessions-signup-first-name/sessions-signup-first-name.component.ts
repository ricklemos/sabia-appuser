import { Component, OnInit } from '@angular/core';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { UserFormFirstName } from '../../models/sessions-forms';

@Component({
  selector: 'sessions-signup-first-name',
  templateUrl: './sessions-signup-first-name.component.html',
  styleUrls: ['../../../../assets/styles/sessions.style.scss']
})
export class SessionsSignupFirstNameComponent implements OnInit {

  formConfig = UserFormFirstName;
  formValid = false;
  firstName: string;
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
    this.firstName = value.firstName;
  }

  submitFirstName(): void {
    if (this.formValid) {
      this.loading = true;
      this.sessionsSignupService.firstName = this.firstName;
      this.sessionsSignupService.nextStep('LAST_NAME');
    }
  }

}
