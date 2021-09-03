import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-instructor-dash',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutInstructorDashComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
