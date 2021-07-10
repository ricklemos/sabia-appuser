import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ModifyUserDataService } from '../../services/modify-user-data.service';

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

  uploadProgress: number;
  uploading: boolean;

  fr = new FileReader();

  constructor(
    private sessionService: SessionsLoginService,
    private firestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService,
    private modifyUserDataService: ModifyUserDataService,
  ) {

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

  updatePic(event): void {
    this.uploading = true;
    this.uploadProgress = 0;
    const file = event.target.files[0];
    const task = this.modifyUserDataService.updateProfilePic(file);
    task.percentageChanges().pipe(
      tap((percentage) => {
        console.log('Atualizando Foto', percentage);
        this.uploadProgress = percentage;
        if (percentage === 100) {
          console.log('Sucesso', percentage);
          this.uploading = false;
        }
      }),
    ).subscribe(noop);
  }
}
