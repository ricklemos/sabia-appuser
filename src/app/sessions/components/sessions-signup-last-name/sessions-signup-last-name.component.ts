import { Component, OnInit } from '@angular/core';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sessions-signup-last-name',
  templateUrl: './sessions-signup-last-name.component.html',
  styleUrls: ['./sessions-signup-last-name.component.scss']
})
export class SessionsSignupLastNameComponent implements OnInit {
  lastNameForm = new FormControl('', [Validators.required, Validators.minLength(2)]);
  formControl: FormControl;

  constructor(
    private sessionsSignupService: SessionsSignupService,
  ) { }

  ngOnInit(): void {
  }

  submitLastName(): void {
    if (!this.lastNameForm.invalid) {
      this.sessionsSignupService.lastName = this.lastNameForm.value;
      this.sessionsSignupService.nextStep('GENDER');
    }
  }
}
