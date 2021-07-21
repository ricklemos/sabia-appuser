import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
// TODO: Repensar forma de fazer o import do firebase, há mesmo necessidade?
import firebase from 'firebase/app';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  passwordIsEqual = false;
  newEqualsOld = true;
  user;
  unsubscribe = [];

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private formBuilder: FormBuilder,
    private sessionService: SessionsLoginService,
    private snackBar: MatSnackBar,
  ) {
    this.formGroup = formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      oldPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const subFetchUser = this.sessionService.fetchAuthUser().pipe(
      tap(user => this.user = user)
    ).subscribe(noop);
    this.unsubscribe.push(subFetchUser);

    const subNewPassword = this.formGroup.get('newPassword').valueChanges.pipe(
      tap(data => {
        this.newEqualsOld = data === this.formGroup.value.oldPassword;
      })
    ).subscribe(noop);
    this.unsubscribe.push(subNewPassword);

    const subRepeatPassword = this.formGroup.get('repeatNewPassword').valueChanges.pipe(
      tap(data => {
        this.passwordIsEqual = data === this.formGroup.value.newPassword;
      })
    ).subscribe(noop);
    this.unsubscribe.push(subRepeatPassword);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  changePassword(): void {
    const credential = firebase.auth.EmailAuthProvider.credential(this.sessionService.getEmail(), this.formGroup.value.oldPassword);
    this.user.reauthenticateWithCredential(credential).then(() => {
      this.user.updatePassword(this.formGroup.value.newPassword);
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
