import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { finalize, tap } from 'rxjs/operators';
import { noop, Observable } from 'rxjs';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { AngularFireStorage } from '@angular/fire/storage';

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

  photo: Observable<string | null>;
  constructor(
    private sessionService: SessionsLoginService,
    private firestore: AngularFirestore,
    private router: Router,
    private urlService: UrlService,
    private modifyUserDataService: ModifyUserDataService,
    private angularFireStorage: AngularFireStorage
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
    this.photo = this.modifyUserDataService.fetchProfilePicture().getDownloadURL();

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
        }
      }),
    ).subscribe(noop);
    const filePath = `profilePics/${ this.sessionService.getUserId() }`;
    const fileRef = this.angularFireStorage.ref(filePath);
    task.snapshotChanges().pipe(
      finalize(() => {
        this.photo = fileRef.getDownloadURL();
        this.uploading = false;
      })
    ).subscribe(noop);
  }
}
