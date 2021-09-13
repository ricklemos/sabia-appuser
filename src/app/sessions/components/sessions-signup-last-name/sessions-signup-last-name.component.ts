import { Component, OnInit } from '@angular/core';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { UserFormLastName } from '../../models/sessions-forms';

@Component({
  selector: 'sessions-signup-last-name',
  templateUrl: './sessions-signup-last-name.component.html',
  styleUrls: ['./sessions-signup-last-name.component.scss']
})
export class SessionsSignupLastNameComponent implements OnInit {

  formConfig = UserFormLastName;
  formValid = false;
  lastName: string;
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
    this.lastName = value.lastName;
  }

  submitLastName(): void {
    if (this.formValid) {
      this.loading = true;
      this.sessionsSignupService.lastName = this.lastName;
      this.sessionsSignupService.nextStep('GENDER');
    }
  }
}
