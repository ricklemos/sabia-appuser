import { Component, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import firebase from 'firebase';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { error } from '@angular/compiler/src/util';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formGroup: FormGroup;
  passwordIsEqual = false;
  newEqualsOld = true;
  user;

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private formBuilder: FormBuilder,
    private sessionService: SessionsLoginService,
    private snackBar: MatSnackBar,
    private angularFireAuth: AngularFireAuth
  ) {
    this.formGroup = formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      oldPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const fetchUser = this.sessionService.fetchAuthUser().pipe(
      tap(user => this.user = user)
    ).subscribe(noop);
    this.formGroup.get('newPassword').valueChanges.pipe(
      tap(data => {
        if (data === this.formGroup.value.oldPassword) {
          this.newEqualsOld = true;
        } else {
          this.newEqualsOld = false;
        }
      })
    ).subscribe(noop);

    this.formGroup.get('repeatNewPassword').valueChanges.pipe(
      tap(data => {
        if (data === this.formGroup.value.newPassword) {
          this.passwordIsEqual = true;
        } else {
          this.passwordIsEqual = false;
        }
      })
    ).subscribe(noop);
  }


  changePassword(): void {
    const credential = firebase.auth.EmailAuthProvider.credential(this.sessionService.getEmail(), this.formGroup.value.oldPassword);
    this.user.reauthenticateWithCredential(credential).then((data) => {
      this.user.updatePassword(this.formGroup.value.newPassword);
      this.router.navigate([this.urlService.getProfileUrl()]);
      this.snackBar.open('Senha alterada com sucesso', 'OK', {
        duration: 3000
      });
    }).catch(error => {
      console.log(error);
      this.snackBar.open('Senha antiga incorreta', 'OK', {
        duration: 3000
      });
    });
  }
}
