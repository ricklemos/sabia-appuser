import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModifyUserDataService } from '../../services/modify-user-data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';
import { finalize, take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { SessionsLoginService } from '../../../sessions/services/sessions-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-data',
  templateUrl: '../../components/edit-data/edit-data.component.html',
  styleUrls: ['../../components/edit-data/edit-data.component.scss']
})
export class EditDataComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  unsubscribe = [];

  uploadProgress: string;
  uploading: boolean;
  deleting: boolean;
  uid: string;

  subscriptions = [];

  constructor(
    private modifyUserDataService: ModifyUserDataService,
    private router: Router,
    private urlService: UrlService,
    private formBuilder: FormBuilder,
    private sessionService: SessionsLoginService,
    private snackBar: MatSnackBar
  ) {
    this.formGroup = formBuilder.group({
      email: ['', Validators.required],
      gender: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
    this.uid = this.sessionService.getUserId();
  }

  ngOnInit(): void {
    const subFetchUserData = this.sessionService.fetchUserData().pipe(
      tap(data => {
        this.formGroup.setValue({
          firstName: data.firstName,
          lastName: data.lastName,
          gender: data.gender,
          email: data.email
        });
      })
    ).subscribe(noop);
    this.unsubscribe.push(subFetchUserData);
    this.deleting = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe.map(u => u.unsubscribe);
  }

  edit(): void {
    this.modifyUserDataService.editAll(
      this.formGroup.value.firstName,
      this.formGroup.value.lastName,
      this.formGroup.value.gender,
      this.formGroup.value.email
    );
    this.router.navigate([this.urlService.getProfileUrl()]);
  }

  deletePic(): void {
    // TODO: Show MatDialog asking the user before deleting
    this.deleting = true;
    const deletePic = this.modifyUserDataService.deleteUserProfilePic().pipe(
      tap(data => this.deleting = false)
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
        this.uploadProgress = '1';
        // Chama a função de upload
        const task = this.modifyUserDataService.updateProfilePic(file);
        // Apresenta a porcentagem de conclusão do upload da foto que entra como valor do "mat-progress"
        task.percentageChanges().pipe(
          tap((percentage) => {
            this.uploadProgress = Math.round(percentage).toFixed(0);
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
