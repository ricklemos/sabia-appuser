import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleProgressPageComponent } from './containers/module-progress-page/module-progress-page.component';
import { RouterModule } from '@angular/router';
import { ModuleRoutes } from '../module/module-routing.module';
import { LayoutModuleComponent } from './layout/layout-module/layout-module.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CollactDesignSystemModule } from 'collact-design-system';
import { ModuleBodyComponent } from './components/module-body/module-body.component';
import { ModuleService } from './services/module.service';



@NgModule({
  declarations: [
    LayoutModuleComponent,
    ModuleProgressPageComponent,
    ModuleBodyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(ModuleRoutes),
    CollactDesignSystemModule,
    FlexLayoutModule,
  ],
  providers: [
    ModuleService
  ]
})
export class ModuleModule { }
