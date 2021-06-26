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

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formGroup: FormGroup;
  passwordIsEqual = false;

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private formBuilder: FormBuilder,
    private sessionService: SessionsLoginService,
    private angularFireAuth: AngularFireAuth
  ) {
    this.formGroup = formBuilder.group({
      newPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
      repeatNewPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    // const user = firebase.auth().currentUser;
    // const credential = this.angularFireAuth.credential(withEmail: 'nandaparodi@gmail.com');
    const fetchUser = this.sessionService.fetchAuthUser().pipe(
      tap(user => {
        user.updatePassword(this.formGroup.value.newPassword);
      })
      // tap(user => {
      //   user.reauthenticateWithCredential(email: , password: this.formGroup.value.oldPassword);
      // })
    ).subscribe(noop);

    this.router.navigate([this.urlService.getProfileUrl()]);
  }
}
