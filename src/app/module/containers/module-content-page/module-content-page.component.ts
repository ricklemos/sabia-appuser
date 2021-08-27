import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { ModuleContentService } from '../../services/module-content.service';
import { ModuleContent, ModuleProgress } from '../../models/module';

@Component({
  selector: 'module-content-page',
  templateUrl: './module-content-page.component.html',
  styleUrls: ['./module-content-page.component.scss']
})
export class ModuleContentPageComponent implements OnInit {

  moduleContent: ModuleContent;
  moduleProgress: ModuleProgress;

  constructor(
    private moduleContentService: ModuleContentService,
  ) {
  }

  ngOnInit(): void {
    this.moduleContentService.fetchModuleContent('1').pipe(
      tap(data => {
        this.moduleContent = data;
      })
    ).subscribe(noop);
    //   this.moduleService.fetchModuleProgress('0001').pipe(
    //     tap(data => {
    //       this.moduleProgress = data;
    //     })).subscribe(noop);
    // TODO: trazer informações do nome do Modulo pelo ModuleProgress
  }
}


