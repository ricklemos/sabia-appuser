import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SessionsSignupService } from '../../services/sessions-signup.service';

@Component({
  selector: 'sessions-signup-gender',
  templateUrl: './sessions-signup-gender.component.html',
  styleUrls: ['./sessions-signup-gender.component.scss']
})
export class SessionsSignupGenderComponent implements OnInit {
  formControl: FormControl;
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sessionsSignupService: SessionsSignupService,
  ) {
    this.formGroup = formBuilder.group({gender: ['', Validators.required]});
  }

  ngOnInit(): void {
  }

  submitGender(): void {
    if (!this.formGroup.invalid) {
      const { gender } = this.formGroup.value;
      this.sessionsSignupService.gender = gender;
      this.sessionsSignupService.nextStep('PASSWORD');
    }
  }

}
