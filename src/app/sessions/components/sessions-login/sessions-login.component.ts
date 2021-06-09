import { Component, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { FormControl } from '@angular/forms';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sessions-login',
  templateUrl: './sessions-login.component.html',
  styleUrls: ['./sessions-login.component.scss']
})
export class SessionsLoginComponent implements OnInit {

  email = new FormControl('');
  password: string;
  formControl: FormControl;

  constructor(
    private loginService: SessionsLoginService,
  ) { }

  ngOnInit(): void {
  }
  verifyEmail(): void {
    console.log('email: ', this.email.value);
    this.loginService.verifyEmail(this.email.value).pipe(
      tap(response => {
        console.log(response);
      })
    ).subscribe(noop);
    //this.loginService.verifyEmail(this.email.value).subscribe(queriedItems => console.log(queriedItems));
  }
}
