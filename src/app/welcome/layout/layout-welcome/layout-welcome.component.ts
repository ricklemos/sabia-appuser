import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-welcome',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutWelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
