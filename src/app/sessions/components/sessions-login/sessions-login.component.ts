import { Component, OnDestroy, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { noop } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionsInvalidEmailDialogComponent } from '../sessions-invalid-email-dialog/sessions-invalid-email-dialog.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsSignupService } from '../../services/sessions-signup.service';
import { UserFormEmail } from '../../models/sessions-forms';

@Component({
  selector: 'sessions-login',
  templateUrl: './sessions-login.component.html',
  styleUrls: ['./sessions-login.component.scss']
})
export class SessionsLoginComponent implements OnInit, OnDestroy {

  unsubscriptions = [];
  formConfig = UserFormEmail;
  formValid = false;
  userEmail: string;
  loading = false;

  constructor(
    private loginService: SessionsLoginService,
    private sessionsLoginService: SessionsLoginService,
    private router: Router,
    private urlService: UrlService,
    private matDialog: MatDialog,
    private angularFirestore: AngularFirestore,
    private sessionsSignupService: SessionsSignupService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscriptions.map(u => u.unsubscribe());
  }

  isValid(event): void {
    this.formValid = event;
  }

  changes(value): void {
    this.userEmail = value.email;
  }

  verifyEmail(): void {
    if (this.formValid && !this.loading) {
      this.loading = true;
      const fetchUsers = this.loginService.verifyEmail(this.userEmail, 'users').pipe(
        tap(userArray => {
          const user = userArray[0];
          if (user && user.firstLogin) {
            this.sessionsLoginService.setEmail(this.userEmail);
            this.sessionsLoginService.nextStep('PASSWORD');
          } else if (user) {
            // vai pro primeiro login (cadastro)
            this.sessionsSignupService.email = this.userEmail;
            this.sessionsSignupService.isAdmin = user.isAdmin;
            this.sessionsSignupService.docId = user.docId;
            const url = this.urlService.getSignUpUrl();
            this.router.navigate([url]);
          } else {
            // emite dialog de erro
            this.loading = false;
            this.matDialog.open(SessionsInvalidEmailDialogComponent);
          }
        })
      ).subscribe(noop);
      this.unsubscriptions.push(fetchUsers);
    }
  }
}
