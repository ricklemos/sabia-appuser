import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingsClassPageComponent } from './containers/rankings-class-page/rankings-class-page.component';
import { LayoutRankingsComponent } from './layout/layout-rankings/layout-rankings.component';
import { RouterModule } from '@angular/router';
import { RankingsRoutes } from './rankings-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RankingsPageComponent } from './containers/rankings-page/rankings-page.component';
import { ClassAvailableComponent } from './components/class-available/class-available.component';
import { CollactDesignSystemModule } from 'collact-design-system';
import { RankingUserDataComponent } from './components/ranking-user-data/ranking-user-data.component';
import { ProfileModule } from '../profile/profile.module';
import { CollactComponentsModule } from 'collact-components';
import { NavigationModule } from '../navigation/navigation.module';



@NgModule({
  declarations: [
    LayoutRankingsComponent,
    RankingsClassPageComponent,
    RankingsPageComponent,
    ClassAvailableComponent,
    RankingUserDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(RankingsRoutes),
    FlexLayoutModule,
    CollactDesignSystemModule,
    ProfileModule,
    CollactComponentsModule,
    NavigationModule,
  ]
})
export class RankingsModule { }
