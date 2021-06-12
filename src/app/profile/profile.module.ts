import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditDataComponent } from './components/edit-data/edit-data.component';
import { ModifyUserDataService } from './services/modify-user-data.service';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';



@NgModule({
  declarations: [
    EditDataComponent,
    ProfileViewComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [
    ModifyUserDataService
  ],
})
export class ProfileModule { }
