import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionsSignupService } from '../../services/sessions-signup.service';

@Component({
  selector: 'sessions-signup-password',
  templateUrl: './sessions-signup-password.component.html',
  styleUrls: ['./sessions-signup-password.component.scss']
})
export class SessionsSignupPasswordComponent implements OnInit {
  passwordForm = new FormControl('', [Validators.required, Validators.minLength(6)]);
  formControl: FormControl;

  constructor(
    private sessionsSignupService: SessionsSignupService,
  ) { }

  ngOnInit(): void {
  }

  createUser(): void {
    if (!this.passwordForm.invalid) {
      this.sessionsSignupService.createUser(this.passwordForm.value);
    }
  }
}
