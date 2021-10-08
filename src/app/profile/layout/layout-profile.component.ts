import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-profile',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutProfileComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
