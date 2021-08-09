import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingsClassPageComponent } from './containers/rankings-class-page/rankings-class-page.component';
import { LayoutRankingsComponent } from './rankings/layout-rankings/layout-rankings.component';
import { RouterModule } from '@angular/router';
import { RankingsRoutes } from '../rankings/rankings-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    LayoutRankingsComponent,
    RankingsClassPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(RankingsRoutes),
    FlexLayoutModule,
  ]
})
export class RankingsModule { }
