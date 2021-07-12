import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';


@Component({
  selector: 'app-edit-data',
  templateUrl: '../../components/edit-data/edit-data.component.html',
  styleUrls: ['../../components/edit-data/edit-data.component.scss']
})
export class EditDataComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  unsubscribe = [];

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private formBuilder: FormBuilder,
    private sessionService: SessionsLoginService
  ) {
    this.formGroup = formBuilder.group({
      email: ['', Validators.required],
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const subFetchUserData = this.sessionService.fetchUserData().pipe(
      tap(data => {
        this.formGroup.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          email: data.email
        });
      })
    ).subscribe(noop);
    this.unsubscribe.push(subFetchUserData);
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  edit(): void {
    this.modifyUserDataService.editAll(this.formGroup.value.firstName, this.formGroup.value.lastName, this.formGroup.value.gender, this.formGroup.value.email);
    this.router.navigate([this.urlService.getProfileUrl()]);
  }
}
