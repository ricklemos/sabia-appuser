import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-profile',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
