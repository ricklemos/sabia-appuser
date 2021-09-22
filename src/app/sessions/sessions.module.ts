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
import { MatDialogModule } from '@angular/material/dialog';
import { SessionsInvalidEmailDialogComponent } from './components/sessions-invalid-email-dialog/sessions-invalid-email-dialog.component';
import { SessionsSignupPageComponent } from './containers/sessions-signup-page/sessions-signup-page.component';
import { SessionsSignupFirstNameComponent } from './components/sessions-signup-first-name/sessions-signup-first-name.component';
import { SessionsSignupLastNameComponent } from './components/sessions-signup-last-name/sessions-signup-last-name.component';
import { SessionsSignupGenderComponent } from './components/sessions-signup-gender/sessions-signup-gender.component';
import { SessionsSignupPasswordComponent } from './components/sessions-signup-password/sessions-signup-password.component';
import { SessionsSignupService } from './services/sessions-signup.service';
import { SessionsRolesService } from './services/sessions-roles.service';
import { AngularFireFunctionsModule, REGION, USE_EMULATOR } from '@angular/fire/functions';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SessionsEditRolePageComponent } from './containers/sessions-edit-role-page/sessions-edit-role-page.component';
import { FormsModule } from '../forms/forms.module';
import { CollactComponentsModule } from 'collact-components';
import { CollactDesignSystemModule } from 'collact-design-system';
import { NavigationModule } from '../navigation/navigation.module';



@NgModule({
  declarations: [
    SessionsLoginPageComponent,
    LayoutSessionsComponent,
    SessionsLoginComponent,
    SessionsPasswordComponent,
    SessionsLoggedPageComponent,
    SessionsHeaderComponent,
    SessionsInvalidEmailDialogComponent,
    SessionsSignupPageComponent,
    SessionsSignupFirstNameComponent,
    SessionsSignupLastNameComponent,
    SessionsSignupGenderComponent,
    SessionsSignupPasswordComponent,
    SessionsEditRolePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(SessionsRoutes),
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule,
    AngularFireFunctionsModule,
    MatProgressSpinnerModule,
    FormsModule,
    CollactComponentsModule,
    CollactDesignSystemModule,
    MatDialogModule,
    NavigationModule
  ],
  entryComponents: [
    SessionsInvalidEmailDialogComponent
  ],

  providers: [
    SessionsLoginService,
    SessionsSignupService,
    SessionsRolesService,
    // Caso teste funções HTTP do cloud functions localmente, usar provider USE_EMULATOR e ajustar porta
    { provide: USE_EMULATOR, useValue: ['localhost', 5001] }
    // { provide: REGION, useValue: 'us-central1' }
  ]
})
export class SessionsModule { }
