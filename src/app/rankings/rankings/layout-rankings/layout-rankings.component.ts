import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-rankings',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutRankingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
