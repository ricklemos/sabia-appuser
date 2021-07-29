import { Component, OnInit } from '@angular/core';

@Component({
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
