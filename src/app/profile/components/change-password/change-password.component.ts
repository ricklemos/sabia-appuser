import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ChangePasswordForm } from '../../models/profile-forms';
// TODO: Repensar forma de fazer o import do firebase, há mesmo necessidade?
import firebase from 'firebase/app';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm = ChangePasswordForm;
  user;
  unsubscribe = [];
  formValid = false;
  oldPassword: string;
  newPassword: string;
  repeatNewPassword: string;
  loading = false;
  eventValid = false;

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private formBuilder: FormBuilder,
    private sessionService: SessionsLoginService,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    const subFetchUser = this.sessionService.fetchAuthUser().pipe(
      tap(user => this.user = user)
    ).subscribe(noop);
    this.unsubscribe.push(subFetchUser);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }


  isValid(event): void {
    this.eventValid = event;
  }

  changes(value): void {
    this.oldPassword = value.oldPassword;
    this.newPassword = value.newPassword;
    this.repeatNewPassword = value.repeatNewPassword;
    if (this.newPassword !== this.oldPassword) {
      if (this.newPassword === this.repeatNewPassword) {
        this.formValid = this.eventValid;
      } else {
        this.formValid = false;
      }
    } else {
      this.formValid = false;
    }
  }


  changePassword(): void {
    if (this.formValid) {
      this.loading = true;
      const credential = firebase.auth.EmailAuthProvider.credential(this.sessionService.getEmail(), this.oldPassword);
      this.user.reauthenticateWithCredential(credential).then(() => {
        this.user.updatePassword(this.newPassword);
        this.router.navigate([this.urlService.getProfileUrl()]);
        this.snackBar.open('Senha alterada com sucesso', 'OK', {
          duration: 3000
        });
      }).catch(() => {
        this.snackBar.open('Senha antiga incorreta', 'OK', {
          duration: 3000
        });
      });
    }
  }
}
