import { Component, Input, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { Observable } from 'rxjs';

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
