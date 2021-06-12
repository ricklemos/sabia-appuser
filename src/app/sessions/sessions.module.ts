import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsLoginPageComponent } from './containers/sessions-login-page/sessions-login-page.component';
import { LayoutSessionsComponent } from './layout/layout-sessions/layout-sessions.component';
import { RouterModule } from '@angular/router';
import { SessionsRoutes } from './sessions-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    SessionsLoginPageComponent,
    LayoutSessionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(SessionsRoutes),
    FlexLayoutModule,
  ]
})
export class SessionsModule { }
