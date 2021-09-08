import { Component, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';
import { SessionsUserData } from '../../models/sessions-models';
import { SessionsRolesService } from '../../services/sessions-roles.service';

@Component({
  selector: 'app-sessions-logged-page',
  templateUrl: './sessions-logged-page.component.html',
  styleUrls: ['./sessions-logged-page.component.scss']
})
export class SessionsLoggedPageComponent implements OnInit {

  userData: SessionsUserData;

  constructor(
    private sessionsLoginService: SessionsLoginService,
    private urlService: UrlService,
    private router: Router,
    private sessionsRolesService: SessionsRolesService
  ) {
  }

  ngOnInit(): void {
    this.sessionsLoginService.fetchUserData().pipe(
      take(1),
      tap(data => this.userData = data)
    ).subscribe(noop);
    this.sessionsRolesService.fetchRoleByIdToken().pipe(
      tap((idToken) => {
        const role = idToken.claims.role;
        console.log('role', idToken.claims.role);
        if (role === 'STUDENT'){
          console.log('goToStudentPage');
        }
      })
    ).subscribe(noop);
  }

  goProfilePage(): void {
    const url = this.urlService.getProfileUrl();
    this.router.navigate([url]);
  }

  goModulePage(): void {
    // TODO : Fetch moduleId to answer.
    const url = this.urlService.getModule('0001');
    this.router.navigate([url]);
  }


  goRankingPage(): void {
    const url = this.urlService.getRankings();
    this.router.navigate([url]);
  }

  goToCourses(): void {
    const url = this.urlService.getCourses();
    this.router.navigate([url]);
  }

  goHomePage(): void {
    const url = this.urlService.getHome();
    this.router.navigate([url]);
  }

  goToClassroomPage(): void {
    const url = this.urlService.getInstructorClassroomsPage();
    this.router.navigate([url]);
  }

  callCloudFunction(): void {
    console.log('clicou no botão');
    this.sessionsRolesService.setRole('gmduarte96@gmail.com', 'MASTER').pipe(
      tap((data) => {
        console.log('dados subscribe', data);
      })
    ).subscribe(noop);
  }

}
