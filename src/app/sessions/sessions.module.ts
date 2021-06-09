import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsLoginPageComponent } from './containers/sessions-login-page/sessions-login-page.component';
import { LayoutSessionsComponent } from './layout/layout-sessions/layout-sessions.component';
import { RouterModule } from '@angular/router';
import { SessionsRoutes } from './sessions-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessionsLoginComponent } from './components/sessions-login/sessions-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionsLoginService } from './services/sessions-login.service';



@NgModule({
  declarations: [
    SessionsLoginPageComponent,
    LayoutSessionsComponent,
    SessionsLoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(SessionsRoutes),
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    SessionsLoginService
  ]
})
export class SessionsModule { }
