import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CollactDesignSystemModule } from 'collact-design-system';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { LayoutHomeComponent } from './layout/layout-home.component';


@NgModule({
  declarations: [
    HomePageComponent,
    LayoutHomeComponent
  ],
  imports: [
    FlexLayoutModule,
    RouterModule,
    RouterModule.forChild(HomeRoutes),
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CollactDesignSystemModule
  ],
  providers: [
  ],
  exports: [
  ]
})
export class HomeModule { }