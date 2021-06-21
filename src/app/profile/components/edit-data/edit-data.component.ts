import { Component, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ProfileEditPageComponent } from '../../containers/profile-edit-page/profile-edit-page.component';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';


@Component({
  selector: 'app-edit-data',
  templateUrl: '../../components/edit-data/edit-data.component.html',
  styleUrls: ['../../components/edit-data/edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private profileEditPageComponent: ProfileEditPageComponent,
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
    this.sessionService.fetchUserData().pipe(
      tap(data => {
        this.formGroup.setValue({firstName: data.firstName, lastName: data.lastName, gender: data.gender, email: data.email});
        console.log(data);
      })
    ).subscribe(noop);

  }

  edit(): void {
    this.modifyUserDataService.editAll(this.formGroup.value.firstName, this.formGroup.value.lastName, this.formGroup.value.gender, this.formGroup.value.email);
    this.router.navigate([this.urlService.getProfileUrl()]);
  }
}
