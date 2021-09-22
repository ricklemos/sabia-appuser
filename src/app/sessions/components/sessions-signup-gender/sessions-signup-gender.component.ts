import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { UserFormGender } from '../../models/sessions-forms';

@Component({
  selector: 'sessions-signup-gender',
  templateUrl: './sessions-signup-gender.component.html',
  styleUrls: ['./sessions-signup-gender.component.scss', '../../../../assets/styles/sessions.style.scss']
})
export class SessionsSignupGenderComponent implements OnInit {
  formControl: FormControl;
  formGroup: FormGroup;

  formConfig = UserFormGender;
  formValid = false;
  gender: string;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private sessionsSignupService: SessionsSignupService,
  ) {
    this.formGroup = formBuilder.group({ gender: ['', Validators.required] });
  }

  ngOnInit(): void {
  }

  isValid(event): void {
    this.formValid = event;
  }

  changes(value): void {
    this.gender = value.gender[0].value;
  }

  submitGender(): void {
    if (this.formValid) {
      this.loading = true;
      this.sessionsSignupService.gender = this.gender;
      this.sessionsSignupService.nextStep('PASSWORD');
    }
  }

}
