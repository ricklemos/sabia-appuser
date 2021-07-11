import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  pictureLink: Observable<string | null>;
  constructor(
    private modifyUserDataService: ModifyUserDataService,
  ) {
  }

  ngOnInit(): void {
    this.pictureLink = this.modifyUserDataService.fetchProfilePicture().getDownloadURL();
  }
}
