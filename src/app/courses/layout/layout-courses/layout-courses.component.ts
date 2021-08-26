import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-courses',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutCoursesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
