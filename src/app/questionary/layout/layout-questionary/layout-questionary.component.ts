import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'layout-questionary',
  template: `
    <router-outlet></router-outlet>
  `
})
export class LayoutQuestionaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
