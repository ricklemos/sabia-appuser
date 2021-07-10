import { Component, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit {
  pictureLink: string;

  constructor(
    private modifyUserDataService: ModifyUserDataService,
  ) {
  }

  ngOnInit(): void {
    this.modifyUserDataService.fetchProfilePic().pipe(
      tap(ref => this.pictureLink = ref)
    ).subscribe(noop);
  }
}
