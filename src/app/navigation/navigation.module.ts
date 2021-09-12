import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { CollactComponentsModule } from 'collact-components';
import { CollactDesignSystemModule } from 'collact-design-system';
import { FlexModule } from '@angular/flex-layout';
import { NavbarHeaderComponent } from './navbar-header/navbar-header.component';


@NgModule({
  declarations: [
    NavbarComponent,
    NavbarHeaderComponent,
  ],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    CollactComponentsModule,
    CollactDesignSystemModule,
    FlexModule
  ]
})
export class NavigationModule { }
