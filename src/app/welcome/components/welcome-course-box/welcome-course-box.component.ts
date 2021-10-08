import { Component, Input, OnInit } from '@angular/core';
import { WelcomeCourse } from '../../models/welcome';

@Component({
  selector: 'welcome-course-box',
  templateUrl: './welcome-course-box.component.html',
  styleUrls: ['../../../../assets/styles/welcome.style.scss']
})
export class WelcomeCourseBoxComponent implements OnInit {

  @Input() course: WelcomeCourse;

  constructor() {
  }

  ngOnInit(): void {
  }

}
