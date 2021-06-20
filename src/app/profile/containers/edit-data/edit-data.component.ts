import { Component, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ProfileEditPageComponent } from '../../containers/profile-edit-page/profile-edit-page.component';


@Component({
  selector: 'app-edit-data',
  templateUrl: '../../components/edit-data/edit-data.component.html',
  styleUrls: ['../../components/edit-data/edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  email = new FormControl('');
  gender = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private profileEditPageComponent: ProfileEditPageComponent,
  ) {
  }

  ngOnInit(): void {
  }

  edit(): void{
    this.modifyUserDataService.editAll(this.firstName.value,this.lastName.value, this.gender.value,this.email.value)
    this.router.navigate([this.urlService.getProfileUrl()]);
  }
}
