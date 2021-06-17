import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsLoginPageComponent } from './containers/sessions-login-page/sessions-login-page.component';
import { LayoutSessionsComponent } from './layout/layout-sessions/layout-sessions.component';
import { RouterModule } from '@angular/router';
import { SessionsRoutes } from './sessions-routing.module';
import { SessionsLoginComponent } from './components/sessions-login/sessions-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SessionsLoginService } from './services/sessions-login.service';
import { SessionsPasswordComponent } from './components/sessions-password/sessions-password.component';
import { SessionsLoggedPageComponent } from './containers/sessions-logged-page/sessions-logged-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SessionsHeaderComponent } from './components/sessions-header/sessions-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    SessionsLoginPageComponent,
    LayoutSessionsComponent,
    SessionsLoginComponent,
    SessionsPasswordComponent,
    SessionsLoggedPageComponent,
    SessionsHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(SessionsRoutes),
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    SessionsLoginService
  ]
})
export class SessionsModule { }
