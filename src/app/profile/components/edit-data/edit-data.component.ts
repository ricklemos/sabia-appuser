import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { finalize, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileForm } from '../../models/profile-forms';


@Component({
  selector: 'app-edit-data',
  templateUrl: '../../components/edit-data/edit-data.component.html',
  styleUrls: ['../../components/edit-data/edit-data.component.scss']
})
export class EditDataComponent implements OnInit, OnDestroy {

  userProfileForm = UserProfileForm;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  loading = false;
  unsubscribe = [];

  uploadProgress: number;
  uploading: boolean;
  deleting: boolean;
  uid: string;
  formValid = false;

  subscriptions = [];

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private sessionService: SessionsLoginService,
    private snackBar: MatSnackBar
  ) {
    this.uid = this.sessionService.getUserId();
    const userData = this.modifyUserDataService.getUserData();
    this.userProfileForm[0].value = userData.email;
    this.userProfileForm[1].value = userData.firstName;
    this.userProfileForm[2].value = userData.lastName;
    this.userProfileForm[3].value = userData.gender;
    this.deleting = false;
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  isValid(event): void {
    this.formValid = event;
  }

  changes(value): void {
    this.firstName = value.firstName;
    this.lastName = value.lastName;
    this.gender = value.gender;
    this.email = value.email;
  }

  edit(): void {
    if (this.formValid) {
      this.loading = true;
      if (this.firstName || this.lastName || this.gender || this.email){
        this.modifyUserDataService.editAll(
          this.firstName,
          this.lastName,
          this.gender,
          this.email
        );
      }
      this.router.navigate([this.urlService.getProfileUrl()]);
    }
  }

  deletePic(): void {
    // TODO: Show MatDialog asking the user before deleting
    this.deleting = true;
    const deletePic = this.modifyUserDataService.deleteUserProfilePic().pipe(
      tap(() => this.deleting = false)
    ).subscribe(noop);
    this.subscriptions.push(deletePic);
  }

  // Função que é chamada quando o usário escolhe uma foto para fazer upload
  updatePic(event): void {
    // Foto que irá subir
    const file = event.target.files[0];
    // Testa se o arquivo é menor que 2MB antes de subir
    if (file.size <= 2000000) {
      // Testa se o arquivo é jpeg ou png antes de subir
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        // Coloca o estado "uploading" em true para dar feedback de uplaod para o usuário
        this.uploading = true;
        this.uploadProgress = 1;
        // Chama a função de upload
        const task = this.modifyUserDataService.updateProfilePic(file);
        // Apresenta a porcentagem de conclusão do upload da foto que entra como valor do "mat-progress"
        task.percentageChanges().pipe(
          tap((percentage) => {
            this.uploadProgress = Math.round(percentage);
          }),
        ).subscribe(noop);
        // A foto só pode voltar a ser mostrada se o upload tiver sido concluído no firebase
        // Esse trecho garante que o HTML só irá voltar a mostrar a foto quando o upload é concluído
        task.snapshotChanges().pipe(
          finalize(() => this.uploading = false)
        ).subscribe(noop);
      } else {
        this.snackBar.open('Utilize um arquivo jpeg ou png', 'OK', {
          duration: 5000
        });
      }
    } else {
      this.snackBar.open('Utilize um arquivo menor que 2MB', 'OK', {
        duration: 5000
      });
    }
  }
}
