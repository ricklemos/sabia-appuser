import { Component, Input, OnInit } from '@angular/core';
import { ModuleProgress } from '../../models/moduleProgress';

@Component({
  selector: 'courses-module-box',
  templateUrl: './courses-module-box.component.html',
  styleUrls: ['./courses-module-box.component.scss']
})
export class CoursesModuleBoxComponent implements OnInit {

  @Input() moduleProgress: ModuleProgress;

  constructor() {
  }

  ngOnInit(): void {
  }

}
