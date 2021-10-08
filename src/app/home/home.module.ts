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
import { HomeStartNowComponent } from './components/home-start-now/home-start-now.component';
import { HomeRecentModulesComponent } from './components/home-recent-modules/home-recent-modules.component';
import { HomeModuleAvailableComponent } from './components/home-module-available/home-module-available.component';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { HomeService } from './services/home.service';
import { NavigationModule } from '../navigation/navigation.module';


@NgModule({
  declarations: [
    HomePageComponent,
    LayoutHomeComponent,
    HomeStartNowComponent,
    HomeRecentModulesComponent,
    HomeModuleAvailableComponent
  ],
  imports: [
    FlexLayoutModule,
    RouterModule,
    RouterModule.forChild(HomeRoutes),
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CollactDesignSystemModule,
    CommonModule,
    ChartsModule,
    NavigationModule
  ],
  providers: [
    HomeService
  ],
  exports: []
})
export class HomeModule {
}
