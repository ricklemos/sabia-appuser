import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../services/welcome.service';
import { switchMap, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { UrlService } from '../../../services/url.service';
import { Router } from '@angular/router';
import { SessionsUserData } from '../../../sessions/models/sessions-models';

@Component({
  selector: 'welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['../../../../assets/styles/welcome.style.scss']
})
export class WelcomePageComponent implements OnInit {

  ready = false;
  userData$: SessionsUserData;

  constructor(
    private welcomeService: WelcomeService,
    private urlService: UrlService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.welcomeService.fetchContentToStart().pipe(
      switchMap((userData) => {
        this.userData$ = userData;
        return this.welcomeService.fetchCourses();
      }),
      tap(courses => {
        console.log(courses);
        this.welcomeService.setCourses(courses);
        setTimeout(() => {
          this.ready = true;
        }, 2000);
      })
    ).subscribe(noop);
  }
  start(): void {
    this.router.navigate([this.urlService.getWelcomeCoursesPage()]);
  }
}
