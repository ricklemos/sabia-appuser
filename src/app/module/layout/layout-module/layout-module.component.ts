import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'layout-module',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutModuleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
