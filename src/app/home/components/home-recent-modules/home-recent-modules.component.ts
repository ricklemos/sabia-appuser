import { Component, Input, OnInit } from '@angular/core';
import { HomeModuleProgress } from '../../models/module';

@Component({
  selector: 'home-recent-modules',
  templateUrl: './home-recent-modules.component.html',
  styleUrls: ['./home-recent-modules.component.scss']
})
export class HomeRecentModulesComponent implements OnInit {

  @Input() userModules: HomeModuleProgress[];

  constructor() {
  }

  ngOnInit(): void {

  }

}
