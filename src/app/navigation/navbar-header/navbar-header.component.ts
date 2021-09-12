import { Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { SessionsLoginService } from '../../sessions/services/sessions-login.service';
import { SessionsUserData } from '../../sessions/models/sessions-models';
import { ModifyUserDataService } from '../../profile/services/modify-user-data.service';

@Component({
  selector: 'navbar-header',
  templateUrl: './navbar-header.component.html',
  styleUrls: ['./navbar-header.component.scss']
})
export class NavbarHeaderComponent implements OnInit, OnDestroy {
  userData$: SessionsUserData;
  pictureLink: string;
  subscriptions = [];

  constructor(
    private sessionsLoginService: SessionsLoginService,
    private modifyUserDataService: ModifyUserDataService,
  ) {
  }

  ngOnInit(): void {
    const userId = this.sessionsLoginService.getUserId();
    const sub = this.sessionsLoginService.fetchUserData().pipe(
      switchMap(data => {
        this.userData$ = data;
        return this.modifyUserDataService.fetchProfilePicture(userId).getDownloadURL();
      }),
      tap(picture => {
        this.pictureLink = picture;
      })
    ).subscribe(noop);
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(u => u.unsubscribe);
  }

}
