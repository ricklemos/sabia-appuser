import { Component, OnInit } from '@angular/core';
import { SessionsLoginService } from '../../services/sessions-login.service';
import { take, tap } from 'rxjs/operators';
import { noop } from 'rxjs';

@Component({
  selector: 'app-sessions-logged-page',
  templateUrl: './sessions-logged-page.component.html',
  styleUrls: ['./sessions-logged-page.component.scss']
})
export class SessionsLoggedPageComponent implements OnInit {

  firstName: string;

  constructor(
    private sessionsLoginService: SessionsLoginService
  ) {
    this.sessionsLoginService.fetchUserData().pipe(
      take(1),
      tap(data => this.firstName = data.firstName)
    ).subscribe(noop);
  }

  ngOnInit(): void {
  }

}