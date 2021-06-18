import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { FormControl, Validators } from '@angular/forms';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionsInvalidEmailDialogComponent } from '../sessions-invalid-email-dialog/sessions-invalid-email-dialog.component';

@Component({
  selector: 'sessions-login',
  templateUrl: './sessions-login.component.html',
  styleUrls: ['./sessions-login.component.scss']
})
export class SessionsLoginComponent implements OnInit, OnDestroy {

  unsubscriptions = [];
  email = new FormControl('', [Validators.required]);
  formControl: FormControl;
  emailInvalid: boolean;

  constructor(
    private loginService: SessionsLoginService,
    private sessionsLoginService: SessionsLoginService,
    private router: Router,
    private urlService: UrlService,
    private matDialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.emailInvalid = true;
    const listenEmail = this.email.valueChanges.pipe(
      tap(email => {
        this.emailInvalid = !this.email.valid;
      })
    ).subscribe(noop);
    this.unsubscriptions.push(listenEmail);
  }

  ngOnDestroy(): void {
    this.unsubscriptions.map(u => u.unsubscribe());
  }

  verifyEmail(): void {
    const fetchUsers = this.loginService.verifyEmail(this.email.value, 'users').pipe(
      tap(userArray => {
        const user = userArray[0];
        if (user && user.firstLogin) {
          this.sessionsLoginService.setEmail(this.email.value);
          this.sessionsLoginService.nextStep('PASSWORD');
        } else if (user) {
          // vai pro primeiro login (cadastro)
          const url = this.urlService.getSignUpUrl();
          this.router.navigate([url]);
        } else {
          // emite dialog de erro
          this.matDialog.open(SessionsInvalidEmailDialogComponent);
        }
      })
    ).subscribe(noop);
    this.unsubscriptions.push(fetchUsers);
  }
}
