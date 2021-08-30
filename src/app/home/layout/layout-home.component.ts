import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-home',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutHomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
