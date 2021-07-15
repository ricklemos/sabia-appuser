import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  pictureLink: Observable<string | null>;
  @Input() uid: string;

  constructor(
    private modifyUserDataService: ModifyUserDataService,
  ) {
  }

  ngOnInit(): void {
    if (this.uid) {
      this.pictureLink = this.modifyUserDataService.fetchProfilePicture(this.uid).getDownloadURL();
    } else {
      this.pictureLink = this.modifyUserDataService.fetchUserProfilePicture().getDownloadURL();
    }
  }
}
