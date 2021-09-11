import { Component, Input, OnInit } from '@angular/core';
import { HomeModuleProgress } from '../../models/module';

@Component({
  selector: 'recent-modules',
  templateUrl: './recent-modules.component.html',
  styleUrls: ['./recent-modules.component.scss']
})
export class RecentModulesComponent implements OnInit {

  @Input() userModules: HomeModuleProgress[];

  constructor() {
  }

  ngOnInit(): void {

  }

}
