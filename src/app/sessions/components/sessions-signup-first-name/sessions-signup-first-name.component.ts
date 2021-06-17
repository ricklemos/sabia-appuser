import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionsSignupService } from '../../services/sessions-signup.service';

@Component({
  selector: 'sessions-signup-first-name',
  templateUrl: './sessions-signup-first-name.component.html',
  styleUrls: ['./sessions-signup-first-name.component.scss']
})
export class SessionsSignupFirstNameComponent implements OnInit {
  firstNameForm = new FormControl('', [Validators.required, Validators.minLength(2)]);
  formControl: FormControl;

  constructor(
    private sessionsSignupService: SessionsSignupService,
  ) { }

  ngOnInit(): void {
  }

  submitFirstName(): void {
    if (!this.firstNameForm.invalid) {
      this.sessionsSignupService.firstName = this.firstNameForm.value;
      this.sessionsSignupService.nextStep('LAST_NAME');
    }
  }

}
