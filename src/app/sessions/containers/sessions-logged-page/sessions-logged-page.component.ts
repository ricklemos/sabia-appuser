import { Component, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { SessionsUserData } from '../../models/sessions-models';

@Component({
  selector: 'app-sessions-logged-page',
  templateUrl: './sessions-logged-page.component.html',
  styleUrls: ['./sessions-logged-page.component.scss']
})
export class SessionsLoggedPageComponent implements OnInit {

  userData: SessionsUserData;

  constructor(
    private sessionsLoginService: SessionsLoginService
  ) {
  }

  ngOnInit(): void {
    this.sessionsLoginService.fetchUserData().pipe(
      take(1),
      tap(data => this.userData = data)
    ).subscribe(noop);
  }

}
