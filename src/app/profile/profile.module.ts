import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDataComponent } from './components/edit-data/edit-data.component';
import { ModifyUserDataService } from './services/modify-user-data.service';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileEditPageComponent } from './containers/profile-edit-page/profile-edit-page.component';
import { ProfileViewPageComponent } from './containers/profile-view-page/profile-view-page.component';
import { LayoutProfileComponent } from './layout/layout-profile.component';
import { RouterModule } from '@angular/router';
import { ProfileRoutes } from './profile-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangePasswordPageComponent } from './containers/change-password-page/change-password-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileToolbarComponent } from './components/profile-toolbar/profile-toolbar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    EditDataComponent,
    ProfileViewComponent,
    ProfileEditPageComponent,
    ProfileViewPageComponent,
    LayoutProfileComponent,
    ChangePasswordComponent,
    ChangePasswordPageComponent,
    ProfileToolbarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forChild(ProfileRoutes),
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [
    ModifyUserDataService
  ],
})
export class ProfileModule {
}
