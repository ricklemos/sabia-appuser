import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { ProfileViewPageComponent } from '../../containers/profile-view-page/profile-view-page.component';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;

  constructor(
    private sessionService: SessionsLoginService,
    private firestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService,
    private profileViewPageComponent: ProfileViewPageComponent
  ) {

  }

  ngOnInit(): void {
    this.sessionService.fetchUserData().pipe(
      take(1),
      tap(data => this.firstName = data.firstName),
      tap(data => this.lastName = data.lastName),
      tap(data => this.gender = data.gender),
      tap(data => this.email = data.email)
    ).subscribe(noop);

  }

  goEditPage(): void {
    const url = this.urlService.getEditUrl();
    this.router.navigate([url]);
  }

  goChangePasswordPage(): void {
    const url = this.urlService.getChangePasswordUrl();
    this.router.navigate([url]);

  }
}
