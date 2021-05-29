import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-sessions',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutSessionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
