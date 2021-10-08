import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { finalize, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  uploadProgress: string;
  uploading: boolean;

  uid: string;

  constructor(
    private sessionService: SessionsLoginService,
    private firestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService,
    private modifyUserDataService: ModifyUserDataService,
    private snackBar: MatSnackBar
  ) {
    // Necessário colocar o uid neste componente para passar para o componente "profile pic"
    this.uid = this.sessionService.getUserId();
  }

  ngOnInit(): void {
    this.sessionService.fetchUserData().pipe(
      tap(data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.gender = data.gender;
        this.email = data.email;
      })
    ).subscribe(noop);
  }

  goEditPage(): void {
    const url = this.urlService.getProfileEditUrl();
    this.router.navigate([url]);
  }

  goChangePasswordPage(): void {
    const url = this.urlService.getChangePasswordUrl();
    this.router.navigate([url]);
  }

  signOut(): void {
    this.sessionService.signOut();
  }
}
