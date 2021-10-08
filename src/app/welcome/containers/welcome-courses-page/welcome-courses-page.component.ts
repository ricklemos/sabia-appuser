import { Component, OnInit } from '@angular/core';
import { WelcomeService } from '../../services/welcome.service';
import { WelcomeCourse } from '../../models/welcome';
import { Router } from '@angular/router';
import { UrlService } from '../../../services/url.service';

@Component({
  selector: 'welcome-courses-page',
  templateUrl: './welcome-courses-page.component.html',
  styleUrls: ['../../../../assets/styles/welcome.style.scss']
})
export class WelcomeCoursesPageComponent implements OnInit {

  courses: WelcomeCourse[] = [];

  constructor(
    private welcomeService: WelcomeService,
    private router: Router,
    private urlService: UrlService
  ) {
  }

  ngOnInit(): void {
    this.courses = this.welcomeService.getCourses();
  }

  goToHome(): void {
    this.router.navigate([this.urlService.getHome()]);
  }

}
