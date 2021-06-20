import { Component, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import firebase from 'firebase';
import { ChangePasswordPageComponent } from '../../containers/change-password-page/change-password-page.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  newPassword = new FormControl('', [Validators.required]);

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private changePasswordPageComponent: ChangePasswordPageComponent
  ) {
  }

  ngOnInit(): void {

  }

  changePassword(): void {
    const user = firebase.auth().currentUser;

    user.updatePassword(this.newPassword.value).then(function () {
      console.log(this.newPassword.value);
    }).catch(function (error) {

    });
    this.router.navigate([this.urlService.getProfileUrl()]);
  }
}
