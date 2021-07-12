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
